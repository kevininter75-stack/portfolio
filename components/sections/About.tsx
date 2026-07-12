import Image from "next/image";
import Reveal from "@/components/ui/animations/Reveal";
import TextReveal from "@/components/ui/animations/TextReveal";
import ImageReveal from "@/components/ui/animations/ImageReveal";
import { journey, languages, profile } from "@/lib/data";

/**
 * Parcours en étapes numérotées (01, 02, 03) façon storytelling,
 * avec la photo de profil en vis-à-vis.
 */
export default function About() {
  return (
    <section id="a-propos" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28 md:py-36">
      <TextReveal
        as="h2"
        className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
      >
        Un parcours qui ne ressemble pas aux autres. <span className="text-menthe">Tant mieux.</span>
      </TextReveal>

      <div className="mt-16 grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-20">
        {/* Photo de profil + langues, colonne sticky sur desktop */}
        <div className="md:sticky md:top-28 md:self-start">
          <ImageReveal className="relative h-[420px] overflow-hidden rounded-2xl md:h-[520px]">
            <Image
              src={profile.photo}
              alt={`Portrait de ${profile.name}`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
          <Reveal delay={0.15}>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Langues parlées">
              {languages.map((lang) => (
                <li
                  key={lang}
                  className="rounded-full border border-ligne bg-surface px-3.5 py-1.5 text-xs font-semibold text-brume/85"
                >
                  {lang}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Étapes numérotées */}
        <div className="flex flex-col gap-14">
          {journey.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="flex gap-6">
                <span className="font-display text-5xl font-bold text-menthe/30">{step.number}</span>
                <div>
                  <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-brume-60">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
