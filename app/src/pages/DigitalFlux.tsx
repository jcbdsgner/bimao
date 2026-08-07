import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { FailureCausesChart } from "@/components/digital-flux/charts/FailureCausesChart";
import { type Period, bankToWalletByPeriod, monetiqueByPeriod, fmtMds, fmtNum, fmtPct } from "@/lib/period-data";

export function DigitalFlux() {
  const [period, setPeriod] = useState<Period>("mois");
  const data = bankToWalletByPeriod[period];
  const monetique = monetiqueByPeriod[period];

  const failureCauses = [
    { cause: "Solde insuffisant", wave: data.wave.causeSoldeInsuffisant, orange: data.orange.causeSoldeInsuffisant },
    { cause: "Time-out API", wave: data.wave.causeTimeout, orange: data.orange.causeTimeout },
  ];

  return (
    <>
      <Header
        title="Tableau de Pilotage Exécutif"
        subtitle="Données arrêtées au 31 Janvier 2026"
        period={period}
        onPeriodChange={(value) => setPeriod(value as Period)}
      />
      <main className="max-w-[1400px] space-y-6 p-4 sm:space-y-8 sm:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-center">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              MODULE SPÉCIALISÉ — MOBILE MONEY &amp; TRANSFERTS B2W
            </span>
            <h1 className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              Analyse Détaillée Bank-to-Wallet (B2W)
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          <Card className="space-y-6 rounded-[1.25rem] border-border bg-card p-4 sm:p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
              <div>
                <h3 className="text-base font-semibold text-slate-300">Transferts Bank-to-Wallet (Wave &amp; Orange)</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Échecs, volumes et taux de conversion par canal
                </p>
              </div>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                <span className="text-rose-400">●</span> {fmtPct(data.failureRate)} d'échec global
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="flex flex-col justify-between rounded-[0.875rem] border border-white/5 bg-secondary/40 p-2.5 sm:p-4">
                <span className="text-[11px] font-semibold uppercase text-muted-foreground sm:text-[12px]">
                  Demandes Totales
                </span>
                <span className="mt-2 text-lg font-semibold text-white tabular-nums sm:text-2xl">{fmtNum(data.total)}</span>
                <span className="mt-1 text-[11px] font-medium text-muted-foreground sm:text-[12px]">
                  {fmtMds(data.volumeEngageM)} M FCFA engagés
                </span>
              </div>
              <div className="flex flex-col justify-between rounded-[0.875rem] border border-white/5 bg-secondary/40 p-2.5 sm:p-4">
                <span className="text-[11px] font-semibold uppercase text-emerald-400 sm:text-[12px]">Réussis</span>
                <span className="mt-2 text-lg font-semibold text-white tabular-nums sm:text-2xl">{fmtNum(data.succes)}</span>
                <span className="mt-1 text-[11px] font-medium text-emerald-400 sm:text-[12px]">
                  {fmtPct(data.successRate)} ({fmtMds(data.volumeSuccesM)} M FCFA)
                </span>
              </div>
              <div className="flex flex-col justify-between rounded-[0.875rem] border border-white/5 bg-secondary/40 p-2.5 sm:p-4">
                <span className="text-[11px] font-semibold uppercase text-rose-400 sm:text-[12px]">Échoués</span>
                <span className="mt-2 text-lg font-semibold text-white tabular-nums sm:text-2xl">{fmtNum(data.echecs)}</span>
                <span className="mt-1 text-[11px] font-medium text-rose-400 sm:text-[12px]">
                  {fmtPct(data.failureRate)} ({fmtMds(data.volumeEchecM)} M FCFA)
                </span>
              </div>
            </div>

            <div className="space-y-5 pt-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Détail des Flux &amp; Taux d'Échec par Opérateur
              </span>

              <div className="space-y-3 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4">
                <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--bma-wave-money)" }}>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--bma-wave-money)", boxShadow: "0 0 6px var(--bma-wave-money)" }}
                    />
                    WAVE DIGITAL MONEY
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    Volume Total : <strong className="text-white">{fmtNum(data.wave.total)} tx</strong> ({fmtMds(data.wave.volumeSuccesM + data.wave.volumeEchecM)} M FCFA)
                  </span>
                </div>

                <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full" style={{ width: `${data.wave.successRate}%`, backgroundColor: "var(--bma-wave-money)" }} title={`Succès Wave: ${data.wave.succes} tx`} />
                  <div className="h-full bg-slate-600" style={{ width: `${data.wave.failureRate}%` }} title={`Échecs Wave: ${data.wave.echecs} tx`} />
                </div>

                <div className="flex flex-col gap-1 pt-1 text-xs font-medium sm:flex-row sm:justify-between">
                  <span className="whitespace-nowrap text-emerald-400">
                    ✓ {fmtNum(data.wave.succes)} succès ({fmtPct(data.wave.successRate)} de conversion) — {fmtMds(data.wave.volumeSuccesM)} M FCFA
                  </span>
                  <span className="whitespace-nowrap font-semibold text-rose-400">
                    ✗ {fmtNum(data.wave.echecs)} échecs ({fmtPct(data.wave.failureRate)} de rejets) — {fmtMds(data.wave.volumeEchecM)} M FCFA
                  </span>
                </div>

                <div className="border-t border-white/5 pt-2 text-[12px] text-muted-foreground">
                  <span>
                    Causes échecs Wave : <strong className="text-slate-300">{data.wave.causeSoldeInsuffisant} solde insuffisant</strong> |{" "}
                    <strong className="text-slate-300">{data.wave.causeTimeout} time-out API</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-3 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4">
                <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--bma-orange-money)" }}>
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--bma-orange-money)", boxShadow: "0 0 6px var(--bma-orange-money)" }}
                    />
                    ORANGE MONEY
                  </span>
                  <span className="tabular-nums text-muted-foreground">
                    Volume Total : <strong className="text-white">{fmtNum(data.orange.total)} tx</strong> ({fmtMds(data.orange.volumeSuccesM + data.orange.volumeEchecM)} M FCFA)
                  </span>
                </div>

                <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full" style={{ width: `${data.orange.successRate}%`, backgroundColor: "var(--bma-orange-money)" }} title={`Succès Orange: ${data.orange.succes} tx`} />
                  <div className="h-full bg-slate-600" style={{ width: `${data.orange.failureRate}%` }} title={`Échecs Orange: ${data.orange.echecs} tx`} />
                </div>

                <div className="flex flex-col gap-1 pt-1 text-xs font-medium sm:flex-row sm:justify-between">
                  <span className="whitespace-nowrap text-emerald-400">
                    ✓ {fmtNum(data.orange.succes)} succès ({fmtPct(data.orange.successRate)} de conversion) — {fmtMds(data.orange.volumeSuccesM)} M FCFA
                  </span>
                  <span className="whitespace-nowrap font-semibold text-rose-400">
                    ✗ {fmtNum(data.orange.echecs)} échecs ({fmtPct(data.orange.failureRate)} de rejets) — {fmtMds(data.orange.volumeEchecM)} M FCFA
                  </span>
                </div>

                <div className="border-t border-white/5 pt-2 text-[12px] text-muted-foreground">
                  <span>
                    Causes échecs Orange : <strong className="text-slate-300">{data.orange.causeSoldeInsuffisant} solde insuffisant</strong> |{" "}
                    <strong className="text-slate-300">{data.orange.causeTimeout} time-out API</strong>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Causes d'Échec — Comparatif par Opérateur
                </span>
                <FailureCausesChart data={failureCauses} />
              </div>
            </div>
          </Card>

          <Card className="flex flex-col justify-between space-y-6 rounded-[1.25rem] border-border bg-card p-4 sm:p-6 lg:col-span-5">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                <div>
                  <h3 className="text-base font-semibold text-slate-300">Cartes &amp; Réseau Monétique</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">GAB, TPE et interbancarité GIM-UEMOA</p>
                </div>
                <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-300">
                  <span className="text-emerald-400">●</span> {fmtPct(monetique.failureRate)} échec
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                Cartes émises, transactions GAB/TPE et taux d'échec monétique sont désormais suivis en détail sur la
                page dédiée Monétique — voir le tableau de bord complet pour la répartition par produit et par type
                d'opération.
              </p>
            </div>

            <a
              href="/monetique-cartes"
              className="group flex items-center justify-between gap-2 rounded-[0.875rem] border border-white/5 bg-secondary/40 p-4 transition-colors hover:border-white/20"
            >
              <span className="text-xs font-semibold text-white">Voir le détail complet — Cartes &amp; Transactions</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-white" />
            </a>
          </Card>
        </div>
      </main>
    </>
  );
}
