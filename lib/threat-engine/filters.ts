const REQUIRED_KEYWORDS = [
  "cyber attack",
  "cybercrime",
  "cyber crime",
  "cyber fraud",
  "online fraud",
  "upi fraud",
  "phishing",
  "smishing",
  "vishing",
  "otp fraud",
  "ransomware",
  "malware",
  "spyware",
  "data breach",
  "database leak",
  "leaked data",
  "dark web",
  "identity theft",
  "digital arrest",
  "sim swap",
  "bank fraud",
  "financial fraud",
  "credit card fraud",
  "crypto scam",
  "investment scam",
  "telegram scam",
  "whatsapp scam",
  "fake app",
  "fake website",
  "deepfake",
  "hacker",
  "hackers",
  "hacked",
  "CERT-In",
  "cyber security",
  "cybersecurity",
  "upi",
  "bank",
  "banking",
  "aadhaar",
  "aadhaar scam",
  "cyber cell",
  "npci",
  "credential",
  "credential theft",
  "account hacked",
  "account compromise",
  "bank account",
  "payment fraud",
  "internet banking",
];

const BLOCK_KEYWORDS = [
  "cricket",
  "football",
  "movie",
  "cinema",
  "celebrity",
  "tourism",
  "travel",
  "recipe",
  "fashion",
  "weather",
  "horoscope",
  "car launch",
  "electric vehicle",
  "bike launch",
  "stock market",
  "share market",
];

export function isCyberNews(
  title: string,
  description: string
) {
  const text =
    `${title} ${description}`.toLowerCase();

  const matched = REQUIRED_KEYWORDS.filter((k) =>
    text.includes(k.toLowerCase())
  );

  if (matched.length === 0) return false;

  const blocked = BLOCK_KEYWORDS.some((k) =>
    text.includes(k.toLowerCase())
  );

  if (blocked && matched.length < 2) {
  return false;
}

  return true;
}

export function filterCyberNews(news: any[]) {
  return news.filter((article) =>
    isCyberNews(
      article.title ?? "",
      article.description ?? ""
    )
  );
}