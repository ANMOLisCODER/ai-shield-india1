import {
  calculateThreatScore,
  getThreatLevel,
} from "./scoring";

import { detectCategory } from "./categoryDetector";
import { getNewsImportance } from "./newsImportance";

export type RuleResult = {
  threat_score: number;
  threat_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: string;
};

export function applyRules(text: string): RuleResult {

  const keywordScore = calculateThreatScore(text);

  const importanceScore = getNewsImportance(text);

  // Average of keyword score + news importance
  const finalScore = Math.round(
    (keywordScore + importanceScore) / 2
  );

  const level = getThreatLevel(finalScore);

  const category =
    detectCategory(text) ?? "Other";

  return {
    threat_score: finalScore,
    threat_level: level,
    category,
  };
}