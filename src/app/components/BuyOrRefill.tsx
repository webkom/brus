import React, { useEffect, useState } from "react";
import { BRUS_COST, BrusType } from "../utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { buyBrus, refillBrus } from "../utils/hooks";
import { BuyRefillBrusRequest, User } from "../utils/interfaces";

interface BuyOrRefillProps {
  user: User;
  buyOrRefill: "buyBrus" | "refillBrus";
}

const BuyOrRefill = ({ user, buyOrRefill }: BuyOrRefillProps) => {
  const [brusType, setBrusType] = useState<BrusType>("Dahls");
  const [quantity, setQuantity] = useState<number>(1);

  const brusBuyOrRefillData: BuyRefillBrusRequest = {
    brusAmount: quantity,
    brusType: brusType,
    userBrusName: user.brusName,
  };
  const queryClient = useQueryClient();

  const { refetch, isFetching, error } = useQuery({
    queryKey: [buyOrRefill, user],
    queryFn: () =>
      buyOrRefill === "buyBrus"
        ? buyBrus(brusBuyOrRefillData)
        : refillBrus(brusBuyOrRefillData),
    enabled: false,
  });

  const handleBuyBrus = () => {
    refetch()
      .then(({ data: updatedUser }) => {
        if (updatedUser) {
          queryClient.setQueryData(["usersKey"], (usersInCache: User[]) => {
            return usersInCache.map((userInCache) =>
              userInCache.brusName === user.brusName ? updatedUser : userInCache
            );
          });
        } else {
          // If updated data is not returned, refetch all users
          queryClient.invalidateQueries({ queryKey: ["usersKey"] });
        }
      })
      .catch((error) => {
        console.error("Failed to buy brus:", error);
      });
  };

  const fetchingText =
    buyOrRefill === "buyBrus" ? "Buying brus" : "Refilling brus";
  const buttonText = buyOrRefill === "buyBrus" ? "Buy brus" : "Refill";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between gap-4">
        <select
          value={brusType}
          onChange={(e) => setBrusType(e.target.value as BrusType)}
          className="border-2 border-green-700 p-1 w-auto rounded-sm py-2"
        >
          {Object.keys(BRUS_COST).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <input
          className="border-2 border-green-700 text-center rounded-sm"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min={1}
        />
      </div>

      {error ? (
        <p className="py-1">Error: {error.message}</p>
      ) : isFetching ? (
        <p className="py-1">{fetchingText}</p>
      ) : (
        <button
          onClick={handleBuyBrus}
          className="bg-green-500 border-2 border-green-700 py-1"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default BuyOrRefill;
