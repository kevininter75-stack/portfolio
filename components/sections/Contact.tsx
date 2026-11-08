import ArrowUpRight from "@/components/ui/ArrowUpRight";
import Reveal from "@/components/ui/animations/Reveal";
import TextReveal from "@/components/ui/animations/TextReveal";
import Magnetic from "@/components/ui/animations/Magnetic";
import { profile } from "@/lib/data";

/** Contact simple et direct : email, téléphone, GitHub. Pas de formulaire. */
export default function Contact() {
  return (
    <section
      id="contact"
      className="halo scroll-mt-24 border-t border-ligne py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <TextReveal
          as="h2"
          className="font-display mx-auto max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-tight tracking-tight"
        >
          Et si l’IA simplifiait
          <br />
          <span className="text-menthe">votre quotidien</span> ?
        </TextReveal>
        <Reveal>
          <p className="mx-auto mt-6 max-w-xl text-brume-60">
            Parlons de votre métier, de vos outils et du temps que vous aimeriez
            retrouver. Premier échange sans engagement. · {profile.location}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-block rounded-full bg-menthe px-10 py-5 text-lg font-bold text-nuit transition-colors hover:bg-corail hover:text-brume"
            >
              {profile.email}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-8 text-brume-60">
            <a
              href={`tel:${profile.phone}`}
              className="font-semibold transition-colors hover:text-menthe"
            >
              {profile.phoneDisplay}
            </a>
            <span aria-hidden className="text-ligne">
              |
            </span>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors hover:text-menthe"
            >
              github.com/{profile.githubHandle} <ArrowUpRight />
            </a>
            {/* Affiché seulement quand l'URL LinkedIn est renseignée dans lib/data.ts */}
            {profile.linkedin && (
              <>
                <span aria-hidden className="text-ligne">
                  |
                </span>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-colors hover:text-menthe"
                >
                  LinkedIn <ArrowUpRight />
                </a>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
