"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  TriangleAlert,
  Activity,
  Gauge,
} from "lucide-react";

export default function ThreatStats() {
  const [stats, setStats] = useState({
    totalStates: 0,
    highRisk: 0,
    incidents: 0,
    average: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/state-threats");
        const data = await res.json();

        const totalStates = data.length;

        const highRisk = data.filter(
          (x: any) => x.threat_score >= 75
        ).length;

        const incidents = data.reduce(
          (a: number, b: any) => a + (b.incidents || 0),
          0
        );

        const average =
          Math.round(
            data.reduce(
              (a: number, b: any) => a + b.threat_score,
              0
            ) / totalStates
          ) || 0;

        setStats({
          totalStates,
          highRisk,
          incidents,
          average,
        });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section>

      <div className="mb-8">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div>

            <h2 className="text-4xl font-bold text-white">
              📊 Live Threat Statistics
            </h2>

            <p className="mt-2 text-gray-400">
              Real-time cyber threat intelligence across India.
            </p>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-5 py-2">

            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-ping"></span>

            <span className="text-cyan-300 font-semibold">
              LIVE
            </span>

          </div>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          icon={<ShieldCheck size={30} />}
          title="Protected States"
          value={loading ? "--" : stats.totalStates}
          subtitle="Indian States Covered"
          color="cyan"
        />

        <Card
          icon={<TriangleAlert size={30} />}
          title="High Risk"
          value={loading ? "--" : stats.highRisk}
          subtitle="Critical Monitoring"
          color="red"
        />

        <Card
          icon={<Activity size={30} />}
          title="Incidents"
          value={loading ? "--" : stats.incidents.toLocaleString()}
          subtitle="Reports Recorded"
          color="yellow"
        />

        <Card
          icon={<Gauge size={30} />}
          title="Average Threat"
          value={loading ? "--" : `${stats.average}%`}
          subtitle="National Threat Score"
          color="orange"
        />

      </div>

    </section>
  );
}

function Card({
  icon,
  title,
  value,
  subtitle,
  color,
}: any) {

  const colors: any = {
    cyan: {
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/10",
      text: "text-cyan-300",
      glow: "hover:shadow-[0_0_40px_rgba(6,182,212,.25)]",
    },

    red: {
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      text: "text-red-300",
      glow: "hover:shadow-[0_0_40px_rgba(239,68,68,.25)]",
    },

    yellow: {
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      text: "text-yellow-300",
      glow: "hover:shadow-[0_0_40px_rgba(234,179,8,.25)]",
    },

    orange: {
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
      text: "text-orange-300",
      glow: "hover:shadow-[0_0_40px_rgba(249,115,22,.25)]",
    },
  };

  return (
    <div
      className={`
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      backdrop-blur-xl
      bg-white/5
      p-6
      transition-all
      duration-300
      hover:-translate-y-2
      ${colors[color].border}
      ${colors[color].glow}
      `}
    >

      <div
        className={`
        absolute
        inset-0
        opacity-0
        transition
        duration-500
        group-hover:opacity-100
        ${colors[color].bg}
        `}
      />

      <div className="relative">

        <div className="flex items-center justify-between">

          <div
            className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${colors[color].bg}
            ${colors[color].text}
            `}
          >
            {icon}
          </div>

          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
            LIVE
          </span>

        </div>

        <p className="mt-6 text-sm uppercase tracking-widest text-gray-400">
          {title}
        </p>

        <h2
          className={`
          mt-3
          text-5xl
          font-extrabold
          ${colors[color].text}
          `}
        >
          {value}
        </h2>

        <p className="mt-3 text-sm text-gray-500">
          {subtitle}
        </p>

      </div>

    </div>
  );
}