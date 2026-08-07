import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
const chartConfig = {
  count: { label: "Tickets" },
  Basse: { label: "Basse", color: "var(--chart-5)" },
  Moyenne: { label: "Moyenne", color: "var(--chart-3)" },
  Haute: { label: "Haute", color: "var(--chart-4)" },
  "Très haute": { label: "Très haute", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function TicketsByPriorityChart({
  data,
}: {
  data: { priority: string; count: number; fill: string }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-[220px] w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" />
        <XAxis type="number" tickLine={false} axisLine={false} tickMargin={4} fontSize={11} allowDecimals={false} />
        <YAxis
          dataKey="priority"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={11}
          width={72}
        />
        <ChartTooltip cursor={{ fill: "var(--secondary)" }} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={28}>
          {data.map((entry) => (
            <Cell key={entry.priority} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
