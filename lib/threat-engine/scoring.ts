const weights = [
  {
    score: 45,
    keywords: [
      "ransomware",
      "encrypt",
      "encrypted",
      "decrypt",
      "bitcoin ransom",
      "locker"
    ]
  },

  {
    score: 40,
    keywords: [
      "data breach",
      "database leaked",
      "records leaked",
      "customer data",
      "personal data",
      "millions of users",
      "leaked database"
    ]
  },

  {
    score: 35,
    keywords: [
      "digital arrest",
      "fake police",
      "fake cbi",
      "fake ed",
      "video call arrest"
    ]
  },

  {
    score: 30,
    keywords: [
      "upi fraud",
      "banking fraud",
      "online fraud",
      "financial fraud",
      "cyber fraud",
      "bank account"
    ]
  },

  {
    score: 25,
    keywords: [
      "phishing",
      "otp",
      "fake login",
      "fake website",
      "credential theft",
      "email scam"
    ]
  },

  {
    score: 20,
    keywords: [
      "telegram",
      "dark web",
      "malware",
      "trojan",
      "virus",
      "spyware",
      "botnet"
    ]
  },

  {
    score: 15,
    keywords: [
      "scam",
      "fraud",
      "criminal",
      "criminals",
      "cheated",
      "extortion",
      "blackmail"
    ]
  }
];

export function calculateThreatScore(text: string): number {

  const lower = text.toLowerCase();

  let score = 0;

  for (const group of weights) {

    let matched = false;

    for (const keyword of group.keywords) {

      if (lower.includes(keyword)) {
        matched = true;
        break;
      }

    }

    if (matched) {
      score += group.score;
    }

  }

  if (score > 100) score = 100;

  return score;
}

export function getThreatLevel(score: number) {

  if (score >= 80) return "CRITICAL";

  if (score >= 60) return "HIGH";

  if (score >= 35) return "MEDIUM";

  return "LOW";
}