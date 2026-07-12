import Reveal from "@/components/ui/animations/Reveal";
import TextReveal from "@/components/ui/animations/TextReveal";
import { profile, skills } from "@/lib/data";

/** Grille de badges des technologies, + bouton de téléchargement du CV. */
export default function Skills() {
  return (
    <section id="competences" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
      <TextReveal
        as="h2"
        className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
      >
        La boîte à outils<span className="text-menthe">.</span>
      </TextReveal>
      <Reveal>
        <p className="mt-6 max-w-xl text-brume-60">
          Des technologies apprises en construisant, avec Claude Code en copilote quotidien —
          du front au déploiement, en passant par la base de données et l&apos;automatisation.
        </p>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {skills.map((skill, i) => (
          <Reveal key={skill} delay={i * 0.04}>
            <li className="group rounded-xl border border-ligne bg-surface px-5 py-4 text-center font-semibold transition-all hover:-translate-y-1 hover:border-menthe/50 hover:bg-surface-2">
              {skill}
            </li>
          </Reveal>
        ))}
      </ul>

      {/* CV : déposer le PDF dans /public/cv-kevin-intertaglia.pdf */}
      <Reveal className="mt-16 text-center">
        <a
          href={profile.cvFile}
          download
          className="inline-block rounded-full bg-corail px-10 py-5 text-lg font-bold text-brume transition-colors hover:bg-menthe hover:text-nuit"
        >
          Télécharger mon CV ↓
        </a>
      </Reveal>
    </section>
  );
}
