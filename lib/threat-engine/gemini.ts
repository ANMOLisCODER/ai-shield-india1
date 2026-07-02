import { validateThreat } from "./validator";
export async function analyzeWithGemini(article: string) {
  const prompt = `
You are an Indian Cyber Security Analyst.

Analyze the following cyber news.

Return ONLY valid JSON.

{
  "state":"",
  "threat_level":"",
  "threat_score":0,
  "category":"",
  "summary":""
}

Rules:

- state must be ONE Indian State or Union Territory.
- If state cannot be determined return "Unknown".
- threat_level must be LOW, MEDIUM, HIGH or CRITICAL.
- threat_score must be between 0 and 100.
- category must be one of:
  UPI Fraud
  Banking Fraud
  Phishing
  Malware
  Data Breach
  Scam
  Ransomware
  Digital Arrest
  Other

News:

${article}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  contents: [
    {
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ],

  generationConfig: {
    temperature: 0,
    responseMimeType: "application/json",
  },
}),
    }
  );

  const json = await response.json();

  console.log("========== GEMINI RAW ==========");
  console.log(JSON.stringify(json, null, 2));
  console.log("================================");

  let text =
    json?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  console.log("========== GEMINI TEXT ==========");
  console.log(text);
  console.log("=================================");

  if (!text) {
    return validateThreat({
      state: "Unknown",
      threat_score: 20,
      threat_level: "LOW",
      category: "Other",
      summary: "Empty Gemini response",
    });
  }

  try {
    const parsed = JSON.parse(text);

    return validateThreat(parsed);
  } catch (err) {
    console.error(err);

    return validateThreat({
      state: "Unknown",
      threat_score: 20,
      threat_level: "LOW",
      category: "Other",
      summary: "Gemini JSON Parse Failed",
    });
  }
}