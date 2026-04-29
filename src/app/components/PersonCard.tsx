import { User } from "../utils/interfaces";
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
    </button>
  );
}
