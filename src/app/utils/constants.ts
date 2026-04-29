export const MEMBERS_URL = "https://members.webkom.dev/";
export const BUY_BRUS_ROUTE = "/buy_brus";
export const REFILL_BRUS_ROUTE = "/refill";

export const API_URL = "/api";

export type BrusType = "Dahls" | "Sommersby" | "Isbjørn" | "Cola";

export const BRUS_COST: Record<BrusType, number> = {
  Dahls: 30,
  Sommersby: 30,
  Isbjørn: 30,
  Cola: 30,
};

export const BRUS_COLOR: Record<BrusType, string> = {
  Dahls: "#1A5C34",
  Sommersby: "#B5D99C",
  Isbjørn: "#DDE8EE",
  Cola: "#7B3F20",
};

export const BRUS_TYPES: BrusType[] = ["Dahls", "Sommersby", "Isbjørn", "Cola"];

const AVATAR_COLORS = ["#E8C9A0", "#A8D4B8", "#A8C0E0", "#D4B8E0"];

export function getAvatarColor(name: string): string {
  const hash = name.split("").reduce((n, c) => n + c.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1A1814" : "#F5EFE2";
}
