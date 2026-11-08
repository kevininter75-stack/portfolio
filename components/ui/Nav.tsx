"use client";

import ArrowUpRight from "@/components/ui/ArrowUpRight";

import { useState } from "react";
const links = [
  { href: "#ia", label: "Expertise IA" },
  { href: "#methode", label: "Approche" },
  { href: "#projets", label: "Réalisations" },
  { href: "#a-propos", label: "À propos" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4"
        aria-label="Navigation principale"
      >
        <a
          href="#"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-bold tracking-[-0.06em]"
        >
          INTER{" "}
          <span className="text-menthe">
            IA<span className="text-corail">.</span>
          </span>
          <span className="mt-0.5 block font-sans text-[9px] font-normal tracking-[0.13em] text-brume-60">
            PAR KÉVIN INTERTAGLIA
          </span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-medium text-brume-60 transition-colors hover:text-menthe"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden rounded-full border border-menthe/40 px-5 py-2.5 text-xs font-semibold transition-colors hover:bg-menthe hover:text-nuit md:block"
        >
          Parlons de votre projet{" "}
          <span aria-hidden="true">
            <ArrowUpRight />
          </span>
        </a>
        <button
          type="button"
          className="rounded-full border border-ligne px-4 py-2 text-xs md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Fermer" : "Menu"}
        </button>
      </nav>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="border-t border-ligne bg-nuit px-6 py-5 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {[
              ...links,
              { href: "#contact", label: "Parlons de votre projet" },
            ].map((link) => (
              <li key={link.href}>
                <a
                  className="block py-1 text-sm"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
