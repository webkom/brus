"use client";

import { useEffect, useState } from "react";

function getNextShame(): Date {
  const now = new Date();
  const next = new Date(now);
  const daysUntilTuesday = (2 - now.getDay() + 7) % 7 || 7;
  next.setDate(now.getDate() + daysUntilTuesday);
  next.setHours(16, 20, 0, 0);
  return next;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return "nå";
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (d > 0) return `${d}d ${h}t ${m}m`;
  if (h > 0) return `${h}t ${m}m ${s}s`;
  return `${m}m ${s}s`;
}

export function ShameCountdown() {
  const [msLeft, setMsLeft] = useState<number | null>(null);

  useEffect(() => {
    setMsLeft(getNextShame().getTime() - Date.now());
    const id = setInterval(() => {
      setMsLeft(getNextShame().getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (msLeft === null) return null;

  return (
    <div
      className="px-3 py-1 border-[2px] border-ink rounded-full font-mono text-[11px] tracking-[0.06em] uppercase whitespace-nowrap flex-shrink-0"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <span className="font-bold text-ink-soft">
        Shame om: {formatCountdown(msLeft)}
      </span>
    </div>
  );
}
