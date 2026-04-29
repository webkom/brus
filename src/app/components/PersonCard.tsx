"use client";

import { ShoppingCart, BottleWine } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "../utils/interfaces";
import { getAvatarColor } from "../utils/constants";
import styles from "./PersonCard.module.css";

function getRotation(name: string): number {
  const code = name.charCodeAt(0) % 9;
  return (code - 4) * 0.5;
}

function formatSaldo(saldo: number): string {
  const rounded = Math.round((saldo + Number.EPSILON) * 100) / 100;
  return `${saldo > 0 ? "+" : ""}${rounded}kr`;
}

interface PersonCardProps {
  user: User;
  onClick?: () => void;
}

export function PersonCard({ user, onClick }: PersonCardProps) {
  const isDebt = user.saldo < 0;
  const history = user.history ?? [];

  const totalRefilled = history
    .filter((e) => e.type === "refill")
    .reduce((sum, e) => sum + e.qty, 0);

  const totalBought = history
    .filter((e) => e.type === "buy")
    .reduce((sum, e) => sum + e.qty, 0);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.button
      onClick={onClick}
      style={{
        rotate: getRotation(user.name),
        boxShadow: "4px 4px 0 var(--ink)",
      }}
      whileHover={{
        y: -6,
        scale: 1.03,
        rotate: 0,
        boxShadow: "6px 6px 0 var(--ink)",
      }}
      whileTap={{
        y: 0,
        scale: 0.97,
        rotate: 0,
        boxShadow: "2px 2px 0 var(--ink)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={`${styles.card} w-full text-left border-[3px] border-ink rounded-[4px] p-3 pb-2.5 flex flex-col gap-2 ${isDebt ? "bg-[#FFE9DD]" : "bg-white"}`}
    >
      {/* Avatar */}
      <div
        className={`${styles.avatarSheen} relative aspect-square border-[2.5px] border-ink rounded-[4px] overflow-hidden flex items-center justify-center`}
        style={
          user.avatar ? undefined : { background: getAvatarColor(user.name) }
        }
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-display font-extrabold text-5xl text-ink leading-none">
            {initials}
          </span>
        )}
      </div>

      {/* Name + saldo */}
      <div className="flex items-center justify-between gap-1.5">
        <span className="font-display font-semibold text-[18px] leading-none tracking-tight text-ink">
          {user.name.split(" ")[0]}
        </span>
        <span
          className={`font-mono text-[11px] border-[1.5px] border-ink rounded-full px-2 py-0.5 whitespace-nowrap font-bold ${
            isDebt ? "bg-accent text-white" : "bg-paper-2 text-ink"
          }`}
        >
          {formatSaldo(user.saldo)}
        </span>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-3 border-t-[1.5px] border-dashed border-ink pt-2">
        {totalRefilled === 0 && totalBought === 0 ? (
          <span className="font-mono text-[10px] text-ink-soft italic">
            Ingen drinker
          </span>
        ) : (
          <>
            {totalBought > 0 && (
              <div className="flex items-center gap-1 text-accent">
                <BottleWine size={13} strokeWidth={3} />
                <span className="font-mono text-[10px]">x{totalBought}</span>
              </div>
            )}
            {totalRefilled > 0 && (
              <div className="flex items-center gap-1 text-green">
                <ShoppingCart size={13} strokeWidth={3} />
                <span className="font-mono text-[10px]">x{totalRefilled}</span>
              </div>
            )}
          </>
        )}
      </div>
    </motion.button>
  );
}
