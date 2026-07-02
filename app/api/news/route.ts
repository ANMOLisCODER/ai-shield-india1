import { NextResponse } from "next/server";
import { filterCyberNews } from "@/lib/threat-engine/filters";

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY;

const query =
    '(cyber OR cybersecurity OR cybercrime OR phishing OR ransomware OR malware OR "data breach" OR hacking OR hacker)';
const url =
  `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=20&searchIn=title,description&apiKey=${apiKey}`;
    const response = await fetch(url, {
  cache: "no-store",
});

    const data = await response.json();

const cyberRegex =
  /ransomware|malware|phishing|smishing|vishing|data breach|breach|cyber attack|cybercrime|hack|hacker|exploit|zero-day|vulnerability|spyware|trojan|botnet|ddos|credential theft|identity theft|fraud|scam|upi fraud|bank fraud|digital arrest|cert-in|cve-\d+/i;
const filtered = (data.articles ?? []).filter((article: any) => {
  const text = `${article.title ?? ""} ${article.description ?? ""}`;
  return cyberRegex.test(text);
});

return NextResponse.json({
  ...data,
  articles: filtered,
});

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}