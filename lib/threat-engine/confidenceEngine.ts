export interface ConfidenceResult {
  confidence: number;
  useAI: boolean;
}

export function evaluateConfidence(
  state: string | null,
  category: string | null,
  threatScore: number
): ConfidenceResult {

  let confidence = 0;

  // State mila
  if (state && state !== "Unknown") {
    confidence += 40;
  }

  // Category mili
  if (category) {
    confidence += 30;
  }

  // Rule engine ne proper threat score diya
  if (threatScore >= 60) {
    confidence += 30;
  } else if (threatScore >= 40) {
    confidence += 20;
  } else if (threatScore > 0) {
    confidence += 10;
  }

  return {
    confidence,
    useAI: confidence < 60,
  };
}