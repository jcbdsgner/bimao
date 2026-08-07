import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { netPositionTrend } from "@/lib/mock-data";

const chartConfig = {
  entrants: { label: "Entrants", color: "var(--chart-3)" },
  sortants: { label: "Sortants", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function NetPositionChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[180px] w-full">
      <LineChart data={netPositionTrend} margin={{ left: 0, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          tickFormatter={(v) => `${v}`}
          width={32}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--border)" }}
          content={<ChartTooltipContent formatter={(value) => [`${value} Mds`, ""]} />}
        />
        <Line dataKey="entrants" type="monotone" stroke="var(--color-entrants)" strokeWidth={2} dot={false} />
        <Line dataKey="sortants" type="monotone" stroke="var(--color-sortants)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  );
}
