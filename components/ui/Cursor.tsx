"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useFinePointer } from "@/lib/useFinePointer";

/**
 * Curseur décoratif du portfolio (différent du Bichique) :
 *  - un halo lumineux menthe qui suit avec inertie — effet projecteur sur fond sombre ;
 *  - un petit viseur en croix, précis, qui passe corail et pivote de 45°
 *    sur les éléments interactifs (liens, boutons, [data-cursor]).
 * Purement décoratif : le curseur natif reste affiché. Desktop uniquement.
 */
export default function Cursor() {
  const halo = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled || !halo.current || !cross.current) return;

    const crossX = gsap.quickTo(cross.current, "x", { duration: 0.09, ease: "power2.out" });
    const crossY = gsap.quickTo(cross.current, "y", { duration: 0.09, ease: "power2.out" });
    const haloX = gsap.quickTo(halo.current, "x", { duration: 0.6, ease: "power3.out" });
    const haloY = gsap.quickTo(halo.current, "y", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      crossX(e.clientX);
      crossY(e.clientY);
      haloX(e.clientX);
      haloY(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [data-cursor]");

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target) && cross.current && halo.current) {
        gsap.to(cross.current, { rotation: 45, scale: 1.6, color: "#ff6b5e", duration: 0.3 });
        gsap.to(halo.current, { scale: 1.5, opacity: 0.7, duration: 0.4 });
      }
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target) && cross.current && halo.current) {
        gsap.to(cross.current, { rotation: 0, scale: 1, color: "#4fe3c1", duration: 0.3 });
        gsap.to(halo.current, { scale: 1, opacity: 1, duration: 0.4 });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
      {/* Halo projecteur, fondu en mode écran pour éclairer le fond sombre */}
      <div
        ref={halo}
        className="absolute -ml-24 -mt-24 h-48 w-48 rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(79,227,193,0.14) 0%, transparent 65%)",
        }}
      />
      {/* Viseur en croix */}
      <div ref={cross} className="absolute text-menthe">
        <div className="absolute -ml-[7px] -mt-[1px] h-0.5 w-3.5 bg-current" />
        <div className="absolute -ml-[1px] -mt-[7px] h-3.5 w-0.5 bg-current" />
      </div>
    </div>
  );
}
