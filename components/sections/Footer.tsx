import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-ligne py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-brume-60 md:flex-row">
        <p>© 2026 {profile.name} — La Réunion</p>
        <p>
          Fait avec{" "}
          <a
            href="https://claude.com/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-menthe transition-colors hover:text-corail"
          >
            Claude Code
          </a>{" "}
          — évidemment.
        </p>
      </div>
    </footer>
  );
}
