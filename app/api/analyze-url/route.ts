import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // -------------------------
    // Google Safe Browsing Check
    // -------------------------

    const safeBrowsingResponse = await fetch(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: {
            clientId: "ai-shield-india",
            clientVersion: "1.0",
          },
          threatInfo: {
            threatTypes: [
              "MALWARE",
              "SOCIAL_ENGINEERING",
              "UNWANTED_SOFTWARE",
              "POTENTIALLY_HARMFUL_APPLICATION",
            ],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }],
          },
        }),
      }
    );

    const safeBrowsingData = await safeBrowsingResponse.json();

    // -------------------------
    // Blacklisted URL Found
    // -------------------------

    if (safeBrowsingData.matches) {
      return NextResponse.json({
        result: JSON.stringify({
          riskScore: 100,
          verdict: "SCAM",
          reasons: [
            "Google Safe Browsing detected this URL as malicious",
            "URL appears in known phishing or malware database",
          ],
          advice: [
            "Do not open this website",
            "Do not enter personal information",
            "Report and block the URL immediately",
          ],
        }),
      });
    }

    // -------------------------
    // Groq Analysis
    // -------------------------

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are a cybersecurity URL analysis expert.

Analyze the URL.

Return ONLY valid JSON.

Example:

{
  "riskScore": 35,
  "verdict": "SAFE",
  "reasons": [
    "Legitimate domain structure",
    "No obvious phishing indicators"
  ],
  "advice": [
    "Proceed with caution",
    "Verify website identity",
    "Avoid sharing sensitive information unnecessarily"
  ]
}

Rules:

- verdict must be SAFE, SUSPICIOUS or SCAM
- minimum 2 reasons
- minimum 3 advice points
- JSON only
- no markdown
`
        },
        {
          role: "user",
          content: url,
        },
      ],
    });
    
const parsed = JSON.parse(
  completion.choices[0].message.content || "{}"
);

await supabase
  .from("scan_history")
  .insert([
    {
      scan_type: "URL",
      content: url,
      verdict: parsed.verdict,
      risk_score: parsed.riskScore,
      created_at: new Date().toISOString(),
    },
  ]);
    return NextResponse.json({
  result: JSON.stringify(parsed),
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "URL Analysis Failed" },
      { status: 500 }
    );
  }
}