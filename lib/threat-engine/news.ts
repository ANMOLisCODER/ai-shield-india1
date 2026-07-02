import Parser from "rss-parser";

const parser = new Parser();

export type NewsArticle = {
  title: string;
  description: string;
  content: string;
  link: string;
  source: string;
  published: string;
};

export async function fetchRSSNews(): Promise<NewsArticle[]> {
  try {
    const feed = await parser.parseURL(
      "https://news.google.com/rss/search?q=cyber+fraud+india&hl=en-IN&gl=IN&ceid=IN:en"
    );

    return feed.items.map((item) => ({
      title: item.title ?? "",
      description: item.contentSnippet ?? "",
      content: item.content ?? item.contentSnippet ?? "",
      link: item.link ?? "",
      source: "Google RSS",
      published: item.pubDate ?? "",
    }));
  } catch (err) {
    console.error("RSS Error:", err);
    return [];
  }
}

export async function fetchNewsAPI(): Promise<NewsArticle[]> {
  try {
    const url =
      `https://newsapi.org/v2/everything?` +
      `q=India AND (cyber OR scam OR phishing OR fraud OR ransomware)` +
      `&language=en` +
      `&pageSize=20` +
      `&sortBy=publishedAt` +
      `&apiKey=${process.env.NEWS_API_KEY}`;

    const res = await fetch(url);

    const json = await res.json();

    if (!json.articles) return [];

    return json.articles.map((a: any) => ({
      title: a.title ?? "",
      description: a.description ?? "",
      content: a.content ?? "",
      link: a.url ?? "",
      source: a.source?.name ?? "NewsAPI",
      published: a.publishedAt ?? "",
    }));
  } catch (err) {
    console.error("NewsAPI Error:", err);
    return [];
  }
}

export async function fetchAllNews() {
  const [rss, newsapi] = await Promise.all([
    fetchRSSNews(),
    fetchNewsAPI(),
  ]);

  const merged = [...rss, ...newsapi];

  const unique = merged.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (x) =>
          x.title.trim().toLowerCase() ===
          item.title.trim().toLowerCase()
      )
  );

  return unique;
}