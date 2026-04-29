import { User } from "../utils/interfaces";
import { BRUS_COLOR, BrusType } from "../utils/constants";
import styles from "./PersonCard.module.css";

function CanShape({ color }: { color: string }) {
  return (
    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <rect x="1" y="3" width="8" height="11" rx="2" fill={color} stroke="var(--color-ink)" strokeWidth="1.2" />
      <rect x="1.5" y="1" width="7" height="3.5" rx="1.5" fill={color} stroke="var(--color-ink)" strokeWidth="1.2" />
    </svg>
  );
}

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
  const brandCounts = (user.history ?? [])
    .filter((e) => e.type === "buy")
    .reduce<Record<string, number>>((acc, e) => {
      acc[e.brusType] = (acc[e.brusType] ?? 0) + e.qty;
      return acc;
    }, {});
  const brands = Object.entries(brandCounts) as [BrusType, number][];

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`${styles.card} w-full text-left border-[3px] border-ink rounded-[4px] p-3 pb-2.5 flex flex-col gap-2 ${isDebt ? "bg-[#FFE9DD]" : "bg-white"}`}
      style={{
        boxShadow: "var(--shadow)",
        transform: `rotate(${getRotation(user.name)}deg)`,
      }}
    >
      {/* Avatar */}
      <div
        className={`${styles.avatarSheen} relative aspect-square border-[2.5px] border-ink rounded-[4px] overflow-hidden bg-paper flex items-center justify-center`}
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

      {/* Drink can row */}
      {brands.length > 0 && (
        <div className="flex items-center gap-2 overflow-hidden border-t-[1.5px] border-dashed border-ink pt-2">
          {brands.map(([brand, count]) => (
            <div key={brand} className="flex items-center gap-1 flex-shrink-0">
              <CanShape color={BRUS_COLOR[brand] ?? "#888"} />
              <span className="font-mono text-[10px] text-ink-soft">{count}×</span>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}
