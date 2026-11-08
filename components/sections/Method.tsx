import ArrowUpRight from "@/components/ui/ArrowUpRight";
import Reveal from "@/components/ui/animations/Reveal";
import TextReveal from "@/components/ui/animations/TextReveal";
import { method, profile } from "@/lib/data";

/**
 * « Ma méthode » : transparence sur le travail avec l'IA — ce que je pilote,
 * ce que l'IA accélère.
 */
export default function Method() {
  return (
    <section id="methode" className="scroll-mt-24 border-t border-ligne">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <TextReveal
          as="h2"
          className="font-display max-w-3xl text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight"
        >
          Une IA utile.
          <br />
          <span className="text-menthe">Une équipe qui se l’approprie.</span>
        </TextReveal>
        <Reveal>
          <p className="mt-6 max-w-xl text-brume-60">
            Un déploiement progressif, construit avec les personnes qui
            utiliseront les outils chaque jour.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {method.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-ligne bg-surface/50 p-7 transition-colors hover:border-menthe/40">
                <p className="font-display text-4xl font-medium text-menthe/60">
                  {step.number}
                </p>
                <h3 className="font-display mt-4 text-2xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-brume-60">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <p className="text-sm text-brume-60">
            Transparence totale :{" "}
            <a
              href={profile.siteRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-menthe underline-offset-4 hover:underline"
            >
              le code de ce portfolio est public <ArrowUpRight />
            </a>{" "}
            — structure, commits, choix techniques : tout se visite.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
