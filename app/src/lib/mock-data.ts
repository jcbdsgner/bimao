// Historical series backing the overview trend charts.
// Each series ends on the current snapshot values shown in the KPI cards.

export const nplTrend = [
  { month: "Août", npl: 24.6 },
  { month: "Sept", npl: 27.1 },
  { month: "Oct", npl: 30.4 },
  { month: "Nov", npl: 33.8 },
  { month: "Déc", npl: 36.2 },
  { month: "Jan", npl: 38.1 },
];

// Segmentation clientèle complète (8 434 clients) — source : export Carthago, cf. capture "Clients — Segmentation & Analyse"
export const portfolioMix = [
  { segment: "Particuliers", count: 5383, value: 63.8, fill: "var(--color-particuliers)" },
  { segment: "Entreprises", count: 2642, value: 31.3, fill: "var(--color-entreprises)" },
  { segment: "Banques", count: 324, value: 3.8, fill: "var(--color-banques)" },
  { segment: "Associations", count: 58, value: 0.7, fill: "var(--color-associations)" },
  { segment: "Autres", count: 21, value: 0.2, fill: "var(--color-autres)" },
  { segment: "Cotitulaires", count: 6, value: 0.1, fill: "var(--color-cotitulaires)" },
];

export const netPositionTrend = [
  { month: "Août", entrants: 78.4, sortants: 74.1 },
  { month: "Sept", entrants: 81.2, sortants: 79.6 },
  { month: "Oct", entrants: 84.9, sortants: 85.3 },
  { month: "Nov", entrants: 87.1, sortants: 89.8 },
  { month: "Déc", entrants: 88.6, sortants: 92.4 },
  { month: "Jan", entrants: 90.8, sortants: 95.0 },
];

// Crédit & Risque — drill-down chart data
export const nplBySegment = [
  { segment: "Particuliers", montant: 14.8, part: 62.7, fill: "var(--color-particuliers)" },
  { segment: "Entreprises/SME", montant: 8.8, part: 37.3, fill: "var(--color-entreprises)" },
];

export const nplByCoverage = [
  { type: "Garanti (Hypothèques)", montant: 15.4, part: 65, fill: "var(--color-garanti)" },
  { type: "Non garanti / Cautions", montant: 8.2, part: 35, fill: "var(--color-nonGaranti)" },
];

// Digital & Flux — drill-down chart data
export const failureCauses = [
  { cause: "Solde insuffisant", wave: 152, orange: 44 },
  { cause: "Time-out API", wave: 8, orange: 3 },
];

// Carthago Gap — cartographie complète des 55 KPIs métier (source : Gap_analyse_KPI.xlsx)
// natif=true -> disponible nativement dans Carthago ("Oui" dans le document) ; sinon calcul manuel (Excel)
export type CarthagoKpiRow = { domaine: string; kpi: string; natif: boolean; methode: string };

