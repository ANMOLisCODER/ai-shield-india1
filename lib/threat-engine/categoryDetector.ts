import { CATEGORY_KEYWORDS } from "./keywords";

export function detectCategory(text: string): string | null {
  const lower = text.toLowerCase();

  let bestCategory: string | null = null;
  let highestScore = 0;

  for (const [category, words] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;

    for (const word of words) {
      if (lower.includes(word.toLowerCase())) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  }

  console.log("CATEGORY:", bestCategory);
  console.log("CATEGORY SCORE:", highestScore);

  return bestCategory;
}