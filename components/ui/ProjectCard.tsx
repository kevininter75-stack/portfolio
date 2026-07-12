"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
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
 * Carte projet réutilisable : numéro, pitch, badges de stack, captures réelles
 * avec tilt 3D au survol (Framer Motion), liens live + GitHub.
 * Alternance gauche/droite selon l'index, comme les sections du Bichique.
 */
export default function ProjectCard({ project, index }: Props) {
  const reduced = useReducedMotion();
  const flipped = index % 2 === 1;

  // Tilt 3D : la carte s'incline légèrement vers le curseur
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <article
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        flipped ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Captures d'écran réelles, avec tilt au survol */}
      <motion.div
        style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <ImageReveal
          className="relative rounded-2xl p-6"
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-20"
            style={{ background: `radial-gradient(500px circle at 50% 0%, ${project.accent}, transparent 70%)` }}
            aria-hidden
          />
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
        </ImageReveal>
      </motion.div>

      {/* Texte du projet */}
      <Reveal>
        <p className="font-display text-5xl font-bold" style={{ color: `${project.accent}55` }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-lg leading-relaxed text-brume-60">{project.pitch}</p>

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
