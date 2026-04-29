import { User } from "../utils/interfaces";

interface HeaderProps {
  users: User[];
}

export function Header({ users }: HeaderProps) {
  const inDebt = users.filter((u) => u.saldo < 0);
  const stocked = users.filter((u) => u.saldo >= 0);
  const totalDebt = Math.round(inDebt.reduce((sum, u) => sum + u.saldo, 0));

  return (
    <header className="grid grid-cols-[1fr_auto] items-end gap-6 pb-7 border-b-[3px] border-dashed border-ink mb-10">
      <div>
        <h1 className="font-display font-extrabold text-[clamp(40px,10vw,7.75rem)] leading-[.85] tracking-[-0.09em] m-0 flex items-center flex-wrap gap-x-2">
          <span className="text-accent" style={{ fontStretch: "75%" }}>
            BRUUS
          </span>
          <span className="text-ink mr-2" style={{ fontStretch: "100%" }}>
            -
          </span>
          <span
            className="inline-block bg-accent-2 border-[3px] border-ink px-[0.12em] -rotate-2"
            style={{ boxShadow: "var(--shadow)", fontStretch: "100%" }}
          >
            baby
          </span>
        </h1>
        <p className="font-mono text-[13px] tracking-[0.04em] mt-4 text-ink-soft max-w-[56ch]">
          <b className="bg-ink text-paper px-1.5 py-0.5 rounded font-medium not-italic">
            Felles brus-kjøleskap.
          </b>{" "}
          Klikk på deg selv for å registrere inntak eller fylle på lageret.
          Saldo trekkes automatisk.
        </p>
      </div>

      <div
        className="border-[3px] border-ink bg-paper-2 px-5 pt-5 pb-4 min-w-[220px] rotate-[1.5deg] relative"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 -top-3.5 -rotate-[6deg] w-[90px] h-6 border-[2px] border-ink rounded-[4px]"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--color-accent-2) 0 6px, rgba(0,0,0,0.18) 6px 7px)",
          }}
        />
        <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-soft">
          Brus i kjøleskapet
        </p>
        <div className="font-display font-extrabold text-[82px] leading-[.9] tracking-[-0.04em] flex items-baseline gap-2">
          {users.length}
          <span className="text-[16px] font-mono font-medium tracking-[0.1em] uppercase text-ink-soft">
            stk
          </span>
        </div>
        <div className="flex justify-between font-mono text-[11px] text-ink-soft mt-1.5 pt-2 border-t-[1.5px] border-dashed border-ink">
          <span>{stocked.length} med lager</span>
          <span>{totalDebt}kr i minus</span>
        </div>
      </div>
    </header>
  );
}
