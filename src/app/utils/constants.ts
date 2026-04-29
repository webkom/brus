export const MEMBERS_URL = "https://members.webkom.dev/";
export const BUY_BRUS_ROUTE = "/buy_brus";
export const REFILL_BRUS_ROUTE = "/refill";

export const API_URL = "/api";

export type BrusType =
  | "Solo"
  | "Urge"
  | "Dahls"
  | "Fanta"
  | "Cola"
  | "Munkholm";

export const BRUS_COST: Record<BrusType, number> = {
  Solo: 30,
  Urge: 30,
  Dahls: 30,
  Fanta: 30,
  Cola: 30,
  Munkholm: 30,
};

export const BRUS_COLOR: Record<BrusType, string> = {
  Solo: "#FFB300",
  Urge: "#3FA34D",
  Dahls: "#D32027",
  Fanta: "#FF6B2C",
  Cola: "#7B3F20",
  Munkholm: "#7C9A3F",
};

export const BRUS_TYPES: BrusType[] = [
  "Solo",
  "Urge",
  "Dahls",
  "Fanta",
  "Cola",
  "Munkholm",
];
