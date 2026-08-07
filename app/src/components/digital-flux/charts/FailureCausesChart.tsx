import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
const chartConfig = {
  wave: { label: "Wave", color: "var(--bma-wave-money)" },
  orange: { label: "Orange Money", color: "var(--bma-orange-money)" },
} satisfies ChartConfig;

export function FailureCausesChart({
  data,
}: {
  data: { cause: string; wave: number; orange: number }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[180px] w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" />
        <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis
          dataKey="cause"
          type="category"
          tickLine={false}
          axisLine={false}
          width={110}
          fontSize={11}
        />
        <ChartTooltip cursor={{ fill: "var(--secondary)" }} content={<ChartTooltipContent className="min-w-44" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="wave" fill="var(--color-wave)" radius={[0, 6, 6, 0]} maxBarSize={16} />
        <Bar dataKey="orange" fill="var(--color-orange)" radius={[0, 6, 6, 0]} maxBarSize={16} />
      </BarChart>
    </ChartContainer>
  );
}
