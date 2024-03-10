"use client";

import React from "react";
import { ResponsiveContainer } from "recharts";
import {
  BarChart as BarGraph,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export type BarChartProps = {
  data: {
    name: string;
    enabled: number;
    disabled: number | 0;
  }[];
};

export default function BarChart(props: BarChartProps) {
  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarGraph data={props.data}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={true}
          stroke="#888888"
          fontSize={12}
        />
        <YAxis
          tickLine={true}
          axisLine={true}
          stroke="#888888"
          fontSize={12}
        />
        <Tooltip />
        <Legend  />
        <Bar
          dataKey="enabled"
          stackId="a"
          fill="#16a34a"
        />
        <Bar
          dataKey="disabled"
          stackId="a"
          fill="#dc2626"
          radius={[5, 5, 0, 0]}
        />
      </BarGraph>
    </ResponsiveContainer>
  );
}
