"use client";

import { useState } from "react";

import IndiaMap from "./maps/IndiaMap";
import StateDetailsPanel from "./maps/StateDetailsPanel";

import { Threat } from "./maps/types";

export default function IndiaHeatMap() {

  const [selectedState, setSelectedState] =
    useState<Threat | null>(null);

  return (
    <section className="rounded-3xl border border-cyan-500/20 bg-white/5 p-8 backdrop-blur-xl">

      {/* Header */}

      <div className="mb-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <h2 className="text-4xl font-bold">
            🗺️ India Cyber Threat Map
          </h2>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2">

            <span className="h-3 w-3 rounded-full bg-emerald-400 animate-ping"></span>

            <span className="text-sm font-semibold text-emerald-300">
              LIVE
            </span>

          </div>

        </div>

        <p className="mt-3 text-gray-400">
          Live visualization of scam reports across India.
        </p>

      </div>

      {/* Legend */}

      <div className="mb-8 flex flex-wrap items-center justify-center gap-5 rounded-2xl border border-cyan-500/20 bg-slate-900/60 p-4">

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-green-500"></span>
          <span className="text-sm">Low</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-yellow-400"></span>
          <span className="text-sm">Medium</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-orange-500"></span>
          <span className="text-sm">High</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-red-500"></span>
          <span className="text-sm">Critical</span>
        </div>

      </div>

      <div className="grid xl:grid-cols-[3.5fr_1fr] gap-8">

        <IndiaMap
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />

        <StateDetailsPanel
          state={selectedState}
          onClose={() => setSelectedState(null)}
        />

      </div>

    </section>
  );
}