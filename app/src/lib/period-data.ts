// Variation des chiffres et statistiques du dashboard selon la période sélectionnée
// dans le header (Semaine / Mois / Trimestre). "mois" reste la valeur de référence
// (identique aux chiffres d'origine) ; "semaine" et "trimestre" sont dérivés par des
// facteurs d'échelle réalistes pour donner une vue plus courte / plus longue.

export type Period = "semaine" | "mois" | "trimestre" | "custom";

export const PERIOD_COMPARISON_LABEL: Record<Period, string> = {
  semaine: "S-1",
  mois: "M-1",
  trimestre: "T-1",
  custom: "période préc.",
};

export const PERIOD_TITLE: Record<Period, string> = {
  semaine: "Semaine en cours",
  mois: "Mois en cours",
  trimestre: "Trimestre en cours",
  custom: "Période personnalisée",
};

// Grandeurs de "stock" (soldes, portefeuilles, bases installées) : elles ne bougent
// que légèrement d'une période à l'autre.
const STOCK_FACTOR: Record<Period, number> = {
  semaine: 0.965,
  mois: 1,
  trimestre: 1.055,
  custom: 1,
};

// Grandeurs de "flux" (transactions, tickets, demandes réalisées pendant la période) :
// une semaine capture ~1/4 d'un mois, un trimestre ~3 mois.
const FLOW_FACTOR: Record<Period, number> = {
  semaine: 0.24,
  mois: 1,
  trimestre: 2.95,
  custom: 1,
};

const PERIODS: Period[] = ["semaine", "mois", "trimestre", "custom"];

function round(value: number, decimals = 0) {
  const p = 10 ** decimals;
  return Math.round(value * p) / p;
}

function stock(value: number, period: Period, decimals = 0) {
  return round(value * STOCK_FACTOR[period], decimals);
}

function flow(value: number, period: Period, decimals = 0) {
  return round(value * FLOW_FACTOR[period], decimals);
}

function byPeriod<T>(build: (period: Period) => T): Record<Period, T> {
  return PERIODS.reduce((acc, period) => {
    acc[period] = build(period);
    return acc;
  }, {} as Record<Period, T>);
}

export const fmtNum = (value: number) => value.toLocaleString("fr-FR");
export const fmtMds = (value: number, maximumFractionDigits = 1) =>
  value.toLocaleString("fr-FR", { minimumFractionDigits: maximumFractionDigits, maximumFractionDigits });
export const fmtPct = (value: number, maximumFractionDigits = 1) =>
  `${value.toLocaleString("fr-FR", { maximumFractionDigits })}%`;
export const fmtSigned = (value: number, maximumFractionDigits = 1) =>
  `${value > 0 ? "+" : ""}${value.toLocaleString("fr-FR", { maximumFractionDigits })}%`;

// ---------------------------------------------------------------------------
// Base Clientèle (Overview KPI + page Clients)
// ---------------------------------------------------------------------------
export const clientBaseByPeriod = byPeriod((period) => ({
  total: stock(8434, period),
  growthPct: { semaine: 0.9, mois: 4.2, trimestre: 11.8, custom: 4.2 }[period],
  particuliersPct: { semaine: 64.1, mois: 63.8, trimestre: 63.2, custom: 63.8 }[period],
  entreprisesPct: { semaine: 31.0, mois: 31.3, trimestre: 31.7, custom: 31.3 }[period],
}));

// Segmentation clientèle (page Clients) — dérivée du même facteur "stock" que la
// base clientèle, pour rester cohérente avec le total affiché sur Overview/Clients.
const portfolioMixBase = [
  { segment: "Particuliers", count: 5383, fill: "var(--color-particuliers)" },
  { segment: "Entreprises", count: 2642, fill: "var(--color-entreprises)" },
  { segment: "Banques", count: 324, fill: "var(--color-banques)" },
  { segment: "Associations", count: 58, fill: "var(--color-associations)" },
  { segment: "Autres", count: 21, fill: "var(--color-autres)" },
  { segment: "Cotitulaires", count: 6, fill: "var(--color-cotitulaires)" },
];

