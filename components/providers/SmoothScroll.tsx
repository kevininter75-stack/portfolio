"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";

/**
 * Smooth scroll Lenis synchronisé avec ScrollTrigger.
 * Desktop uniquement : sur tactile le scroll natif est meilleur (et bien
 * plus léger pour le CPU). Désactivé aussi si reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  // Repartir du haut à chaque chargement (hors lien d'ancre) : sinon le navigateur
  // restaure le scroll au milieu de la page et tous les triggers au-dessus
  // se déclenchent d'un coup, sans animation visible pour le visiteur.
  useEffect(() => {
    if (window.location.hash) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reduced || !fine) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced, fine]);

  return <>{children}</>;
}
