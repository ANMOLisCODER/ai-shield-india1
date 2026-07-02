"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    type: string;
    count: number;
  }[];
}

export default function ScanTypeChart({
  data,
}: Props) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
          />

          <XAxis
            dataKey="type"
            stroke="#9CA3AF"
          />

          <YAxis stroke="#9CA3AF" />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#06b6d4"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}