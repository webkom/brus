import {
  API_URL,
  BRUS_COST,
  BUY_BRUS_ROUTE,
  REFILL_BRUS_ROUTE,
} from "./constants";
import { BuyRefillBrusRequest } from "./interfaces";

async function postBrus(url: string, body: BuyRefillBrusRequest) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Server error ${res.status}`);
  const data = await res.json();
  if (!data.updatedUser) throw new Error("No updated user returned");
  return data.updatedUser;
}

export const buyBrus = async (req: BuyRefillBrusRequest) => {
  if (!BRUS_COST[req.brusType] || req.brusAmount < 1) return false;
  return postBrus(`${API_URL}${BUY_BRUS_ROUTE}`, req);
};

export const refillBrus = async (req: BuyRefillBrusRequest) => {
  if (!BRUS_COST[req.brusType] || req.brusAmount < 1) return false;
  return postBrus(`${API_URL}${REFILL_BRUS_ROUTE}`, req);
};