export const portfolioMixByPeriod = byPeriod((period) => {
  const rows = portfolioMixBase.map((row) => ({ ...row, count: stock(row.count, period) }));
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return rows.map((row) => ({ ...row, value: round((row.count / total) * 100, 1) }));
});

// ---------------------------------------------------------------------------
// Comptes Bancaires (page Comptes Bancaires + carte liée sur Clients + AccountTypeDonut)
// ---------------------------------------------------------------------------
type CompteTypeRow = {
  type: string;
  total: number;
  actifs: number;
  clotures: number;
  solde: number;
  statut: "Sain" | "Déficit";
};

const comptesParTypeBase: CompteTypeRow[] = [
  { type: "CAVPAR", total: 2557, actifs: 2493, clotures: 60, solde: 616613271, statut: "Sain" },
  { type: "CAVSOC", total: 1158, actifs: 877, clotures: 280, solde: -5087451112, statut: "Déficit" },
  { type: "CAVIND", total: 1020, actifs: 853, clotures: 166, solde: 8274576, statut: "Sain" },
  { type: "CEPLIV", total: 412, actifs: 407, clotures: 0, solde: 148280158, statut: "Sain" },
  { type: "DPG612", total: 279, actifs: 262, clotures: 17, solde: 2107319230, statut: "Sain" },
  { type: "CFRECORD", total: 237, actifs: 225, clotures: 10, solde: -440423463, statut: "Déficit" },
  { type: "CCONTX", total: 211, actifs: 209, clotures: 2, solde: 81178462, statut: "Sain" },
  { type: "PCI", total: 199, actifs: 199, clotures: 0, solde: -1189389755, statut: "Déficit" },
  { type: "CAVPER", total: 101, actifs: 94, clotures: 7, solde: -16898733, statut: "Déficit" },
  { type: "CAVONG", total: 86, actifs: 75, clotures: 10, solde: 173274725, statut: "Sain" },
];

export const comptesByPeriod = byPeriod((period) => {
  const parType: CompteTypeRow[] = comptesParTypeBase.map((row) => ({
    ...row,
    total: stock(row.total, period),
    actifs: stock(row.actifs, period),
    clotures: stock(row.clotures, period),
    solde: stock(row.solde, period),
  }));
  const ouverts = parType.reduce((sum, row) => sum + row.total, 0) + stock(6522 - 6260, period); // reste du portefeuille hors Top 10
  const actifs = stock(5899, period);
  const clotures = stock(608, period);
  const enCloture = stock(15, period);
  return {
    ouverts,
    actifs,
    clotures,
    enCloture,
    typesDistincts: 36,
    parType,
    actifsPct: (actifs / ouverts) * 100,
    cloturesPct: (clotures / ouverts) * 100,
    enCloturePct: (enCloture / ouverts) * 100,
  };
});

// Donut "Répartition par Type de Compte" (page Clients) — Top 5 types + Autres,
// dérivé de comptesByPeriod pour rester cohérent avec la page Comptes Bancaires.
export const accountTypeDonutByPeriod = byPeriod((period) => {
  const { parType, ouverts } = comptesByPeriod[period];
  const top5 = parType.slice(0, 5);
  const top5Total = top5.reduce((sum, row) => sum + row.total, 0);
  const autres = ouverts - top5Total;
  return [
    ...top5.map((row) => ({ type: row.type, total: row.total, value: (row.total / ouverts) * 100 })),
    { type: "Autres", total: autres, value: (autres / ouverts) * 100 },
  ];
});

