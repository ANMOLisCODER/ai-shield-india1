"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  url: string;
  source?: {
    name: string;
  };
  publishedAt: string;
};

export default function LiveCyberNews() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadNews() {
    try {
      const res = await fetch("/api/news", {
        cache: "no-store",
      });

      const data = await res.json();

      setNews(data.articles ?? []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNews();

    const interval = setInterval(loadNews, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-xl p-6">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-3xl font-bold">
          📰 Live Cyber News
        </h2>

        <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 animate-pulse">
          LIVE
        </span>

      </div>

      {loading ? (
        <p className="text-gray-400">
          Loading...
        </p>
      ) : (
<div className="flex h-[900px] flex-col gap-4 overflow-y-auto pr-2">
          {news.slice(0, 12).map((article, index) => (

            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block flex-shrink-0 rounded-2xl border border-white/10 bg-[#10192d] p-4 transition hover:border-cyan-500 hover:bg-[#13213c]"
            >

              <div className="flex items-center gap-2 mb-2">

                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>

                <span className="text-xs text-cyan-300">

                  {article.source?.name ?? "Unknown"}

                </span>

              </div>

              <h3 className="line-clamp-3 font-semibold leading-6">

                {article.title}

              </h3>

              <p className="mt-3 text-xs text-gray-500">

                {new Date(article.publishedAt).toLocaleString()}

              </p>

            </a>

          ))}

        </div>
      )}

    </aside>
  );
}