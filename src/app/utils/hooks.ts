import {
  API_URL,
  BRUS_COST,
  BUY_BRUS_ROUTE,
  REFETCH_MEMBERS_ROUTE,
  REFILL_BRUS_ROUTE,
  USERS_ROUTE,
  WALLOFSHAME_ROUTE,
} from "./constants";
import { BuyRefillBrusRequest, User } from "./interfaces";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}${USERS_ROUTE}`);
  let data: User[] = [];
  try {
    const res = (await response.json()) as { users: User[] };
    data = res.users;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const refetchActiveMembers: () => Promise<void> = async () => {
  const res = await fetch(`${API_URL}${REFETCH_MEMBERS_ROUTE}`);
  if (res.status === 200) {
    return;
  }
  const data = await res.json();
  return new Promise((_, reject) =>
    reject(data.error ?? "Klarte ikke hente aktive medlemmer")
  );
};

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

export const triggerWallOfShame = async () => {
  const res = await fetch(`${API_URL}${WALLOFSHAME_ROUTE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const updatedUsers = await res.json().then((data) => data.updatedUsers);
  return updatedUsers as User[];
};
