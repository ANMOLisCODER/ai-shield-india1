import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { article } = await req.json();

    if (!article) {
      return NextResponse.json(
        {
          error: "Article is required",
        },
        {
          status: 400,
        }
      );
    }

    const prompt = `
You are an Indian Cyber Threat Intelligence AI.

Your job is to analyze ONE cyber-security news article.

Return ONLY valid JSON.

{
  "state":"Maharashtra",
  "city":"Mumbai",
  "threat_level":"HIGH",
  "threat_score":82,
  "category":"UPI Fraud",
  "summary":"One sentence summary."
}

Rules:

- State MUST be an Indian State or Union Territory.
- If only a city is mentioned, infer the correct state.
- threat_level = LOW | MEDIUM | HIGH | CRITICAL
- threat_score = integer from 0 to 100
- category MUST be one of:

UPI Fraud
Banking Fraud
Phishing
Malware
Ransomware
Data Breach
Fake Loan
Investment Scam
QR Scam
SIM Swap
Digital Arrest
Other

Return ONLY JSON.

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
        }),
      }
    );

    const gemini = await response.json();

    const raw =
      gemini?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    if (!raw) {
      return NextResponse.json(
        {
          error: "Gemini returned empty response",
        },
        {
          status: 500,
        }
      );
    }

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const ai = JSON.parse(cleaned);

    return NextResponse.json(ai);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "AI analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}