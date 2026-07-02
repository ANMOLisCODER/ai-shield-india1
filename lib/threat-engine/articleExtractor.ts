import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function extractArticle(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const html = await response.text();

    const dom = new JSDOM(html, {
      url,
    });

    const reader = new Readability(dom.window.document);

    const article = reader.parse();

    if (!article) return "";

    return article.textContent ?? "";
  } catch (err) {
    console.error("Article Extractor Error:", err);

    return "";
  }
}