import { profile } from "@/lib/data";
import WorkflowDemo from "@/components/ui/WorkflowDemo";

export default function Hero() {
  return (
    <section className="hero-stage relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16">
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-6">
        <p className="eyebrow">
          <span className="status-dot" /> Intégration IA · La Réunion
        </p>
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <div>
            <h1 className="font-display text-[clamp(2.8rem,5.7vw,5.1rem)] font-medium leading-[1.04] tracking-[-0.055em]">
              L’IA, au service
              <br />
              de <span className="text-menthe">vos équipes.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-brume-60">
              Des assistants adaptés à chaque métier. Des outils connectés. Du
              temps pour ce qui compte.
            </p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-brume-60">
              Avec INTER IA, j’accompagne votre entreprise du premier besoin à
              la prise en main par vos équipes.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a className="action-primary" href="#contact">
                Parlons de votre quotidien <span aria-hidden="true">→</span>
              </a>
              <a className="action-secondary" href="#ia">
                Découvrir mon approche <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="mt-9 flex items-center gap-3 border-t border-ligne pt-5 text-xs text-brume-60">
              <span className="brand-mini" aria-hidden="true">
                KI
              </span>
              <span>
                {profile.name}
                <br />
                <span className="text-brume">
                  Fondateur d’INTER IA · Une approche de terrain
                </span>
              </span>
            </div>
          </div>
          <WorkflowDemo />
        </div>
        <div className="hero-foot mt-16 flex flex-wrap justify-between gap-4 border-t border-ligne pt-6 text-xs text-brume-60">
          <span>Comprendre. Connecter. Accompagner.</span>
          <span>
            Assistants IA <span className="mx-3 text-menthe">/</span>{" "}
            Automatisations <span className="mx-3 text-menthe">/</span> Sites
            web
          </span>
        </div>
      </div>
    </section>
  );
}
