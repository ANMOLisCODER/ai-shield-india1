export function removeDuplicateNews(news: any[]) {
  const seen = new Set<string>();

  return news.filter((item) => {
    const title = (item.title || "")
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .trim();

    if (seen.has(title)) return false;

    seen.add(title);

    return true;
  });
}