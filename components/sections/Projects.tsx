import Marquee from "@/components/ui/animations/Marquee";
import TextReveal from "@/components/ui/animations/TextReveal";
import Reveal from "@/components/ui/animations/Reveal";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";

/** Le cœur du site : les 4 projets, en cartes alternées gauche/droite. */
export default function Projects() {
  return (
    <section id="projets" className="scroll-mt-24 border-t border-ligne py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
        >
          Quatre produits. <span className="text-corail">De l&apos;idée au déploiement.</span>
        </TextReveal>
        <Reveal>
          <p className="mt-6 max-w-xl text-brume-60">
            Pas des tutoriels suivis à la lettre : des projets pensés, construits, itérés et mis
            en ligne. Chacun m&apos;a appris une brique différente du métier.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-28 md:gap-36">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* Bandeau défilant de transition vers les compétences */}
      <div className="mt-28 border-y border-ligne py-4 md:mt-36">
        <Marquee duration={24} reverse>
          {["PWA", "Jeu mobile", "SaaS", "Site vitrine", "Automatisation", "Déployé en prod"].map(
            (word) => (
              <span key={word} className="flex items-center">
                <span className="px-6 font-display text-lg font-medium text-brume/80">{word}</span>
                <span aria-hidden className="text-corail">✶</span>
              </span>
            )
          )}
        </Marquee>
      </div>
    </section>
  );
}
