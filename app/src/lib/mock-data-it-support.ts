// IT & Support — Tickets & Incidents
// Source : capture "IT & Support — Tickets & Incidents" (dashboard BI branché Carthago)
// Couvre les KPIs du domaine "IT" dans Gap_analyse_KPI.xlsx : Incidents IT et Tickets support IT
// (tous deux disponibles nativement dans Carthago).

export type TicketPriority = "Basse" | "Moyenne" | "Haute" | "Très haute";
export type TicketStatus = "Nouveau" | "En cours (Attribué)" | "En attente" | "Résolu" | "Clos";

export const itSupportSummary = {
  totalTickets: 144,
  openInProgress: 4,
  resolvedClosed: 140,
  resolutionRate: 97.2,
  criticalIncidents: 5,
};

// "Disponibilité du système IT" (domaine IT) est un KPI manuel (Excel) dans le document source,
// non disponible nativement dans Carthago, et absent de la capture d'écran d'origine.
export const itSystemAvailability = {
  available: false,
  formule: "(Temps de fonctionnement / Temps total) x 100",
};

export const ticketsByPriority: { priority: TicketPriority; count: number; fill: string }[] = [
  { priority: "Moyenne", count: 85, fill: "var(--chart-3)" },
  { priority: "Haute", count: 53, fill: "var(--chart-4)" },
  { priority: "Très haute", count: 5, fill: "var(--chart-2)" },
  { priority: "Basse", count: 1, fill: "var(--chart-5)" },
];

export const openTickets: { id: number; titre: string; priorite: TicketPriority; statut: TicketStatus }[] = [
  { id: 161, titre: "02 agrafes, 10 enveloppes...", priorite: "Moyenne", statut: "Nouveau" },
  { id: 148, titre: "Liste des fournitures...", priorite: "Haute", statut: "Nouveau" },
  { id: 145, titre: "Modules RJ45", priorite: "Très haute", statut: "En cours (Attribué)" },
  { id: 110, titre: "01 clavier et 01 souris", priorite: "Moyenne", statut: "En attente" },
];
