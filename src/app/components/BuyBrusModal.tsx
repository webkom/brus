import React, { useEffect, useState } from "react";
import { User } from "../utils/interfaces";
import UserImage from "./UserImage";
import BuyOrRefill from "./BuyOrRefill";

interface BuyBrusModalProps {
  user: User;
  handleClose: () => void;
}

const BuyBrusModal = ({ user, handleClose }: BuyBrusModalProps) => {
  return (
    <div
      className="flex flex-col bg-green-100 rounded-sm p-4 pt-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-row justify-between bg-green-100 rounded-sm">
        <h1 className="text-2xl mb-2">{user.name}</h1>
        <button
          className="relative border-2 rounded-full font-bold w-8 h-8 bottom-4 left-4 bg-amber-100"
          onClick={handleClose}
        >
          x
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2">
          <UserImage user={user} size={100} />
          <span className="flex flex-col">
            <p className="whitespace-nowrap">
              <span>Saldo: </span>
              <span
                className={`${user.saldo > 0 ? "text-green-700" : "text-red-700"}`}
              >
                {Math.round((user.saldo + Number.EPSILON) * 100) / 100}kr
              </span>
            </p>
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <BuyOrRefill user={user} buyOrRefill="buyBrus" />
          <BuyOrRefill user={user} buyOrRefill="refillBrus" />
        </div>
      </div>
    </div>
  );
};

export default BuyBrusModal;
