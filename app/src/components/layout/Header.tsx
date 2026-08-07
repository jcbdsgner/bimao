import { useState } from "react";
import { Menu, CalendarRange } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMobileNav } from "@/components/layout/MobileNavContext";

const PERIODS = [
  { value: "semaine", label: "Semaine" },
  { value: "mois", label: "Mois" },
  { value: "trimestre", label: "Trimestre" },
];

const dateFr = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

function CustomPeriodPicker({
  active,
  onApply,
}: {
  active: boolean;
  onApply: (from: string, to: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [applied, setApplied] = useState<{ from: string; to: string } | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex h-full items-center justify-center gap-1.5 rounded-full px-4 text-[11px] font-semibold text-slate-400 transition-colors hover:text-white data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(0,0,123,0.5)]"
          data-state={active ? "active" : "inactive"}
        >
          <CalendarRange className="h-3.5 w-3.5" />
          {applied ? `${dateFr(applied.from)} — ${dateFr(applied.to)}` : "Période"}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="mb-4 text-sm font-semibold text-white">Période personnalisée</div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <label htmlFor="period-from" className="w-7 shrink-0 text-xs font-medium text-slate-400">
              Du
            </label>
            <input
              id="period-from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-9 w-full rounded-lg border border-white/10 bg-background/60 px-3 text-xs text-white outline-none focus:border-ring [color-scheme:dark]"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="period-to" className="w-7 shrink-0 text-xs font-medium text-slate-400">
              Au
            </label>
            <input
              id="period-to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-9 w-full rounded-lg border border-white/10 bg-background/60 px-3 text-xs text-white outline-none focus:border-ring [color-scheme:dark]"
            />
          </div>
        </div>

        <Button
          type="button"
          disabled={!from || !to}
          onClick={() => {
            setApplied({ from, to });
            onApply(from, to);
            setOpen(false);
          }}
          className="mt-4 w-full gap-2 rounded-xl"
        >
          Filtrer
        </Button>

        {applied && (
          <button
            type="button"
            onClick={() => {
              setApplied(null);
              setFrom("");
              setTo("");
              setOpen(false);
            }}
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            Réinitialiser
          </button>
        )}

        {applied && (
          <p className="mt-3 text-[11px] text-slate-500">
            Filtre actif : {dateFr(applied.from)} — {dateFr(applied.to)}
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function Header({
  title,
  subtitle,
  period,
  onPeriodChange,
}: {
  title: string;
  subtitle: string;
  period?: string;
  onPeriodChange?: (value: string) => void;
}) {
  const { open } = useMobileNav();

  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 bg-card/75 px-4 py-3.5 backdrop-blur-xl sm:px-8">
      <div className="flex items-center space-x-4">
        <button
          aria-label="Ouvrir le menu"
          onClick={open}
          className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-300 hover:bg-white/5 hover:text-white md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-base font-bold tracking-tight text-white">{title}</h2>
          <p className="text-xs font-medium text-slate-400">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {period !== undefined && onPeriodChange && (
          <Tabs value={period} onValueChange={onPeriodChange}>
            <TabsList className="flex !h-[42px] items-center gap-1 rounded-full border border-white/5 bg-background/60 p-1">
              {PERIODS.map((p) => (
                <TabsTrigger
                  key={p.value}
                  value={p.value}
                  className="flex h-full items-center justify-center rounded-full px-5 text-[11px] font-semibold text-slate-400 data-[state=active]:!border-transparent data-[state=active]:!bg-primary data-[state=active]:!text-white data-[state=active]:shadow-[0_4px_12px_rgba(0,0,123,0.5)]"
                >
                  {p.label}
                </TabsTrigger>
              ))}
              <CustomPeriodPicker active={period === "custom"} onApply={() => onPeriodChange("custom")} />
            </TabsList>
          </Tabs>
        )}

        <div className="hidden items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 lg:flex">
          <span className="mr-1.5 text-[11px] font-semibold uppercase text-slate-400">Agence:</span>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 rounded-full border-none bg-slate-800/30 px-3 text-xs font-semibold text-white shadow-none focus-visible:ring-0 [&_svg]:opacity-60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes (Consolidé)</SelectItem>
              <SelectItem value="dakar">Siège Dakar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
