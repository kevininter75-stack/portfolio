import { profile } from "@/lib/data";

const links = [
  { href: "#a-propos", label: "À propos" },
  { href: "#projets", label: "Projets" },
  { href: "#methode", label: "Méthode" },
  { href: "#competences", label: "Compétences" },
  { href: "#contact", label: "Contact" },
];

/** Navigation sticky discrète, avec ancres vers chaque section. */
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 mix-blend-difference">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Navigation principale"
      >
        <a href="#" className="font-display text-lg font-bold tracking-tight text-brume">
          KI<span className="text-menthe">.</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-brume/90 transition-colors hover:text-menthe"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cvFile}
          download
          className="rounded-full bg-brume/15 px-5 py-2 text-sm font-semibold text-brume backdrop-blur-md transition-colors hover:bg-menthe hover:text-nuit"
        >
          Mon CV
        </a>
      </nav>
    </header>
  );
}
