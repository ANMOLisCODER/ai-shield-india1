"use client";

import { useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

type Threat = {
  state: string;
  threat_score: number;
  threat_level: string;
  incidents: number;
};

const AUTOPLAY_DELAY = 6000;

const levelColors: Record<string, string> = {
  CRITICAL:
    "bg-red-500/20 text-red-400 border border-red-500/30",

  HIGH:
    "bg-orange-500/20 text-orange-400 border border-orange-500/30",

  MEDIUM:
    "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",

  LOW:
    "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
};

export default function TopRiskStatesHorizontal() {
  const [states, setStates] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: AUTOPLAY_DELAY,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );
  useEffect(() => {
  if (!emblaApi) return;

  emblaApi.scrollTo(0, true);
}, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    async function loadStates() {
      try {
        const res = await fetch("/api/state-threats", {
          cache: "no-store",
        });

        const data = await res.json();

        const sorted = [...data]
          .filter(
            (x: Threat) => x.threat_score > 0
          )
          .sort(
            (a: Threat, b: Threat) =>
              b.threat_score -
              a.threat_score
          )
          .slice(0, 10);

        setStates(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStates();

    const interval = setInterval(
      loadStates,
      30000
    );

    return () =>
      clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

        <div className="animate-pulse">

          <div className="mb-8 h-8 w-64 rounded bg-white/10" />

          <div className="flex gap-5">

            {Array.from({ length: 4 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="h-52 flex-1 rounded-3xl bg-white/10"
                />
              )
            )}

          </div>

        </div>

      </section>
    );
  }
    return (

    <section className="relative rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Flame className="h-8 w-8 text-orange-400" />

            <h2 className="text-3xl font-bold text-white">
              Top Risk States
            </h2>

          </div>

          <p className="mt-2 text-gray-400">
            Ranked by real-time cyber threat score
          </p>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={scrollPrev}
            className="rounded-full border border-cyan-500/20 bg-slate-900/80 p-3 text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={scrollNext}
            className="rounded-full border border-cyan-500/20 bg-slate-900/80 p-3 text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20"
          >
            <ChevronRight size={22} />
          </button>

        </div>

      </div>

      <div
        className="overflow-hidden"
        ref={emblaRef}
      >

        <div className="flex">

          {states.map((item, index) => (

            <div
              key={item.state}
              className="min-w-0 flex-[0_0_100%] px-3 sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
            >

              <div className="h-full rounded-3xl border border-red-500/20 bg-[#11182d] p-6 transition duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-widest text-cyan-400">
                      Rank #{index + 1}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-white">
                      {item.state}
                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="text-3xl font-bold text-red-400">
                      {item.threat_score}
                    </p>

                    <p className="text-xs text-gray-500">
                      /100
                    </p>

                  </div>

                </div>

                <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-700">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-700"
                    style={{
                      width: `${item.threat_score}%`,
                    }}
                  />

                </div>
                                <div className="mb-6 flex items-center justify-between">

                  <span className="text-gray-400">
                    Threat Level
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      levelColors[
                        item.threat_level.toUpperCase()
                      ] ??
                      "bg-slate-700 text-white"
                    }`}
                  >
                    {item.threat_level}
                  </span>

                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">

                  <div>

                    <p className="text-xs uppercase tracking-widest text-gray-500">
                      Incidents
                    </p>

                    <p className="mt-2 text-2xl font-bold text-cyan-300">
                      {item.incidents}
                    </p>

                  </div>

                  <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

                    <p className="text-xs text-cyan-300">
                      LIVE
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
            {states.length === 0 && !loading && (

        <div className="mt-8 rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">

          <p className="text-lg font-semibold text-red-300">
            No threat data available.
          </p>

        </div>

      )}

    </section>

  );

}


