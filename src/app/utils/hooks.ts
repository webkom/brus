import {
  API_URL,
  BRUS_COST,
  BUY_BRUS_ROUTE,
  REFILL_BRUS_ROUTE,
} from "./constants";
import { BuyRefillBrusRequest } from "./interfaces";

export const buyBrus = async ({
  brusAmount,
  brusType,
  userBrusName,
}: BuyRefillBrusRequest) => {
  if (!BRUS_COST[brusType] || brusAmount < 1) {
    return false;
  }

  const res = await fetch(`${API_URL}${BUY_BRUS_ROUTE}`, {
    method: "POST",
    body: JSON.stringify({ brusType, userBrusName, brusAmount }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updatedUser = await res.json().then((data) => data.updatedUser);
  if (!updatedUser) return false;
  return updatedUser;
};

export const refillBrus = async ({
  brusType,
  brusAmount,
  userBrusName,
}: BuyRefillBrusRequest) => {
  if (!BRUS_COST[brusType] || brusAmount < 1) {
    return false;
  }

  const res = await fetch(`${API_URL}${REFILL_BRUS_ROUTE}`, {
    method: "POST",
    body: JSON.stringify({
      brusType: brusType,
      userBrusName: userBrusName,
      brusAmount: brusAmount,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updatedUser = await res.json().then((data) => data.updatedUser);
  if (!updatedUser) return false;
  return updatedUser;
};