// ---------------------------------------------------------------------------
// Crédit & Risque (Overview KPI "Encours Actif" + widget CreditRiskOverview + page CreditRisque)
// ---------------------------------------------------------------------------
export const creditRisqueByPeriod = byPeriod((period) => {
  const sainsMds = stock(76.3, period, 1);
  const douteuxMds = stock(23.6, period, 1);
  const nplPct = { semaine: 36.4, mois: 38.1, trimestre: 40.2, custom: 38.1 }[period];
  const impayesDouteux = { count: stock(129, period), montant: stock(9.5, period, 1) };
  const impayesSains = { count: stock(90, period), montant: stock(0.9, period, 1) };
  const impayesRestructures = { count: stock(7, period), montant: stock(0.1, period, 1) };
  return {
    encoursActifMds: round(sainsMds + douteuxMds + stock(5.9, period, 1), 1),
    creditsAccordesMds: stock(200.3, period, 1),
    sainsMds,
    douteuxMds,
    sainsPct: { semaine: 60.5, mois: 59.3, trimestre: 57.6, custom: 59.3 }[period],
    provisionsMds: stock(18.2, period, 1),
    couverturePct: { semaine: 78.4, mois: 77.1, trimestre: 75.8, custom: 77.1 }[period],
    nplPct,
    depassementPts: round(nplPct - 15, 1),
    impayesDouteux,
    impayesSains,
    impayesRestructures,
    impayesTotalCount: impayesDouteux.count + impayesSains.count + impayesRestructures.count,
    impayesTotalMontant: round(impayesDouteux.montant + impayesSains.montant + impayesRestructures.montant, 1),
    nplBySegment: [
      { segment: "Particuliers", montant: stock(14.8, period, 1) },
      { segment: "Entreprises/SME", montant: stock(8.8, period, 1) },
    ],
    nplByCoverage: [
      { type: "Garanti (Hypothèques)", montant: stock(15.4, period, 1) },
      { type: "Non garanti / Cautions", montant: stock(8.2, period, 1) },
    ],
  };
});

// ---------------------------------------------------------------------------
// Position Nette — flux entrants/sortants (Overview KPI + TrendChartsRow)
// ---------------------------------------------------------------------------
export const positionNetteByPeriod = byPeriod((period) => {
  const entrants = flow(90.8, period, 1);
  const sortants = flow(95.0, period, 1);
  return {
    entrants,
    sortants,
    solde: round(entrants - sortants, 1),
    volumeTotal: round(entrants + sortants, 1),
    virementsRtgs: flow(16.2, period, 1),
  };
});

// ---------------------------------------------------------------------------
// Bank-to-Wallet (Overview KPI + widget BankToWalletSummary + page DigitalFlux)
// ---------------------------------------------------------------------------
function scaleOperator(
  total: number,
  successRate: number,
  volumeSuccesM: number,
  volumeEchecM: number,
  causeA: number,
  causeB: number,
  period: Period,
) {
  const totalScaled = flow(total, period);
  const succes = round(totalScaled * (successRate / 100));
  const echecs = totalScaled - succes;
  return {
    total: totalScaled,
    succes,
    echecs,
    successRate: totalScaled > 0 ? round((succes / totalScaled) * 100, 1) : 0,
    failureRate: totalScaled > 0 ? round((echecs / totalScaled) * 100, 1) : 0,
    volumeSuccesM: flow(volumeSuccesM, period, 1),
    volumeEchecM: flow(volumeEchecM, period, 1),
    causeSoldeInsuffisant: flow(causeA, period),
    causeTimeout: flow(causeB, period),
  };
}

export const bankToWalletByPeriod = byPeriod((period) => {
  const wave = scaleOperator(859, 81.4, 31.2, 7.2, 152, 8, period);
  const orange = scaleOperator(141, 66.7, 4.3, 2.0, 44, 3, period);
  const total = wave.total + orange.total;
  const succes = wave.succes + orange.succes;
  const echecs = wave.echecs + orange.echecs;
  return {
    total,
    succes,
    echecs,
    successRate: total > 0 ? round((succes / total) * 100, 1) : 0,
    failureRate: total > 0 ? round((echecs / total) * 100, 1) : 0,
    volumeEngageM: round(flow(44.7, period, 1), 1),
    volumeSuccesM: round(wave.volumeSuccesM + orange.volumeSuccesM, 1),
    volumeEchecM: round(wave.volumeEchecM + orange.volumeEchecM, 1),
    wave,
    orange,
  };
});

// ---------------------------------------------------------------------------
// IT Support (page ItSupport)
// ---------------------------------------------------------------------------
const ticketsByPriorityBase = [
  { priority: "Moyenne" as const, count: 85, fill: "var(--chart-3)" },
  { priority: "Haute" as const, count: 53, fill: "var(--chart-4)" },
  { priority: "Très haute" as const, count: 5, fill: "var(--chart-2)" },
  { priority: "Basse" as const, count: 1, fill: "var(--chart-5)" },
];

