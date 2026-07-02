'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay, { type AutoplayType } from 'embla-carousel-autoplay';
import type { EmblaOptionsType } from 'embla-carousel';

// ---------------------------------------------------------------------------
// Type Definitions
// ---------------------------------------------------------------------------
interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface ApiResponse {
  articles: Article[];
}

// ---------------------------------------------------------------------------
// Relative time helper
// ---------------------------------------------------------------------------
function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='400' height='200' fill='%231e293b'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='system-ui' font-size='16'%3ENo Image%3C/text%3E%3C/svg%3E";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function LiveCyberNewsCarousel() {
  // Data & lifecycle states
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Abort controller ref to prevent memory leaks
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchNews = useCallback(async () => {
    // Cancel any in-flight request
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/news', { signal: controller.signal });
      if (!response.ok) throw new Error('Failed to fetch news');
      const data: ApiResponse = await response.json();
      if (!data.articles || !Array.isArray(data.articles)) {
        throw new Error('Invalid response format');
      }
      setArticles(data.articles);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchNews]);

  // ------------------------------------------------------------------------
  // Embla Carousel setup
  // ------------------------------------------------------------------------
  const autoplayPlugin = useRef<AutoplayType>(
    Autoplay({
      delay: 7000,
      stopOnInteraction: false,
      stopOnMouseEnter: false, // we handle pause manually on the whole container
    })
  );

  const emblaOptions: EmblaOptionsType = {
  loop: true,
  align: "start",
};

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [
    autoplayPlugin.current,
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const updateScrollSnaps = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollSnaps();
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', updateScrollSnaps);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', updateScrollSnaps);
    };
  }, [emblaApi, onSelect, updateScrollSnaps]);

  // Reinitialise when articles change (e.g. after data loaded)
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
      autoplayPlugin.current?.reset();
    }
  }, [articles, emblaApi]);

  // Navigation handlers
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Autoplay pause on hover over the entire component
  const handleMouseEnter = useCallback(() => {
    autoplayPlugin.current?.stop();
  }, []);
  const handleMouseLeave = useCallback(() => {
    autoplayPlugin.current?.play();
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  // ------------------------------------------------------------------------
  // Sub-components
  // ------------------------------------------------------------------------
  const NewsCard: React.FC<{ article: Article; index: number }> = ({
    article,
    index,
  }) => {
    const [imgSrc, setImgSrc] = useState<string>(
      article.urlToImage || FALLBACK_IMAGE
    );

    const handleImageError = useCallback(() => {
      setImgSrc(FALLBACK_IMAGE);
    }, []);

    const handleCardClick = useCallback(() => {
      window.open(article.url, '_blank', 'noopener,noreferrer');
    }, [article.url]);

    const handleCardKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      },
      [handleCardClick]
    );

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`Read more about ${article.title}`}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-lg shadow-lg shadow-cyan-500/10 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-cyan-500/30 focus-within:ring-2 focus-within:ring-cyan-400 focus:outline-none"
      >
        {/* Image container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imgSrc}
            alt={article.title}
            loading="lazy"
            onError={handleImageError}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* LIVE badge */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-red-500/50 animate-pulse">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-white animate-ping" />
              LIVE
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-center justify-between text-xs text-cyan-300/80">
            <span className="font-medium uppercase tracking-wider">
              {article.source.name}
            </span>
            <span>{timeAgo(article.publishedAt)}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-white">
            {article.title}
          </h3>
          <p className="mb-3 flex-1 line-clamp-3 text-xs leading-relaxed text-gray-300">
            {article.description}
          </p>
          <span className="self-start rounded-full border border-cyan-500/30 px-4 py-1.5 text-xs font-medium text-cyan-400 transition-colors hover:bg-cyan-500/20 hover:text-cyan-200">
            Read More
          </span>
        </div>
      </div>
    );
  };

  // Loading skeleton grid
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-3xl border border-cyan-500/20 bg-white/5 backdrop-blur-lg"
        >
          <div className="h-48 rounded-t-3xl bg-slate-800/60" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-1/4 rounded bg-slate-700/50" />
            <div className="h-3 w-3/4 rounded bg-slate-700/50" />
            <div className="h-3 w-5/6 rounded bg-slate-700/50" />
            <div className="h-8 w-24 rounded-full bg-slate-700/50" />
          </div>
        </div>
      ))}
    </div>
  );

  // Error state
  const ErrorState = ({
    message,
    onRetry,
  }: {
    message: string;
    onRetry: () => void;
  }) => (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-red-500/30 bg-white/5 px-6 py-16 text-center backdrop-blur-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      <p className="mt-4 text-lg font-medium text-red-300">
        Unable to load news
      </p>
      <p className="mt-1 text-sm text-gray-400">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-6 py-2 text-sm font-medium text-cyan-300 backdrop-blur transition hover:bg-cyan-500/30 hover:text-cyan-100"
      >
        Try again
      </button>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-cyan-500/20 bg-white/5 px-6 py-16 text-center backdrop-blur-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-cyan-400/70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <p className="mt-4 text-lg font-medium text-cyan-200">
        No live cyber news available
      </p>
      <p className="mt-1 text-sm text-gray-400">
        Check back shortly for the latest updates.
      </p>
    </div>
  );

  // ------------------------------------------------------------------------
  // Main render
  // ------------------------------------------------------------------------
  if (loading) return <SkeletonGrid />;
  if (error)
    return <ErrorState message={error} onRetry={fetchNews} />;
  if (articles.length === 0) return <EmptyState />;

  return (
  <section
    aria-label="Live Cyber News Carousel"
    className="relative group/carousel"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    onKeyDown={handleKeyDown}
  >

    <div className="mb-8">
      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-4xl font-bold text-white">
            📰 Live Cyber News
          </h2>

          <p className="mt-2 text-gray-400">
            Real-time global cybersecurity news and threat intelligence.
          </p>
        </div>

        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 animate-pulse">
          🔴 LIVE
        </span>

      </div>
    </div>

      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {articles.map((article, idx) => (
            <div
              className="
flex-[0_0_100%]
sm:flex-[0_0_50%]
lg:flex-[0_0_33.333%]
xl:flex-[0_0_25%]
px-3
"
              key={`${article.url}-${idx}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${idx + 1} of ${articles.length}`}
            >
              <NewsCard article={article} index={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* Floating navigation arrows (Apple style) */}
      {emblaApi && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-500/30 bg-white/10 p-3 text-cyan-400 opacity-0 backdrop-blur-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-500/30 hover:text-cyan-200 hover:shadow-cyan-500/40 group-hover/carousel:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={scrollNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-cyan-500/30 bg-white/10 p-3 text-cyan-400 opacity-0 backdrop-blur-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-500/30 hover:text-cyan-200 hover:shadow-cyan-500/40 group-hover/carousel:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {scrollSnaps.length > 1 && (
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Carousel dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={index === selectedIndex}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'scale-125 bg-cyan-400 shadow-md shadow-cyan-500/50'
                  : 'bg-cyan-500/30 hover:bg-cyan-400/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}