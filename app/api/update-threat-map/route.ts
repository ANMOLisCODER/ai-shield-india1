import { NextResponse } from "next/server";
import { runThreatEngine } from "@/lib/threat-engine/engine";

export async function GET() {
  try {

    const result = await runThreatEngine();

    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Threat Engine Failed",
      },
      {
        status: 500,
      }
    );

  }
}