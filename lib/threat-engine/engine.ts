import { fetchAllNews } from "./news";
import { filterCyberNews } from "./filters";
import { removeDuplicateNews } from "./dedupe";
import { detectState } from "./stateDetector";
import { applyRules } from "./ruleEngine";
import {
  hashNews,
  getCachedThreat,
  saveCachedThreat,
} from "./cache";
import { analyzeWithAI } from "./ai";
import { analyzeWithGemini } from "./gemini";
import { saveThreat } from "./db";
import { extractArticle } from "./articleExtractor";
import { detectCategory } from "./categoryDetector";
import { evaluateConfidence } from "./confidenceEngine";

export async function runThreatEngine() {
  const allNews = await fetchAllNews();

  const cyberNews = filterCyberNews(allNews);

  const uniqueNews = removeDuplicateNews(cyberNews);

  const topNews = uniqueNews.slice(0, 5);

  const analyzed = [];

  let aiCalls = 0;
  let cacheHits = 0;
  let ruleEngineHits = 0;

  for (const article of topNews) {

    let articleBody = article.content ?? "";

try {
  if (article.link) {
    articleBody = await extractArticle(article.link);
  }
} catch (err) {
  console.log("Article extraction skipped");
}

const fullText = `
${article.title}

${article.description}

${articleBody}
`;

    // STEP 1 — Cache
    const hash = hashNews(fullText);

    const cached = await getCachedThreat(hash);

    if (cached) {

      cacheHits++;

      await saveThreat(cached);

      analyzed.push(cached);

      continue;
    }

    // STEP 2 — State Detector
    const state = detectState(fullText);

    const category = detectCategory(fullText);

console.log("=================================");
console.log("TITLE:", article.title);
console.log("STATE DETECTED:", state);
console.log("CATEGORY FOUND:", category);
console.log("=================================");

    let threat;

    if (state || category) {

  ruleEngineHits++;

  const rule = applyRules(fullText);

  const confidence = evaluateConfidence(
    state,
    category,
    rule.threat_score
  );

  console.log("CONFIDENCE:", confidence.confidence);
  console.log("USE AI:", confidence.useAI);

  if (confidence.useAI) {

    aiCalls++;

    threat = await analyzeWithGemini(fullText);

  } else {

    threat = {
      state: state ?? "Unknown",
      category: category ?? rule.category,
      threat_level: rule.threat_level,
      threat_score: rule.threat_score,
      summary: article.title,
    };

  }

} else {

  aiCalls++;

  threat = await analyzeWithAI(fullText);

}

    await saveCachedThreat(
      hash,
      article.title,
      threat
    );

    await saveThreat(threat);

    analyzed.push(threat);
  }

  return {
    total: allNews.length,
    cyber: cyberNews.length,
    unique: uniqueNews.length,
    processed: topNews.length,
    aiCalls,
    cacheHits,
    ruleEngineHits,
    analyzed,
  };
}