export const carthagoKpis: CarthagoKpiRow[] = [
  { domaine: "Crédit", kpi: "Encours total de crédits", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Crédit", kpi: "Taux de recouvrement", natif: false, methode: "(Créances récupérées / Total des créances) x 100" },
  { domaine: "Risque", kpi: "Encours NPL", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Risque", kpi: "Taux de défaut", natif: false, methode: "(Nombre crédits impayés / Nombre total crédits) x 100" },
  { domaine: "Commercial", kpi: "Volume de crédits décaissés", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Commercial", kpi: "Nombre de comptes ouverts", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Commercial", kpi: "Nombre de comptes actifs", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Commercial", kpi: "Nombre de comptes inactifs", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Commercial", kpi: "Comptes clôturés", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Commercial", kpi: "Comptes par segment client", natif: true, methode: "Somme des comptes appartenant à un segment" },
  { domaine: "Commercial", kpi: "Performance par chargé de clientèle", natif: false, methode: "Revenus générés par l'agent - Charges liées à l'agent" },
  { domaine: "Opérations", kpi: "Volume global des transactions", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Opérations", kpi: "Volume total transactions", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Opérations", kpi: "Volume virements interbancaires", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Opérations", kpi: "Virements RTGS émis", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Opérations", kpi: "Opérations rejetées", natif: false, methode: "Nombre total de transactions rejetées" },
  { domaine: "Opérations", kpi: "Délai moyen de traitement", natif: false, methode: "Calcul manuel (Excel) — méthode à formaliser" },
  { domaine: "Opérations", kpi: "Respect des SLA", natif: false, methode: "Calcul manuel (Excel) — méthode à formaliser" },
  { domaine: "Finance", kpi: "Coût moyen de la ressource", natif: true, methode: "Charges financières / Montant moyen des ressources x 100" },
  { domaine: "Finance", kpi: "Rentabilité par agence", natif: false, methode: "Revenus de l'agence - Charges de l'agence" },
  { domaine: "Finance", kpi: "Marge bancaire", natif: false, methode: "Revenus bruts - Charges liées aux activités" },
  { domaine: "Finance", kpi: "Commissions générées", natif: false, methode: "Somme des frais et commissions perçus" },
  { domaine: "Réseau", kpi: "Volume d'activité par agence", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Monétique", kpi: "Nombre de cartes vendues", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Monétique", kpi: "Nombre de cartes actives", natif: true, methode: "Cartes ayant effectué au moins une transaction" },
  { domaine: "Monétique", kpi: "Volume transactions monétiques", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Monétique", kpi: "Volume transferts sortants", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Monétique", kpi: "Volume transferts entrants", natif: false, methode: "Somme des montants des transferts reçus" },
  { domaine: "Digital", kpi: "Transactions digitales", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "Digital", kpi: "Taux d'échec transactions", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "IT", kpi: "Incidents IT", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "IT", kpi: "Tickets support IT", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "IT", kpi: "Disponibilité du système IT", natif: false, methode: "(Temps de fonctionnement / Temps total) x 100" },
  { domaine: "Service client", kpi: "Nombre de réclamations clients", natif: false, methode: "Somme des réclamations reçues sur la période" },
  { domaine: "Conformité", kpi: "Alertes conformité", natif: false, methode: "Somme des alertes générées sur la période" },
  { domaine: "Conformité", kpi: "Non-conformités détectées", natif: false, methode: "Total des anomalies/écarts identifiés lors d'un contrôle, audit ou supervision" },
  { domaine: "Conformité", kpi: "Nombre de contrôles réglementaires", natif: false, methode: "Somme des contrôles réalisés" },
  { domaine: "Conformité", kpi: "Transactions non conformes", natif: false, methode: "Somme des transactions identifiées comme non conformes" },
  { domaine: "Audit", kpi: "Recommandations d'audit", natif: false, methode: "Somme des recommandations émises" },
  { domaine: "Audit", kpi: "Nombre missions d'audit", natif: false, methode: "Somme des missions réalisées" },
  { domaine: "Audit", kpi: "Anomalies détectées audit", natif: false, methode: "Somme des anomalies identifiées lors des audits" },
  { domaine: "Caisse", kpi: "Écarts de caisse", natif: true, methode: "Solde physique - Solde théorique" },
  { domaine: "Caisse", kpi: "Nombre d'opérations par caissier", natif: false, methode: "Somme des opérations effectuées par un caissier" },
  { domaine: "Caisse", kpi: "Faux billets détectés", natif: false, methode: "Somme des billets faux identifiés" },
  { domaine: "Contrôle interne", kpi: "Nombre contrôles permanents", natif: false, methode: "Somme des contrôles réalisés de manière continue" },
  { domaine: "Contrôle interne", kpi: "Anomalies détectées contrôle", natif: false, methode: "Somme des anomalies relevées lors des contrôles" },
  { domaine: "RH", kpi: "Nombre d'employés", natif: true, methode: "Extraction automatique Carthago" },
  { domaine: "RH", kpi: "Taux d'absentéisme", natif: false, methode: "(Jours d'absence / Jours travaillés prévus) x 100" },
  { domaine: "RH", kpi: "Nombre recrutements", natif: false, methode: "Somme des employés recrutés sur la période" },
  { domaine: "RH", kpi: "Nombre formations", natif: false, methode: "Somme des sessions de formation réalisées" },
  { domaine: "RH", kpi: "Promotions internes", natif: false, methode: "Somme des employés promus en interne" },
  { domaine: "Moyens généraux", kpi: "Délais résolution incidents MG", natif: false, methode: "Somme des temps de résolution des incidents" },
  { domaine: "Moyens généraux", kpi: "Niveau stock fournitures", natif: false, methode: "Quantité initiale + Réceptions - Consommations" },
  { domaine: "Moyens généraux", kpi: "Délais appels d'offres", natif: false, methode: "Date d'attribution - Date de lancement" },
  { domaine: "Juridique", kpi: "Montant à recouvrer contentieux", natif: true, methode: "Extraction automatique Carthago" },
];

// Comptes Bancaires — Gestion & Analyse (source : capture "Comptes Bancaires — Gestion & Analyse")
export type CompteTypeRow = {
  type: string;
  total: number;
  actifs: number;
  clotures: number;
  solde: number;
  statut: "Sain" | "Déficit";
};

export const comptesOuverts = 6522;
export const comptesActifs = 5899;
export const comptesClotures = 608;
export const comptesEnCloture = 15;
export const comptesTypesDistincts = 36;

export const comptesParType: CompteTypeRow[] = [
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

export const comptesActifsPct = (comptesActifs / comptesOuverts) * 100;
export const comptesCloturesPct = (comptesClotures / comptesOuverts) * 100;
export const comptesEnCloturePct = (comptesEnCloture / comptesOuverts) * 100;

// Clients — vue "donut" du mix de produits, dérivée de comptesParType (Top 5 + Autres)
// pour rester cohérente avec le détail complet exposé sur la page Comptes Bancaires
const accountTypeDonutTop = comptesParType.slice(0, 5);
const accountTypeDonutTopTotal = accountTypeDonutTop.reduce((sum, row) => sum + row.total, 0);
const accountTypeDonutOthers = comptesOuverts - accountTypeDonutTopTotal;

export const accountTypeDonutData = [
  ...accountTypeDonutTop.map((row) => ({ type: row.type, total: row.total, value: (row.total / comptesOuverts) * 100 })),
  { type: "Autres", total: accountTypeDonutOthers, value: (accountTypeDonutOthers / comptesOuverts) * 100 },
];

// Couverture d'automatisation par domaine métier — dérivée automatiquement de carthagoKpis
export const carthagoByDomain = Array.from(
  carthagoKpis.reduce((domains, row) => {
    const counts = domains.get(row.domaine) ?? { domain: row.domaine, auto: 0, manuel: 0 };
    if (row.natif) counts.auto += 1;
    else counts.manuel += 1;
    domains.set(row.domaine, counts);
    return domains;
  }, new Map<string, { domain: string; auto: number; manuel: number }>()).values()
);

// Totaux globaux dérivés de carthagoKpis, utilisés partout où le décompte auto/manuel est affiché
export const carthagoKpiTotal = carthagoKpis.length;
export const carthagoAutoCount = carthagoKpis.filter((row) => row.natif).length;
export const carthagoManuelCount = carthagoKpiTotal - carthagoAutoCount;
export const carthagoAutoPct = (carthagoAutoCount / carthagoKpiTotal) * 100;
export const carthagoManuelPct = (carthagoManuelCount / carthagoKpiTotal) * 100;
