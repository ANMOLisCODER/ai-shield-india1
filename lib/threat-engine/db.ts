import { supabase } from "@/lib/supabase";

export async function saveThreat(ai: any) {
  if (!ai.state || ai.state === "Unknown") return;

  const { data: existing } = await supabase
    .from("state_threats")
    .select("*")
    .eq("state", ai.state)
    .single();

  if (existing) {
    await supabase
      .from("state_threats")
      .update({
        threat_score: Math.max(
          existing.threat_score ?? 0,
          ai.threat_score
        ),
        threat_level: ai.threat_level,
        incidents: (existing.incidents ?? 0) + 1,
        latest_alert: ai.summary,
        updated_at: new Date().toISOString(),
      })
      .eq("state", ai.state);
  } else {
    await supabase
      .from("state_threats")
      .insert({
        state: ai.state,
        threat_score: ai.threat_score,
        threat_level: ai.threat_level,
        incidents: 1,
        latest_alert: ai.summary,
      });
  }
}