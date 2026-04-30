"use client";

import { motion } from "framer-motion";
import { BrusType, BRUS_COLOR, BRUS_TYPES, getContrastColor } from "../utils/constants";

const tapProps = {
  whileTap: { scale: 0.9 },
  transition: { type: "spring", stiffness: 400, damping: 20 },
} as const;

interface BrandChipsProps {
  active: Set<BrusType>;
  onChange: (active: Set<BrusType>) => void;
}

export function BrandChips({ active, onChange }: BrandChipsProps) {
  function toggle(brand: BrusType) {
    const next = new Set(active);
    if (next.has(brand)) next.delete(brand);
    else next.add(brand);
    onChange(next);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <motion.button
        {...tapProps}
        onClick={() => onChange(new Set())}
        className="px-3 py-1 rounded-full border-[2px] border-ink font-mono text-[11px] tracking-[0.06em] uppercase transition-colors"
        style={{
          background: active.size === 0 ? "var(--color-ink)" : "transparent",
          color: active.size === 0 ? "var(--color-paper)" : "var(--color-ink)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        Alle
      </motion.button>
      {BRUS_TYPES.map((brand) => {
        const isActive = active.has(brand);
        return (
          <motion.button
            key={brand}
            {...tapProps}
            onClick={() => toggle(brand)}
            className="px-3 py-1 rounded-full font-mono text-[11px] tracking-[0.06em] uppercase transition-colors flex items-center gap-1.5"
            style={{
              background: isActive ? BRUS_COLOR[brand] : "transparent",
              color: isActive
                ? getContrastColor(BRUS_COLOR[brand])
                : "var(--color-ink)",
              border: "2px solid var(--color-ink)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full border border-black"
              style={{ background: BRUS_COLOR[brand] }}
            />
            {brand}
          </motion.button>
        );
      })}
    </div>
  );
}

