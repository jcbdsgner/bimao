// Monétique — Cartes & Transactions GAB/TPE
// Source : capture "Monétique — Cartes & Transactions GAB/TPE" (dashboard BI branché Carthago)
// Couvre les KPIs du domaine "Monétique" dans Gap_analyse_KPI.xlsx : Nombre de cartes vendues,
// Nombre de cartes actives, Volume transactions monétiques (natifs Carthago, cf. mock-data.ts / carthagoKpis).

export const monetiqueSummary = {
  transactions: 190,
  volumeM: 15.1, // M FCFA
  failureRate: 0.53,
  txAuthorization: 190,
};

export type MonetiqueTransactionRow = { type: string; count: number; volume: number; muted?: boolean };

export const monetiqueTransactionTypes: MonetiqueTransactionRow[] = [
  { type: "Retrait GAB On-us", count: 134, volume: 11405000 },
  { type: "Retrait GAB Confrère (Off-us)", count: 23, volume: 3080000 },
  { type: "Abonnement / Frais", count: 15, volume: 332312 },
  { type: "Paiement TPE Confrère", count: 7, volume: 257177 },
  { type: "Demande de solde", count: 11, volume: 0, muted: true },
];

export const monetiqueTransactionTotal = {
  count: monetiqueTransactionTypes.reduce((sum, row) => sum + row.count, 0),
  volume: monetiqueTransactionTypes.reduce((sum, row) => sum + row.volume, 0),
};

// Répartition "Cartes par produit" : le widget correspondant était vide dans la capture source
// (donnée non exportée). Chiffres simulés à la demande, en attendant l'export réel Carthago.
export const cardsEmitted = 5340;
export const cardsActive = 4820;
export const cardsActivationRate = (cardsActive / cardsEmitted) * 100;

export const cardsByProduct = [
  { product: "Visa Classic", count: 2480, part: 51.4, fill: "var(--chart-3)" },
  { product: "GIM Prépayée", count: 980, part: 20.3, fill: "var(--chart-1)" },
  { product: "Visa Gold / Business", count: 860, part: 17.8, fill: "var(--chart-6)" },
  { product: "Mastercard Standard", count: 500, part: 10.5, fill: "var(--chart-4)" },
];