export const itSupportByPeriod = byPeriod((period) => {
  const ticketsByPriorityRows = ticketsByPriorityBase.map((row) => ({
    ...row,
    count: Math.max(flow(row.count, period), row.count > 0 ? 1 : 0),
  }));
  const totalTickets = ticketsByPriorityRows.reduce((sum, row) => sum + row.count, 0);
  const openInProgress = 4; // file active actuelle, indépendante de la période analysée
  const resolvedClosed = Math.max(totalTickets - openInProgress, 0);
  const resolutionRate = totalTickets > 0 ? round((resolvedClosed / totalTickets) * 100, 1) : 0;
  const criticalIncidents = ticketsByPriorityRows.find((r) => r.priority === "Très haute")?.count ?? 0;
  return {
    totalTickets,
    openInProgress,
    resolvedClosed,
    resolutionRate,
    criticalIncidents,
    ticketsByPriority: ticketsByPriorityRows,
  };
});

// ---------------------------------------------------------------------------
// Monétique — Cartes & Transactions (page MonetiqueCartes)
// ---------------------------------------------------------------------------
const monetiqueTransactionTypesBase = [
  { type: "Retrait GAB On-us", count: 134, volume: 11405000 },
  { type: "Retrait GAB Confrère (Off-us)", count: 23, volume: 3080000 },
  { type: "Abonnement / Frais", count: 15, volume: 332312 },
  { type: "Paiement TPE Confrère", count: 7, volume: 257177 },
  { type: "Demande de solde", count: 11, volume: 0, muted: true },
];

const cardsByProductBase = [
  { product: "Visa Classic", count: 2480, fill: "var(--chart-3)" },
  { product: "GIM Prépayée", count: 980, fill: "var(--chart-1)" },
  { product: "Visa Gold / Business", count: 860, fill: "var(--chart-6)" },
  { product: "Mastercard Standard", count: 500, fill: "var(--chart-4)" },
];

export const monetiqueByPeriod = byPeriod((period) => {
  const transactionTypes = monetiqueTransactionTypesBase.map((row) => ({
    ...row,
    count: flow(row.count, period),
    volume: flow(row.volume, period),
  }));
  const transactionTotal = {
    count: transactionTypes.reduce((sum, row) => sum + row.count, 0),
    volume: transactionTypes.reduce((sum, row) => sum + row.volume, 0),
  };
  const cardsEmitted = stock(5340, period);
  const cardsByProduct = cardsByProductBase.map((row) => ({
    ...row,
    count: stock(row.count, period),
    part: round((row.count / 4820) * 100, 1),
  }));
  const cardsActive = cardsByProduct.reduce((sum, row) => sum + row.count, 0);
  return {
    transactions: transactionTotal.count,
    volumeM: round(transactionTotal.volume / 1_000_000, 1),
    failureRate: { semaine: 0.61, mois: 0.53, trimestre: 0.47, custom: 0.53 }[period],
    txAuthorization: transactionTotal.count,
    transactionTypes,
    transactionTotal,
    cardsEmitted,
    cardsActive,
    cardsActivationRate: (cardsActive / cardsEmitted) * 100,
    cardsByProduct,
  };
});

// ---------------------------------------------------------------------------
// Dépôts & Retraits — Guichet (Overview) : opérations espèces de la journée
// arrêtée (31 Janvier 2026). Volontairement indépendant du toggle de période
// puisqu'il s'agit d'un instantané "du jour", pas d'un cumul sur une fenêtre.
// ---------------------------------------------------------------------------
export const dailyCashOps = (() => {
  const depots = { count: 186, montantM: 42.3 };
  const retraits = { count: 154, montantM: 38.7 };
  const totalOps = depots.count + retraits.count;
  return {
    date: "31 Janvier 2026",
    depots: { ...depots, sharePct: round((depots.count / totalOps) * 100, 1) },
    retraits: { ...retraits, sharePct: round((retraits.count / totalOps) * 100, 1) },
    soldeNetM: round(depots.montantM - retraits.montantM, 1),
    totalOps,
  };
})();
