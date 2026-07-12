"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Magnetic from "@/components/ui/animations/Magnetic";
import Marquee from "@/components/ui/animations/Marquee";
import { marqueeWords, profile } from "@/lib/data";

/** Hero plein écran : titre révélé mot à mot au chargement, CTA, bandeau défilant. */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (reduced || !el) return;
    const title = el.querySelector("h1");
    if (!title) return;
    const split = SplitText.create(title, { type: "lines", mask: "lines", autoSplit: true });
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from(split.lines, {
      yPercent: 115,
      duration: 1.2,
      stagger: 0.12,
      ease: "power4.out",
    }).from(
      el.querySelectorAll("[data-hero-fade]"),
      { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" },
      "-=0.5"
    );
    return () => {
      tl.kill();
      split.revert();
    };
  }, [reduced]);

  return (
    <section ref={root} className="halo relative flex min-h-svh flex-col justify-between pt-24">
      <div className="mx-auto flex w-full max-w-6xl grow flex-col justify-center px-6">
        <p data-hero-fade className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-menthe">
          {profile.name} — {profile.location}
        </p>
        <h1 className="font-display max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[1.02] tracking-tight">
          De l&apos;hôtellerie de luxe au{" "}
          <span className="text-menthe">développement web</span> assisté par{" "}
          <span className="text-corail">IA</span>.
        </h1>
        <p data-hero-fade className="mt-8 max-w-xl text-lg text-brume-60">
          Bar manager le jour, développeur autodidacte le reste du temps. Je construis des
          produits complets — de l&apos;idée au déploiement — avec Claude Code comme copilote.
        </p>
        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#projets"
              className="inline-block rounded-full bg-menthe px-8 py-4 font-semibold text-nuit transition-colors hover:bg-corail hover:text-brume"
            >
              Voir mes projets
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-block rounded-full border border-ligne px-8 py-4 font-semibold text-brume transition-colors hover:border-menthe hover:text-menthe"
            >
              Me contacter
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Bandeau défilant en pied de hero */}
      <div className="border-y border-ligne py-4">
        <Marquee duration={26}>
          {marqueeWords.map((word) => (
            <span key={word} className="flex items-center">
              <span className="px-6 font-display text-lg font-medium text-brume/80">{word}</span>
              <span aria-hidden className="text-menthe">✶</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
