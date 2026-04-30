"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { User } from "../utils/interfaces";
import {
  BRUS_COST,
  BRUS_COLOR,
  BRUS_TYPES,
  BrusType,
  getAvatarColor,
  getContrastColor,
} from "../utils/constants";
import { buyBrus, refillBrus } from "../utils/hooks";
import { ToastData } from "./Toast";
import styles from "./PersonModal.module.css";

interface PersonModalProps {
  user: User;
  onClose: () => void;
  onSuccess: (updated: User) => void;
  onToast: (data: Omit<ToastData, "id">) => void;
}

export function PersonModal({
  user: initialUser,
  onClose,
  onSuccess,
  onToast,
}: PersonModalProps) {
  const [user, setUser] = useState(initialUser);
  const [tab, setTab] = useState<"buy" | "refill">("buy");
  const [selectedBrand, setSelectedBrand] = useState<BrusType>("Dahls");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const isDebt = user.saldo < 0;
  const formattedSaldo = `${user.saldo > 0 ? "+" : ""}${Math.round((user.saldo + Number.EPSILON) * 100) / 100}kr`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  async function handleAction() {
    setLoading(true);
    try {
      const fn = tab === "buy" ? buyBrus : refillBrus;
      const updated = await fn({
        brusType: selectedBrand,
        userBrusName: user.brusName,
        brusAmount: quantity,
      });
      if (updated) {
        setUser(updated);
        onSuccess(updated);
        const amount = quantity * BRUS_COST[selectedBrand];
        onToast({
          type: tab,
          message: tab === "buy"
            ? `Kjøpt ${quantity}× ${selectedBrand}`
            : `Fylt på ${quantity}× ${selectedBrand}`,
          sub: tab === "buy" ? `−${amount}kr` : `+${amount}kr`,
        });
      }
    } catch {
      onToast({ type: "error", message: "Noe gikk galt. Prøv igjen." });
    } finally {
      setLoading(false);
    }
  }

  return createPortal(
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-5 bg-ink/35 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full sm:max-w-[440px] bg-paper border-t-[3px] sm:border-[3px] border-ink rounded-t-[12px] sm:rounded-[6px] p-4 sm:p-6"
        style={{ boxShadow: "8px 8px 0 var(--ink)" }}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 38 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          onClick={onClose}
          whileTap={{ scale: 0.85, rotate: 15 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute top-3 right-3 sm:-top-4 sm:-right-4 w-9 h-9 rounded-full bg-accent-2 border-[3px] border-ink font-display font-extrabold text-lg flex items-center justify-center"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          ✕
        </motion.button>

        {/* Header */}
        <div className="flex items-start gap-4 pb-5 border-b-[2px] border-dashed border-ink mb-5">
          <div
            className="w-16 h-16 flex-none border-[2.5px] border-ink rounded-[4px] overflow-hidden flex items-center justify-center"
            style={
              user.avatar
                ? undefined
                : { background: getAvatarColor(user.name) }
            }
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display font-extrabold text-3xl text-ink">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-extrabold text-[36px] leading-[.9] tracking-[-0.02em] m-0">
              {user.name.split(" ")[0]}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-mono text-[11px] text-ink-soft tracking-[0.06em]">
                @{user.github}
              </p>
              <span
                className={`inline-block px-3 py-0.5 rounded-full font-mono text-[11px] tracking-[0.06em] ${isDebt ? "bg-accent text-white" : "bg-ink text-paper"}`}
              >
                Saldo: {formattedSaldo}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex border-[2.5px] border-ink rounded-[4px] overflow-hidden mb-5"
          style={{ boxShadow: "var(--shadow-sm)" }}
        >
          {(["buy", "refill"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 font-display font-extrabold text-[15px] transition-colors ${
                tab === t
                  ? "bg-ink text-paper"
                  : "bg-white text-ink hover:bg-paper-2"
              }`}
            >
              {t === "buy" ? "🥤 Kjøp brus" : "📦 Fyll på"}
            </button>
          ))}
        </div>

        {/* Brand selector */}
        <div className="mb-5">
          <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft block mb-2">
            Brus
          </label>
          <div className="flex flex-wrap gap-2">
            {BRUS_TYPES.map((brand) => {
              const isActive = selectedBrand === brand;
              const bg = BRUS_COLOR[brand];
              return (
                <motion.button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.06em] uppercase transition-colors flex items-center gap-1.5"
                  style={{
                    background: isActive ? bg : "transparent",
                    color: isActive ? getContrastColor(bg) : "var(--color-ink)",
                    border: "2px solid var(--color-ink)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full border border-black"
                    style={{ background: bg }}
                  />
                  {brand}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-5">
          <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-soft block mb-2">
            Antall
          </label>
          <div
            className="flex items-stretch border-[2.5px] border-ink rounded-[4px] overflow-hidden bg-white"
            style={{ boxShadow: "var(--shadow-sm)" }}
          >
            <button
              className="w-12 font-display font-extrabold text-xl bg-white hover:bg-paper-2 transition-colors"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              className="flex-1 text-center font-mono font-bold text-sm bg-white outline-none py-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              className="w-12 font-display font-extrabold text-xl bg-white hover:bg-paper-2 transition-colors"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleAction}
          disabled={loading}
          className={`${styles.ctaBtn} w-full flex items-center justify-between border-[3px] border-ink rounded-[4px] px-5 py-4 font-display font-extrabold text-[17px] disabled:opacity-50 ${
            tab === "buy" ? "bg-accent text-white" : "bg-green text-white"
          }`}
          style={{ boxShadow: "var(--shadow)" }}
        >
          <span>
            {loading
              ? "…"
              : tab === "buy"
                ? `Kjøp ${quantity} ${selectedBrand}`
                : `Fyll på ${quantity} ${selectedBrand}`}
          </span>
          <span className="font-mono text-[14px] opacity-90">
            {tab === "buy"
              ? `−${quantity * BRUS_COST[selectedBrand]}kr`
              : `+${quantity * BRUS_COST[selectedBrand]}kr`}
          </span>
        </button>

        {/* Footer hint */}
        <p className="font-mono text-[11px] text-ink-soft text-center mt-3 tracking-[0.04em]">
          {tab === "buy"
            ? "tar én flaske ut av kjøleskapet og legger den på din regning."
            : "fyller på kjøleskapet — takk for at du holder festen i live!"}
        </p>

        {/* History */}
        {(user.history?.length ?? 0) > 0 && (
          <div className="mt-5 pt-4 border-t-[2px] border-dashed border-ink max-h-[120px] overflow-y-auto">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink mb-2 font-semibold">
              Siste hendelser
            </h3>
            <ul className="flex flex-col gap-1">
              {user.history!.slice(0, 6).map((e, i) => (
                <li
                  key={i}
                  className="flex justify-between gap-2 font-mono text-[11px] text-ink-soft"
                >
                  <span>
                    {e.type === "buy" ? "🥤" : "📦"}{" "}
                    {e.type === "buy" ? "Kjøpt" : "Fylt"} {e.qty}× {e.brusType}
                  </span>
                  <b className="text-ink font-semibold whitespace-nowrap">
                    {relativeTime(e.ts)}
                  </b>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  );
}

function relativeTime(ts: number): string {
  const diff = (Date.now() - ts) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(ts).toLocaleDateString();
}
