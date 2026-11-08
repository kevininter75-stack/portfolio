import Reveal from "@/components/ui/animations/Reveal";
import TextReveal from "@/components/ui/animations/TextReveal";
import Magnetic from "@/components/ui/animations/Magnetic";
import { aiBenefits, services } from "@/lib/data";

/**
 * « IA en entreprise » : ce que l'IA apporte concrètement à une entreprise,
 * puis les offres freelance. Ton direct, sans promesse magique.
 */
export default function Services() {
  return (
    <section id="ia" className="scroll-mt-24 border-t border-ligne">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-menthe">
          IA en entreprise
        </p>
        <TextReveal
          as="h2"
          className="font-display mt-4 max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
        >
          Ce que l&apos;IA peut changer <span className="text-menthe">dans votre quotidien.</span>
        </TextReveal>
        <Reveal>
          <p className="mt-6 max-w-2xl text-brume-60">
            L&apos;IA n&apos;est pas réservée aux grands groupes. Bien intégrée, elle prend en
            charge ce qui est répétitif et laisse à vos équipes ce qui compte : le client, le
            conseil, la décision. L&apos;humain garde toujours la main.
          </p>
        </Reveal>

        {/* Bénéfices concrets */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {aiBenefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-ligne bg-surface p-8 transition-colors hover:border-menthe/40">
                <span aria-hidden className="text-2xl text-menthe">✶</span>
                <h3 className="font-display mt-3 text-xl font-bold">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-brume-60">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Offres */}
        <TextReveal
          as="h3"
          className="font-display mt-28 max-w-3xl text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold leading-tight tracking-tight"
        >
          Comment je vous accompagne<span className="text-corail">.</span>
        </TextReveal>
        <div className="mt-12 divide-y divide-ligne border-y border-ligne">
          {services.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.06}>
              <div className="grid gap-3 py-8 md:grid-cols-[6rem_16rem_1fr] md:gap-8">
                <span className="font-display text-4xl font-bold text-menthe/30">{s.number}</span>
                <h4 className="font-display text-2xl font-bold">{s.title}</h4>
                <p className="leading-relaxed text-brume-60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-menthe/30 bg-surface p-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-brume-60">
              <span className="font-semibold text-brume">On commence petit, on mesure, on étend.</span>{" "}
              Un premier échange suffit pour voir où l&apos;IA vous ferait gagner du temps.
            </p>
            <Magnetic>
              <a
                href="#contact"
                className="inline-block shrink-0 rounded-full bg-menthe px-8 py-4 font-semibold text-nuit transition-colors hover:bg-corail hover:text-brume"
              >
                Parlons de votre projet
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
