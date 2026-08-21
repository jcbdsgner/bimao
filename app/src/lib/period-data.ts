// Variation des chiffres et statistiques du dashboard selon la période sélectionnée
// dans le header (Semaine / Mois / Trimestre) et selon l'agence sélectionnée
// (Toutes / Dakar / Kaolack / Ziguinchor / Touba). "mois" + "all" reste la valeur de
// référence (identique aux chiffres d'origine, agences consolidées) ; les autres
// combinaisons sont dérivées par des facteurs d'échelle réalistes.

export type Period = "semaine" | "mois" | "trimestre" | "custom";
export type Agency = "all" | "dakar" | "kaolack" | "ziguinchor" | "touba";

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

export const AGENCY_LABELS: Record<Agency, string> = {
  all: "Toutes les agences",
  dakar: "Dakar",
  kaolack: "Kaolack",
  ziguinchor: "Ziguinchor",
  touba: "Touba",
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

// Part de chaque agence dans le total consolidé (Dakar = siège, donc largement
// majoritaire). "all" correspond au 100% consolidé.
const AGENCY_FACTOR: Record<Agency, number> = {
  all: 1,
  dakar: 0.47,
  kaolack: 0.23,
  ziguinchor: 0.17,
  touba: 0.13,
};

// Petit écart déterministe (en points) appliqué aux taux/pourcentages pour que
// chaque agence ait un profil de risque/performance légèrement différent, plutôt
// qu'un simple pourcentage identique à la consolidation.
const AGENCY_PCT_DELTA: Record<Agency, number> = {
  all: 0,
  dakar: 0.6,
  kaolack: -2.4,
  ziguinchor: 3.1,
  touba: -4.2,
};

const PERIODS: Period[] = ["semaine", "mois", "trimestre", "custom"];
const AGENCIES: Agency[] = ["all", "dakar", "kaolack", "ziguinchor", "touba"];

function round(value: number, decimals = 0) {
  const p = 10 ** decimals;
  return Math.round(value * p) / p;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function stock(value: number, period: Period, agency: Agency, decimals = 0) {
  return round(value * STOCK_FACTOR[period] * AGENCY_FACTOR[agency], decimals);
}

function flow(value: number, period: Period, agency: Agency, decimals = 0) {
  return round(value * FLOW_FACTOR[period] * AGENCY_FACTOR[agency], decimals);
}

// Applique un léger écart par agence à une valeur en pourcentage (0-100), avec un
// facteur d'amplitude optionnel pour les métriques plus/moins sensibles.
function pct(value: number, agency: Agency, spread = 1, decimals = 1) {
  return round(clamp(value + AGENCY_PCT_DELTA[agency] * spread, 0, 100), decimals);
}

function byPeriodAndAgency<T>(build: (period: Period, agency: Agency) => T): Record<Period, Record<Agency, T>> {
  return PERIODS.reduce((acc, period) => {
    acc[period] = AGENCIES.reduce((inner, agency) => {
      inner[agency] = build(period, agency);
      return inner;
    }, {} as Record<Agency, T>);
    return acc;
  }, {} as Record<Period, Record<Agency, T>>);
}

function byAgency<T>(build: (agency: Agency) => T): Record<Agency, T> {
  return AGENCIES.reduce((acc, agency) => {
    acc[agency] = build(agency);
    return acc;
  }, {} as Record<Agency, T>);
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
export const clientBaseByPeriod = byPeriodAndAgency((period, agency) => ({
  total: stock(8434, period, agency),
  growthPct: pct({ semaine: 0.9, mois: 4.2, trimestre: 11.8, custom: 4.2 }[period], agency, 0.5),
  particuliersPct: pct({ semaine: 64.1, mois: 63.8, trimestre: 63.2, custom: 63.8 }[period], agency, 0.4),
  entreprisesPct: pct({ semaine: 31.0, mois: 31.3, trimestre: 31.7, custom: 31.3 }[period], agency, 0.3),
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

export const portfolioMixByPeriod = byPeriodAndAgency((period, agency) => {
  const rows = portfolioMixBase.map((row) => ({ ...row, count: stock(row.count, period, agency) }));
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return rows.map((row) => ({ ...row, value: total > 0 ? round((row.count / total) * 100, 1) : 0 }));
});

// Segmentation clientèle "métier" (page Clients) — regroupement de portfolioMixByPeriod
// en 3 grands segments d'activité (Retail / SFD & Institutionnels / Corporate & Pro),
// pour rester cohérent avec la taxonomie déjà utilisée côté risque (encoursBySegment).
const clientSegmentGroups: [string, string[]][] = [
  ["Retail", ["Particuliers", "Cotitulaires"]],
  ["SFD & Institutionnels", ["Banques", "Associations"]],
  ["Corporate & Pro", ["Entreprises", "Autres"]],
];

export const clientSegmentByPeriod = byPeriodAndAgency((period, agency) => {
  const mix = portfolioMixByPeriod[period][agency];
  const rows = clientSegmentGroups.map(([segment, members]) => ({
    segment,
    count: mix.filter((row) => members.includes(row.segment)).reduce((sum, row) => sum + row.count, 0),
  }));
  const total = rows.reduce((sum, row) => sum + row.count, 0);
  return rows.map((row) => ({ ...row, value: total > 0 ? round((row.count / total) * 100, 1) : 0 }));
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

export const comptesByPeriod = byPeriodAndAgency((period, agency) => {
  const parType: CompteTypeRow[] = comptesParTypeBase.map((row) => ({
    ...row,
    total: stock(row.total, period, agency),
    actifs: stock(row.actifs, period, agency),
    clotures: stock(row.clotures, period, agency),
    solde: stock(row.solde, period, agency),
  }));
  const ouverts = parType.reduce((sum, row) => sum + row.total, 0) + stock(6522 - 6260, period, agency); // reste du portefeuille hors Top 10
  const actifs = stock(5899, period, agency);
  const clotures = stock(608, period, agency);
  const enCloture = stock(15, period, agency);
  return {
    ouverts,
    actifs,
    clotures,
    enCloture,
    typesDistincts: 36,
    parType,
    actifsPct: ouverts > 0 ? (actifs / ouverts) * 100 : 0,
    cloturesPct: ouverts > 0 ? (clotures / ouverts) * 100 : 0,
    enCloturePct: ouverts > 0 ? (enCloture / ouverts) * 100 : 0,
  };
});

// Donut "Répartition par Type de Compte" (page Clients) — Top 5 types + Autres,
// dérivé de comptesByPeriod pour rester cohérent avec la page Comptes Bancaires.
export const accountTypeDonutByPeriod = byPeriodAndAgency((period, agency) => {
  const { parType, ouverts } = comptesByPeriod[period][agency];
  const top5 = parType.slice(0, 5);
  const top5Total = top5.reduce((sum, row) => sum + row.total, 0);
  const autres = ouverts - top5Total;
  return [
    ...top5.map((row) => ({ type: row.type, total: row.total, value: ouverts > 0 ? (row.total / ouverts) * 100 : 0 })),
    { type: "Autres", total: autres, value: ouverts > 0 ? (autres / ouverts) * 100 : 0 },
  ];
});

// ---------------------------------------------------------------------------
// Crédit & Risque (Overview KPI "Encours Actif" + widget CreditRiskOverview + page CreditRisque)
// ---------------------------------------------------------------------------
export const creditRisqueByPeriod = byPeriodAndAgency((period, agency) => {
  const sainsMds = stock(76.3, period, agency, 1);
  const douteuxMds = stock(23.6, period, agency, 1);
  const nplPct = pct({ semaine: 36.4, mois: 38.1, trimestre: 40.2, custom: 38.1 }[period], agency, 0.6);
  const impayesDouteux = { count: stock(129, period, agency), montant: stock(9.5, period, agency, 1) };
  const impayesSains = { count: stock(90, period, agency), montant: stock(0.9, period, agency, 1) };
  const impayesRestructures = { count: stock(7, period, agency), montant: stock(0.1, period, agency, 1) };
  return {
    encoursActifMds: round(sainsMds + douteuxMds + stock(5.9, period, agency, 1), 1),
    creditsAccordesMds: stock(200.3, period, agency, 1),
    sainsMds,
    douteuxMds,
    sainsPct: pct({ semaine: 60.5, mois: 59.3, trimestre: 57.6, custom: 59.3 }[period], agency, -0.5),
    provisionsMds: stock(18.2, period, agency, 1),
    couverturePct: pct({ semaine: 78.4, mois: 77.1, trimestre: 75.8, custom: 77.1 }[period], agency, 0.4),
    nplPct,
    depassementPts: round(nplPct - 15, 1),
    impayesDouteux,
    impayesSains,
    impayesRestructures,
    impayesTotalCount: impayesDouteux.count + impayesSains.count + impayesRestructures.count,
    impayesTotalMontant: round(impayesDouteux.montant + impayesSains.montant + impayesRestructures.montant, 1),
    nplBySegment: [
      { segment: "Particuliers", montant: stock(14.8, period, agency, 1) },
      { segment: "Entreprises/SME", montant: stock(8.8, period, agency, 1) },
    ],
    nplByCoverage: [
      { type: "Garanti (Hypothèques)", montant: stock(15.4, period, agency, 1) },
      { type: "Non garanti / Cautions", montant: stock(8.2, period, agency, 1) },
    ],
    // Comptes porteurs de crédit, ventilés par segment client (Particulier / Corporate / SFD).
    encoursBySegment: [
      { segment: "Particulier", montant: stock(57.7, period, agency, 1) },
      { segment: "Corporate", montant: stock(41.7, period, agency, 1) },
      { segment: "SFD", montant: stock(6.4, period, agency, 1) },
    ],
  };
});

// Portefeuille de crédit par type/durée (page CreditRisque) — Court / Moyen / Long
// terme, avec taux de créances douteuses par tranche pour croiser le risque avec
// la maturité du crédit (montants de base cohérents avec creditsAccordesMds).
const creditsByTermBase = [
  { terme: "Court terme (< 1 an)", montant: 52.8, nplPct: 41.6 },
  { terme: "Moyen terme (1 à 5 ans)", montant: 98.6, nplPct: 37.4 },
  { terme: "Long terme (> 5 ans)", montant: 48.9, nplPct: 34.8 },
];

export const creditsByTermByPeriod = byPeriodAndAgency((period, agency) => {
  const rows = creditsByTermBase.map((row) => ({
    terme: row.terme,
    montant: stock(row.montant, period, agency, 1),
    nplPct: pct(row.nplPct, agency, 0.5),
  }));
  const total = rows.reduce((sum, row) => sum + row.montant, 0);
  return rows.map((row) => ({ ...row, part: total > 0 ? round((row.montant / total) * 100, 1) : 0 }));
});

// ---------------------------------------------------------------------------
// Position Nette — flux entrants/sortants (Overview KPI + TrendChartsRow)
// ---------------------------------------------------------------------------
export const positionNetteByPeriod = byPeriodAndAgency((period, agency) => {
  const entrants = flow(90.8, period, agency, 1);
  const sortants = flow(95.0, period, agency, 1);
  return {
    entrants,
    sortants,
    solde: round(entrants - sortants, 1),
    volumeTotal: round(entrants + sortants, 1),
    virementsRtgs: flow(16.2, period, agency, 1),
  };
});

// ---------------------------------------------------------------------------
// Opérations Bancaires — Virements, Chèques, Prélèvements & Effets de Commerce
// (page OperationsBancaires)
// ---------------------------------------------------------------------------
const chequesRejetCausesBase = [
  { cause: "Provision insuffisante", count: 13 },
  { cause: "Signature non conforme", count: 5 },
  { cause: "Compte clôturé", count: 2 },
  { cause: "Opposition", count: 2 },
];

const prelevementsRejetCausesBase = [
  { cause: "Provision insuffisante", count: 9 },
  { cause: "Mandat révoqué", count: 3 },
  { cause: "Compte clôturé", count: 1 },
];

export const operationsBancairesByPeriod = byPeriodAndAgency((period, agency) => {
  const virementsEmis = { count: flow(1240, period, agency), montantMds: flow(38.6, period, agency, 1) };
  const virementsRecus = { count: flow(1085, period, agency), montantMds: flow(34.2, period, agency, 1) };
  const virementsRtgs = { count: flow(96, period, agency), montantMds: flow(16.2, period, agency, 1) };
  const virementsRejetes = { count: flow(18, period, agency), montantMds: flow(0.4, period, agency, 1) };

  const chequesEmis = { count: flow(340, period, agency), montantMds: flow(9.8, period, agency, 1) };
  const chequesEncaisses = { count: flow(298, period, agency), montantMds: flow(8.1, period, agency, 1) };
  const chequesRejetes = { count: flow(22, period, agency), montantMds: flow(0.6, period, agency, 1) };

  const prelevementsEmis = { count: flow(410, period, agency), montantMds: flow(6.4, period, agency, 1) };
  const prelevementsRejetes = { count: flow(13, period, agency), montantMds: flow(0.2, period, agency, 1) };

  const effetsDomicilies = { count: flow(58, period, agency), montantMds: flow(3.1, period, agency, 1) };
  const effetsEncaisses = { count: flow(49, period, agency), montantMds: flow(2.6, period, agency, 1) };
  const effetsImpayes = { count: flow(6, period, agency), montantMds: flow(0.3, period, agency, 1) };

  const tauxRejetVirements =
    virementsEmis.count > 0 ? round((virementsRejetes.count / virementsEmis.count) * 100, 2) : 0;
  const tauxRejetCheques = chequesEmis.count > 0 ? round((chequesRejetes.count / chequesEmis.count) * 100, 2) : 0;
  const tauxRejetPrelevements =
    prelevementsEmis.count > 0 ? round((prelevementsRejetes.count / prelevementsEmis.count) * 100, 2) : 0;
  const tauxImpayesEffets =
    effetsDomicilies.count > 0 ? round((effetsImpayes.count / effetsDomicilies.count) * 100, 2) : 0;

  const causesRejetCheques = chequesRejetCausesBase.map((row) => ({
    ...row,
    count: Math.max(flow(row.count, period, agency), row.count > 0 ? 1 : 0),
  }));
  const causesRejetPrelevements = prelevementsRejetCausesBase.map((row) => ({
    ...row,
    count: Math.max(flow(row.count, period, agency), row.count > 0 ? 1 : 0),
  }));

  const volumeByType = [
    { type: "Virements", montant: round(virementsEmis.montantMds + virementsRecus.montantMds, 1) },
    { type: "Chèques", montant: round(chequesEmis.montantMds + chequesEncaisses.montantMds, 1) },
    { type: "Prélèvements", montant: prelevementsEmis.montantMds },
    { type: "Effets de Commerce", montant: effetsDomicilies.montantMds },
  ];
  const volumeTotalMds = round(volumeByType.reduce((sum, row) => sum + row.montant, 0), 1);

  return {
    virementsEmis,
    virementsRecus,
    virementsRtgs,
    virementsRejetes,
    tauxRejetVirements,
    chequesEmis,
    chequesEncaisses,
    chequesRejetes,
    tauxRejetCheques,
    causesRejetCheques,
    prelevementsEmis,
    prelevementsRejetes,
    tauxRejetPrelevements,
    causesRejetPrelevements,
    effetsDomicilies,
    effetsEncaisses,
    effetsImpayes,
    tauxImpayesEffets,
    volumeByType,
    volumeTotalMds,
    operationsTotalCount:
      virementsEmis.count + virementsRecus.count + chequesEmis.count + prelevementsEmis.count + effetsDomicilies.count,
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
  agency: Agency,
) {
  const totalScaled = flow(total, period, agency);
  const succes = round(totalScaled * (successRate / 100));
  const echecs = totalScaled - succes;
  return {
    total: totalScaled,
    succes,
    echecs,
    successRate: totalScaled > 0 ? round((succes / totalScaled) * 100, 1) : 0,
    failureRate: totalScaled > 0 ? round((echecs / totalScaled) * 100, 1) : 0,
    volumeSuccesM: flow(volumeSuccesM, period, agency, 1),
    volumeEchecM: flow(volumeEchecM, period, agency, 1),
    causeSoldeInsuffisant: flow(causeA, period, agency),
    causeTimeout: flow(causeB, period, agency),
  };
}

export const bankToWalletByPeriod = byPeriodAndAgency((period, agency) => {
  const wave = scaleOperator(859, 81.4, 31.2, 7.2, 152, 8, period, agency);
  const orange = scaleOperator(141, 66.7, 4.3, 2.0, 44, 3, period, agency);
  const total = wave.total + orange.total;
  const succes = wave.succes + orange.succes;
  const echecs = wave.echecs + orange.echecs;
  return {
    total,
    succes,
    echecs,
    successRate: total > 0 ? round((succes / total) * 100, 1) : 0,
    failureRate: total > 0 ? round((echecs / total) * 100, 1) : 0,
    volumeEngageM: round(flow(44.7, period, agency, 1), 1),
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

export const itSupportByPeriod = byPeriodAndAgency((period, agency) => {
  const ticketsByPriorityRows = ticketsByPriorityBase.map((row) => ({
    ...row,
    count: Math.max(flow(row.count, period, agency), row.count > 0 ? 1 : 0),
  }));
  const totalTickets = ticketsByPriorityRows.reduce((sum, row) => sum + row.count, 0);
  const openInProgress = agency === "all" ? 4 : Math.max(round(4 * AGENCY_FACTOR[agency]), totalTickets > 0 ? 1 : 0); // file active actuelle
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

export const monetiqueByPeriod = byPeriodAndAgency((period, agency) => {
  const transactionTypes = monetiqueTransactionTypesBase.map((row) => ({
    ...row,
    count: flow(row.count, period, agency),
    volume: flow(row.volume, period, agency),
  }));
  const transactionTotal = {
    count: transactionTypes.reduce((sum, row) => sum + row.count, 0),
    volume: transactionTypes.reduce((sum, row) => sum + row.volume, 0),
  };
  const cardsEmitted = stock(5340, period, agency);
  const cardsByProduct = cardsByProductBase.map((row) => ({
    ...row,
    count: stock(row.count, period, agency),
    part: round((row.count / 4820) * 100, 1),
  }));
  const cardsActive = cardsByProduct.reduce((sum, row) => sum + row.count, 0);
  return {
    transactions: transactionTotal.count,
    volumeM: round(transactionTotal.volume / 1_000_000, 1),
    failureRate: pct({ semaine: 0.61, mois: 0.53, trimestre: 0.47, custom: 0.53 }[period], agency, 0.05, 2),
    txAuthorization: transactionTotal.count,
    transactionTypes,
    transactionTotal,
    cardsEmitted,
    cardsActive,
    cardsActivationRate: cardsEmitted > 0 ? (cardsActive / cardsEmitted) * 100 : 0,
    cardsByProduct,
  };
});

// ---------------------------------------------------------------------------
// Dépôts & Retraits — Guichet (Overview) : opérations espèces de la journée
// arrêtée (31 Janvier 2026). Volontairement indépendant du toggle de période
// puisqu'il s'agit d'un instantané "du jour", pas d'un cumul sur une fenêtre —
// mais il varie bien selon l'agence sélectionnée.
// ---------------------------------------------------------------------------
export const dailyCashOpsByAgency = byAgency((agency) => {
  const depots = { count: stock(186, "mois", agency), montantM: stock(42.3, "mois", agency, 1) };
  const retraits = { count: stock(154, "mois", agency), montantM: stock(38.7, "mois", agency, 1) };
  const totalOps = depots.count + retraits.count;
  return {
    date: "31 Janvier 2026",
    depots: { ...depots, sharePct: totalOps > 0 ? round((depots.count / totalOps) * 100, 1) : 0 },
    retraits: { ...retraits, sharePct: totalOps > 0 ? round((retraits.count / totalOps) * 100, 1) : 0 },
    soldeNetM: round(depots.montantM - retraits.montantM, 1),
    totalOps,
  };
});
