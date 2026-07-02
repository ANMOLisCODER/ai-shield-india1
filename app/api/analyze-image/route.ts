import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are an AI Scam Detection Expert.

Analyze the uploaded image.

Return ONLY JSON.

{
  "riskScore": 0,
  "verdict": "SAFE",
  "reasons": [
    "reason 1",
    "reason 2"
  ],
  "advice": [
    "advice 1",
    "advice 2",
    "advice 3"
  ]
}

Rules:
- verdict = SAFE, SUSPICIOUS, or SCAM
- minimum 2 reasons
- minimum 3 advice
- return JSON only
- no markdown
- no explanation
`,
            },

            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    const rawText = response.text;

    if (!rawText) {
      return NextResponse.json(
        {
          error: "Gemini returned empty response",
        },
        {
          status: 500,
        }
      );
    }

    const cleanedText = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

      const parsed = JSON.parse(cleanedText);

await supabase
  .from("scan_history")
  .insert([
    {
      scan_type: "IMAGE",
      content: "Image Scan",
      verdict: parsed.verdict,
      risk_score: parsed.riskScore,
      created_at: new Date().toISOString(),
    },
  ]);

    return NextResponse.json({
  result: JSON.stringify(parsed),
});
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Image Analysis Failed",
      },
      {
        status: 500,
      }
    );
  }
}