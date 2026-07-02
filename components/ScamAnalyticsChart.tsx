"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

interface Props {
  data: {
    day: string;
    scans: number;
  }[];
}

export default function ScamAnalyticsChart({
  data,
}: Props) {
  return (
    <div className="h-[380px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >

          <defs>

            <linearGradient
              id="analyticsFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#06b6d4"
                stopOpacity={0.45}
              />

              <stop
                offset="100%"
                stopColor="#06b6d4"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#273244"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="day"
            tick={{
              fill: "#94a3b8",
              fontSize: 13,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 13,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#06b6d4",
              strokeWidth: 1,
            }}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(6,182,212,.25)",
              borderRadius: "16px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="scans"
            fill="url(#analyticsFill)"
            stroke="none"
          />

          <Line
            type="monotone"
            dataKey="scans"
            stroke="#22d3ee"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#22d3ee",
              stroke: "#0f172a",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 8,
              fill: "#22d3ee",
              stroke: "#ffffff",
              strokeWidth: 3,
            }}
            animationDuration={1200}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}