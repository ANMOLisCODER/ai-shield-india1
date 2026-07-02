import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("audio") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No audio uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    // ==========================
    // DEEPGRAM SPEECH TO TEXT
    // ==========================

    const deepgramResponse = await fetch(
      "https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true",
      {
        method: "POST",

        headers: {
          Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
          "Content-Type":
            file.type || "audio/mpeg",
        },

        body: buffer,
      }
    );

    const deepgramData =
      await deepgramResponse.json();

    console.log(
      "DEEPGRAM =",
      JSON.stringify(
        deepgramData,
        null,
        2
      )
    );

    const transcript =
      deepgramData?.results?.channels?.[0]
        ?.alternatives?.[0]
        ?.transcript || "";

    if (!transcript) {
      return NextResponse.json(
        {
          error:
            "No speech detected in audio",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================
    // GROQ ANALYSIS
    // ==========================

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          model:
            "llama-3.3-70b-versatile",

          messages: [
            {
              role: "system",

              content: `
You are an expert cybercrime investigator.

Analyze the transcript for:

- OTP requests
- Bank account suspension threats
- KYC scams
- UPI scams
- Lottery scams
- Investment scams
- Impersonation scams
- Urgency tactics
- Fear tactics

Scoring Rules:

SAFE = 0-30
SUSPICIOUS = 31-70
SCAM = 71-100

If transcript asks for OTP,
bank details,
UPI PIN,
CVV,
password,
or threatens account suspension,
risk score MUST be above 80.

Return ONLY JSON

Rules:
- verdict can ONLY be:
  SAFE
  SUSPICIOUS
  SCAM

Examples:

OTP request = SCAM
Bank account suspension threat = SCAM
Lottery scam = SCAM
UPI fraud = SCAM
Unknown suspicious call = SUSPICIOUS
Normal conversation = SAFE

JSON format:

JSON format:

{
  "riskScore": 15,
  "verdict": "SAFE",
  "reasons": [
    "No scam indicators detected",
    "Conversation appears normal"
  ],
  "advice": [
    "No immediate action required",
    "Stay cautious with unknown callers",
    "Never share OTP or banking details"
  ]
}

IMPORTANT:
- reasons array must contain minimum 2 items
- advice array must contain minimum 3 items
- NEVER return empty arrays
- ALWAYS fill reasons and advice
- JSON only
`,
            },

            {
              role: "user",
              content: transcript,
            },
          ],

          temperature: 0.2,
        }),
      }
    );

    const groqData =
      await groqResponse.json();

    const raw =
      groqData?.choices?.[0]
        ?.message?.content;

    if (!raw) {
      return NextResponse.json(
        {
          error:
            "Groq analysis failed",
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

    const parsed =
  JSON.parse(cleaned);

await supabase
  .from("scan_history")
  .insert([
    {
      scan_type: "VOICE",
      content: transcript,
      verdict: parsed.verdict,
      risk_score: parsed.riskScore,
      created_at: new Date().toISOString(),
    },
  ]);

return NextResponse.json({
  transcript,
  result: parsed,
});

  } catch (error: any) {

    console.error(
      "VOICE ERROR =",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Voice Analysis Failed",
      },
      {
        status: 500,
      }
    );
  }
}