import { User } from "../utils/interfaces";

export function Footer({ users }: { users: User[] }) {
  return (
    <footer className="mt-14 pt-4 border-t-[1.5px] border-dashed border-ink flex justify-between flex-wrap gap-3 font-mono text-[11px] text-ink-soft">
      <span>
        <a
          href="https://github.com/webkom/brus"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-ink transition-colors"
        >
          brus
        </a>{" "}
        · {users.length} medlemmer
      </span>
      <span>Lagd med 🍺 av Webkom</span>
    </footer>
  );
}
