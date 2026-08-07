import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { nplTrend } from "@/lib/mock-data";

const chartConfig = {
  npl: {
    label: "Taux NPL",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function NplTrendChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[180px] w-full">
      <AreaChart data={nplTrend} margin={{ left: 0, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillNpl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-npl)" stopOpacity={0.35} />
            <stop offset="95%" stopColor="var(--color-npl)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          fontSize={11}
          domain={[0, 45]}
          tickFormatter={(v) => `${v}%`}
          width={42}
        />
        <ReferenceLine
          y={15}
          stroke="var(--chart-5)"
          strokeDasharray="4 4"
          label={{ value: "Plafond BCEAO 15%", position: "insideTopLeft", fontSize: 10, fill: "var(--muted-foreground)" }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent formatter={(value) => [`${value}%`, " Taux NPL"]} />}
        />
        <Area
          dataKey="npl"
          type="monotone"
          fill="url(#fillNpl)"
          stroke="var(--color-npl)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
