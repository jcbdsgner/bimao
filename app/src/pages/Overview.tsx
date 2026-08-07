import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { AlertBanner } from "@/components/dashboard/AlertBanner";
import { TrendChartsRow } from "@/components/dashboard/TrendChartsRow";
import { CreditRiskOverview } from "@/components/dashboard/CreditRiskOverview";
import { BankToWalletSummary } from "@/components/dashboard/BankToWalletSummary";
import { DailyCashOps } from "@/components/dashboard/DailyCashOps";
import { CarthagoCoverage } from "@/components/dashboard/CarthagoCoverage";
import {
  type Period,
  PERIOD_COMPARISON_LABEL,
  clientBaseByPeriod,
  creditRisqueByPeriod,
  positionNetteByPeriod,
  bankToWalletByPeriod,
  fmtNum,
  fmtMds,
  fmtPct,
  fmtSigned,
} from "@/lib/period-data";

export function Overview() {
  const [period, setPeriod] = useState<Period>("mois");

  const clientBase = clientBaseByPeriod[period];
  const creditRisque = creditRisqueByPeriod[period];
  const positionNette = positionNetteByPeriod[period];
  const bankToWallet = bankToWalletByPeriod[period];
  const comparisonLabel = PERIOD_COMPARISON_LABEL[period];

  return (
    <>
      <Header
        title="Tableau de Pilotage Exécutif"
        subtitle="Données arrêtées au 31 Janvier 2026"
        period={period}
        onPeriodChange={(value) => setPeriod(value as Period)}
      />
      <main className="max-w-[1400px] space-y-6 p-4 sm:space-y-8 sm:p-8">
      <AlertBanner period={period} />

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <KpiCard
          className="shadow-[0_0_24px_4px_rgba(56,132,255,0.35)]"
          label="Position Nette"
          pill={
            <>
              <span className="text-rose-400">↓</span> Débitrice
            </>
          }
          value={fmtMds(positionNette.solde)}
          unit="Mds FCFA"
          footLeft={
            <>
              Entrants: <strong className="font-semibold text-slate-300">{fmtMds(positionNette.entrants)} Mds</strong>
            </>
          }
          footRight={
            <>
              Sortants: <strong className="font-semibold text-slate-300">{fmtMds(positionNette.sortants)} Mds</strong>
            </>
          }
        />

        <a href="/clients" className="block rounded-[1.25rem] transition-opacity hover:opacity-90">
          <KpiCard
            label="Base Clientèle"
            pill={
              <>
                <span className="text-emerald-400">↑</span> {fmtSigned(clientBase.growthPct)} vs {comparisonLabel}
              </>
            }
            value={fmtNum(clientBase.total)}
            footLeft={
              <>
                Particuliers: <strong className="font-semibold text-slate-300">{fmtPct(clientBase.particuliersPct)}</strong>
              </>
            }
            footRight={
              <>
                Entreprises: <strong className="font-semibold text-slate-300">{fmtPct(clientBase.entreprisesPct)}</strong>
              </>
            }
          />
        </a>

        <KpiCard
          label="Encours Actif"
          pill={
            <>
              <span className="text-rose-400">●</span> {fmtPct(creditRisque.nplPct)} NPL
            </>
          }
          value={fmtMds(creditRisque.encoursActifMds)}
          unit="Mds FCFA"
          footLeft={
            <>
              Sains: <strong className="font-semibold text-slate-300">{fmtMds(creditRisque.sainsMds)} Mds</strong>
            </>
          }
          footRight={
            <>
              Douteux: <strong className="font-semibold text-slate-300">{fmtMds(creditRisque.douteuxMds)} Mds</strong>
            </>
          }
        />

        <KpiCard
          label="Bank-To-Wallet"
          pill={
            <>
              <span className="text-rose-400">●</span> {fmtPct(bankToWallet.failureRate)} Rejet
            </>
          }
          value={fmtNum(bankToWallet.total)}
          unit="demandes"
          footLeft={
            <>
              Succès: <strong className="font-semibold text-slate-300">{fmtPct(bankToWallet.successRate)}</strong>
            </>
          }
          footRight={
            <>
              Cartes: <strong className="font-semibold text-slate-300">0,53% échec</strong>
            </>
          }
        />
      </div>

      <TrendChartsRow period={period} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <CreditRiskOverview period={period} />

        <div className="space-y-6 lg:col-span-5">
          <DailyCashOps />
          <BankToWalletSummary period={period} />
          <CarthagoCoverage />
        </div>
      </div>
      </main>
    </>
  );
}
