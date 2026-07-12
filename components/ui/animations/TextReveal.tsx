"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";

type Props = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Délai en secondes avant la révélation une fois visible */
  delay?: number;
};

/**
 * Titre/texte révélé ligne par ligne sous masque, déclenché au scroll.
 * Le découpage SplitText (coûteux : mesures de layout) n'est créé qu'à
 * l'approche du viewport, pas à l'hydratation — bien meilleur pour le TBT.
 */
export default function TextReveal({ children, as = "h2", className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;

    // Sur tactile/mobile : fondu simple, sans découpage SplitText (coûteux en
    // layout sur petits CPU). L'expérience complète est réservée au desktop.
    if (!fine) {
      const tw = gsap.fromTo(
        el,
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        }
      );
      return () => {
        tw.scrollTrigger?.kill();
        tw.revert(); // restaure les styles si l'effet se rejoue (fine false → true)
      };
    }

    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        split = SplitText.create(el, { type: "lines", mask: "lines", autoSplit: true });
        tween = gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.15,
          stagger: 0.09,
          ease: "power4.out",
          delay,
          // Rejouable à chaque passage (voir Reveal)
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      },
      // Préparation un écran à l'avance : le split est prêt avant d'être visible
      { rootMargin: "100% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [reduced, fine, delay]);

  const Tag = as;
  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
