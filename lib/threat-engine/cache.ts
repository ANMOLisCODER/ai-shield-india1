import crypto from "crypto";
import { supabase } from "@/lib/supabase";

export function hashNews(text: string) {
  return crypto
    .createHash("sha256")
    .update(text)
    .digest("hex");
}

export async function getCachedThreat(hash: string) {
  const { data } = await supabase
    .from("analyzed_news")
    .select("*")
    .eq("news_hash", hash)
    .single();

  return data;
}

export async function saveCachedThreat(
  hash: string,
  title: string,
  ai: any
) {
  await supabase.from("analyzed_news").upsert({
    news_hash: hash,
    title,
    state: ai.state,
    threat_score: ai.threat_score,
    threat_level: ai.threat_level,
    category: ai.category,
    summary: ai.summary,
  });
}