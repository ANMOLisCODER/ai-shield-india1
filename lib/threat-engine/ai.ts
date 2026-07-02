import { validateThreat } from "./validator";
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const REQUEST_TIMEOUT_MS = 8000;
const MAX_RETRIES = 3;
const BASE_BACKOFF_MS = 500;

const MODELS = [
  'meta-llama/llama-3.3-70b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
] as const;

type ModelId = typeof MODELS[number];

interface OpenRouterChoice {
  message?: {
    content?: string;
  };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: { message?: string; code?: number };
}

interface RawAIThreatPayload {
  state?: string;
  threat_level?: string;
  threat_score?: number;
  category?: string;
  summary?: string;
}

interface LogContext {
  [key: string]: unknown;
}

function log(level: 'info' | 'warn' | 'error', message: string, context: LogContext = {}): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    module: 'threat-engine/ai',
    message,
    ...context,
  };
  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

const SYSTEM_PROMPT = `You are a cyber threat classification engine for an Indian cyber fraud detection system.
You MUST respond with ONLY a single valid JSON object and nothing else.
Do NOT use markdown. Do NOT use code fences. Do NOT include any reasoning, explanation, <think> tags, or commentary.
Do NOT prefix or suffix the JSON with any text.
The JSON object must have EXACTLY this shape:
{
  "state": string,
  "threat_level": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "threat_score": number (0-100),
  "category": string,
  "summary": string (strictly under 25 words)
}
If a field cannot be determined, provide your best estimate. Never omit a field. Never add extra fields.`;

function buildUserPrompt(inputText: string): string {
  return `Analyze the following content for cyber fraud / scam threat indicators relevant to India.
Return ONLY the JSON object described in the system prompt. No markdown. No extra text.

CONTENT:
"""
${inputText}
"""`;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Strips markdown code fences, <think>/<reasoning> traces, and label prefixes
 * that free OpenRouter models sometimes leak into output despite instructions.
 */
function sanitizeModelOutput(raw: string): string {
  let cleaned = raw;

  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '');
  cleaned = cleaned.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, '');
  cleaned = cleaned.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');

  cleaned = cleaned.replace(/```(?:json)?/gi, '');

  cleaned = cleaned.replace(/^\s*(output|json|answer|response)\s*:\s*/i, '');

  return cleaned.trim();
}

/**
 * Extracts the first balanced top-level JSON object substring from arbitrary
 * text, tracking brace depth and ignoring braces inside string literals.
 */
function extractFirstJsonObject(text: string): string | null {
  const startIndex = text.indexOf('{');
  if (startIndex === -1) return null;

  let depth = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = startIndex; i < text.length; i++) {
    const char = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (char === '{') depth++;
    if (char === '}') {
      depth--;
      if (depth === 0) {
        return text.slice(startIndex, i + 1);
      }
    }
  }

  return null;
}

/**
 * Best-effort repair for near-valid JSON: trailing commas, smart quotes,
 * unquoted keys, single-quoted string values.
 */
function repairJson(candidate: string): string {
  let repaired = candidate;

  repaired = repaired.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'");
  repaired = repaired.replace(/,\s*([}\]])/g, '$1');
  repaired = repaired.replace(/([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":');
  repaired = repaired.replace(/:\s*'([^']*)'/g, ': "$1"');

  return repaired;
}

function tryParseJson(text: string): RawAIThreatPayload | null {
  const attempts = [text, repairJson(text)];

  for (const attempt of attempts) {
    try {
      const parsed = JSON.parse(attempt);
      if (parsed && typeof parsed === 'object') {
        return parsed as RawAIThreatPayload;
      }
    } catch {
      // try next repair strategy
    }
  }

  return null;
}

function parseModelResponse(rawContent: string): RawAIThreatPayload | null {
  const sanitized = sanitizeModelOutput(rawContent);

  const directParse = tryParseJson(sanitized);
  if (directParse) return directParse;

  const extracted = extractFirstJsonObject(sanitized);
  if (!extracted) return null;

  return tryParseJson(extracted);
}

function withTimeout(ms: number): { signal: AbortSignal; cancel: () => void } {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timer),
  };
}

async function callOpenRouterModel(
  model: ModelId,
  inputText: string,
  apiKey: string
): Promise<string> {
  const { signal, cancel } = withTimeout(REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(inputText) },
        ],
        temperature: 0.2,
        max_tokens: 300,
        response_format: { type: 'json_object' },
      }),
      signal,
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => '');
      throw new Error(`OpenRouter HTTP ${response.status}: ${errorBody.slice(0, 300)}`);
    }

    const data = (await response.json()) as OpenRouterResponse;

    if (data.error) {
      throw new Error(`OpenRouter error: ${data.error.message ?? 'unknown error'}`);
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content || typeof content !== 'string') {
      throw new Error('OpenRouter response missing message content');
    }

    return content;
  } finally {
    cancel();
  }
}

async function callModelWithRetries(
  model: ModelId,
  inputText: string,
  apiKey: string
): Promise<RawAIThreatPayload | null> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const rawContent = await callOpenRouterModel(model, inputText, apiKey);
      const parsed = parseModelResponse(rawContent);

      if (parsed) {
        log('info', 'Model call succeeded', { model, attempt });
        return parsed;
      }

      log('warn', 'Model returned unparseable content, retrying', {
        model,
        attempt,
        rawPreview: rawContent.slice(0, 200),
      });
    } catch (err) {
      const isAbort = err instanceof Error && err.name === 'AbortError';
      log('warn', isAbort ? 'Model call timed out' : 'Model call failed', {
        model,
        attempt,
        error: err instanceof Error ? err.message : String(err),
      });
    }

    if (attempt < MAX_RETRIES) {
      const backoffMs = BASE_BACKOFF_MS * 2 ** (attempt - 1);
      await delay(backoffMs);
    }
  }

  return null;
}

const FALLBACK_THREAT_INPUT: RawAIThreatPayload = {
  state: 'Unknown',
  threat_score: 20,
  threat_level: 'LOW',
  category: 'Other',
  summary: 'AI Request Failed',
};

/**
 * Classifies cyber threat content using OpenRouter, trying the primary model
 * then falling through the configured fallback models in order. Never throws —
 * always resolves to a validated ThreatResult, even on total failure.
 */
export async function analyzeWithAI(inputText: string): Promise<any>{
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    log('error', 'OPENROUTER_API_KEY is not set');
    return validateThreat(FALLBACK_THREAT_INPUT);
  }

  if (!inputText || typeof inputText !== 'string' || inputText.trim().length === 0) {
    log('warn', 'Empty inputText passed to analyzeThreatWithAI');
    return validateThreat(FALLBACK_THREAT_INPUT);
  }

  for (const model of MODELS) {
    const result = await callModelWithRetries(model, inputText, apiKey);
    if (result) {
      return validateThreat(result);
    }
    log('warn', 'Exhausted retries for model, moving to next fallback', { model });
  }

  log('error', 'All models and retries exhausted, returning fallback threat result');
  return validateThreat(FALLBACK_THREAT_INPUT);
}