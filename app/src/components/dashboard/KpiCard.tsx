import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  pill,
  value,
  unit,
  footLeft,
  footRight,
  className,
}: {
  label: string;
  pill: ReactNode;
  value: ReactNode;
  unit?: string;
  footLeft: ReactNode;
  footRight: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "flex min-h-[140px] flex-col justify-between rounded-[1.25rem] border-border bg-card p-4 sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-[12px]">
          {label}
        </span>
        <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
          {pill}
        </span>
      </div>
      <div className="flex items-baseline gap-1 text-2xl font-semibold tracking-tight text-white tabular-nums sm:text-3xl">
        {value}
        {unit && <span className="text-sm font-medium text-muted-foreground">{unit}</span>}
      </div>
      <div className="flex flex-wrap justify-between gap-x-2 gap-y-0.5 pt-2 text-[11px] font-medium text-muted-foreground sm:text-[12px]">
        <span className="whitespace-nowrap">{footLeft}</span>
        <span className="whitespace-nowrap">{footRight}</span>
      </div>
    </Card>
  );
}
