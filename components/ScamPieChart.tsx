"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#facc15",
  "#ef4444",
];

interface Props {
  safe: number;
  suspicious: number;
  scam: number;
}

export default function ScamPieChart({
  safe,
  suspicious,
  scam,
}: Props) {
  const data = [
    {
      name: "SAFE",
      value: safe,
    },
    {
      name: "SUSPICIOUS",
      value: suspicious,
    },
    {
      name: "SCAM",
      value: scam,
    },
  ];

  const total = safe + suspicious + scam;

  return (
    <div className="relative h-[360px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={75}
            outerRadius={120}
            paddingAngle={5}
            cornerRadius={12}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={2}
            animationBegin={0}
            animationDuration={900}
            label={({ percent }) =>
              `${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(6,182,212,.25)",
              borderRadius: "16px",
              color: "#fff",
            }}
            formatter={(value) => [String(value), "Scans"]}
          />

          <Legend
            verticalAlign="bottom"
            height={40}
            iconType="circle"
            wrapperStyle={{
              color: "#d1d5db",
            }}
          />

        </PieChart>

      </ResponsiveContainer>

      {/* Center Content */}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

        <span className="text-sm uppercase tracking-widest text-gray-400">
          Total
        </span>

        <h2 className="mt-1 text-5xl font-bold text-cyan-400">
          {total}
        </h2>

        <span className="mt-1 text-sm text-gray-500">
          Scans
        </span>

      </div>

    </div>
  );
}