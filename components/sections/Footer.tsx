import ArrowUpRight from "@/components/ui/ArrowUpRight";
import { profile } from "@/lib/data";
import EasterEgg from "@/components/ui/EasterEgg";

export default function Footer() {
  return (
    <footer className="border-t border-ligne py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-brume-60 md:flex-row">
        <div className="flex items-center gap-3">
          <p>© 2026 {profile.name} — La Réunion</p>
          <EasterEgg />
        </div>
        <p className="flex flex-wrap items-center justify-center gap-x-2 md:justify-end">
          <span>
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
          </span>
          <span aria-hidden>·</span>
          <a
            href={profile.siteRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-colors hover:text-menthe"
          >
            Code source <ArrowUpRight />
          </a>
        </p>
      </div>
    </footer>
  );
}
