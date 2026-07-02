const VALID_LEVELS = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

const VALID_CATEGORIES = [
  "UPI Fraud",
  "Banking Fraud",
  "Phishing",
  "Malware",
  "Data Breach",
  "Scam",
  "Ransomware",
  "Digital Arrest",
  "Other",
];

export function validateThreat(ai: any) {

  const threat = {
    state: ai?.state ?? "Unknown",
    threat_score: Number(ai?.threat_score ?? 20),
    threat_level: ai?.threat_level ?? "LOW",
    category: ai?.category ?? "Other",
    summary: ai?.summary ?? "Cyber security news detected.",
  };

  if (isNaN(threat.threat_score))
    threat.threat_score = 20;

  threat.threat_score = Math.max(
    0,
    Math.min(100, threat.threat_score)
  );

  if (!VALID_LEVELS.includes(threat.threat_level))
    threat.threat_level = "LOW";

  if (!VALID_CATEGORIES.includes(threat.category))
    threat.category = "Other";

  if (!threat.state)
    threat.state = "Unknown";

  if (
    !threat.summary ||
    threat.summary.length < 10
  ) {
    threat.summary = "Cyber security news detected.";
  }

  return threat;
}