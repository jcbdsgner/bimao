import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { carthagoByDomain } from "@/lib/mock-data";

const chartConfig = {
  auto: { label: "Automatisé (Carthago)", color: "var(--chart-3)" },
  manuel: { label: "Manuel (Excel)", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function DomainCoverageChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
      <BarChart data={carthagoByDomain} margin={{ left: 0, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="domain"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          interval={0}
          angle={-20}
          textAnchor="end"
          height={40}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={4} fontSize={11} width={24} allowDecimals={false} />
        <ChartTooltip cursor={{ fill: "var(--secondary)" }} content={<ChartTooltipContent className="min-w-56" />} />
        <Bar dataKey="auto" stackId="kpi" fill="var(--color-auto)" radius={[0, 0, 6, 6]} maxBarSize={36} />
        <Bar dataKey="manuel" stackId="kpi" fill="var(--color-manuel)" radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ChartContainer>
  );
}
