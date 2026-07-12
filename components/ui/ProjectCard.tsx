"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Reveal from "@/components/ui/animations/Reveal";
import ImageReveal from "@/components/ui/animations/ImageReveal";
import type { Project } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  project: Project;
  /** Index dans la liste : pilote l'alternance gauche/droite et le numéro affiché */
  index: number;
};

/**
 * Carte projet réutilisable : numéro, pitch, faits concrets, badges de stack,
 * captures réelles avec tilt 3D au survol (GSAP), liens live + GitHub.
 * Alternance gauche/droite selon l'index, comme les sections du Bichique.
 */
export default function ProjectCard({ project, index }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const flipped = index % 2 === 1;

  // Tilt 3D : la carte s'incline légèrement vers le curseur
  useEffect(() => {
    const el = tiltRef.current;
    if (reduced || !el) return;

    gsap.set(el, { transformPerspective: 1200 });
    const rxTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
    const ryTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      rxTo(((e.clientY - rect.top) / rect.height - 0.5) * -12);
      ryTo(((e.clientX - rect.left) / rect.width - 0.5) * 12);
    };
    const onLeave = () => {
      rxTo(0);
      ryTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [reduced]);

  return (
    <article
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        flipped ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Captures d'écran réelles, avec tilt au survol */}
      <div ref={tiltRef}>
        <ImageReveal className="relative rounded-2xl p-6">
          {/* Premier enfant = le bloc des captures : c'est lui qui reçoit le dézoom d'ImageReveal */}
          <div className={`relative flex justify-center gap-4 ${project.mobile ? "" : "flex-col"}`}>
            {project.screenshots.map((shot, i) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={project.mobile ? 300 : 960}
                height={project.mobile ? 650 : 600}
                sizes={project.mobile ? "(min-width: 768px) 20vw, 40vw" : "(min-width: 768px) 45vw, 90vw"}
                className={`rounded-xl border border-ligne shadow-2xl ${
                  project.mobile
                    ? `w-[46%] max-w-[240px] ${i === 1 ? "translate-y-6" : ""}`
                    : i === 1
                      ? "hidden md:block"
                      : ""
                }`}
              />
            ))}
          </div>
          {/* Halo coloré derrière les captures (après le bloc pour ne pas être la cible du dézoom) */}
          <div
            className="absolute inset-0 -z-10 rounded-2xl opacity-20"
            style={{ background: `radial-gradient(500px circle at 50% 0%, ${project.accent}, transparent 70%)` }}
            aria-hidden
          />
        </ImageReveal>
      </div>

      {/* Texte du projet */}
      <Reveal>
        <p className="font-display text-5xl font-bold" style={{ color: `${project.accent}55` }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-brume-60">{project.pitch}</p>

        {/* Faits concrets : ce que le projet prouve */}
        <ul className="mt-5 flex max-w-lg flex-col gap-2">
          {project.highlights.map((fact) => (
            <li key={fact} className="flex items-start gap-2.5 text-sm text-brume/85">
              <span aria-hidden className="mt-0.5 font-bold text-menthe">✓</span>
              {fact}
            </li>
          ))}
        </ul>

        {/* Badges de stack */}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies utilisées">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-ligne bg-surface px-3.5 py-1.5 text-xs font-semibold text-brume/85"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brume px-6 py-3 text-sm font-semibold text-nuit transition-colors hover:bg-menthe"
          >
            Voir le site ↗
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brume-60 underline-offset-4 transition-colors hover:text-menthe hover:underline"
            >
              Code sur GitHub
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}
