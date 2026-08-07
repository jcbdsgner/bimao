import { Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

export function TwoSliceDonut({
  data,
  nameKey,
  valueKey,
  colors,
  unit,
}: {
  data: Record<string, unknown>[];
  nameKey: string;
  valueKey: string;
  colors: [string, string];
  unit?: string;
}) {
  const config = { [valueKey]: { label: valueKey } } satisfies ChartConfig;

  return (
    <ChartContainer config={config} className="mx-auto aspect-auto h-[180px] w-full">
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              nameKey={nameKey}
              formatter={(value, name, item) => {
                const hoveredName = (item.payload as Record<string, unknown> | undefined)?.[nameKey];
                const index = data.findIndex((entry) => entry[nameKey] === hoveredName);
                return (
                  <>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                      style={{ backgroundColor: colors[(index < 0 ? 0 : index) % colors.length] }}
                    />
                    <div className="flex flex-1 items-center justify-between leading-none">
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-mono font-medium text-foreground tabular-nums">
                        {unit ? `${value} ${unit}` : `${value}`}
                      </span>
                    </div>
                  </>
                );
              }}
            />
          }
        />
        <Pie data={data} dataKey={valueKey} nameKey={nameKey} innerRadius={46} outerRadius={72} strokeWidth={2} stroke="var(--card)">
          {data.map((entry, index) => (
            <Cell key={String(entry[nameKey])} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
