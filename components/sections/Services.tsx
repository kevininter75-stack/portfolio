import Reveal from "@/components/ui/animations/Reveal";
import { aiBenefits, services } from "@/lib/data";

export default function Services() {
  return (
    <section
      id="ia"
      className="scroll-mt-24 border-t border-ligne py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-7 md:grid-cols-[1.25fr_1fr] md:items-end">
          <div>
            <p className="eyebrow">Votre métier, le point de départ</p>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.12] tracking-tight">
              Moins de tâches répétitives.
              <br />
              <span className="text-menthe">Plus de place à l’humain.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-brume-60">
            Je pars de vos habitudes et de vos outils pour intégrer une IA utile
            au quotidien. L’équipe garde la main sur les décisions et les
            réponses envoyées.
          </p>
        </div>
        <div className="benefit-grid mt-12 grid gap-4 md:grid-cols-2">
          {aiBenefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i % 2) * 0.07}>
              <div
                className={`benefit-card h-full ${i === 0 ? "benefit-highlight" : ""}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="micro-label">0{i + 1} / USAGE</span>
                  <span className="benefit-symbol" aria-hidden="true">
                    {["↗", "◎", "≡", "⇄"][i]}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium">
                  {benefit.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-brume-60">
                  {benefit.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mission-panel mt-12 grid gap-8 rounded-3xl border border-menthe/20 p-7 sm:p-10 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Une première mission de terrain</p>
            <h3 className="font-display mt-5 text-3xl font-medium leading-tight">
              L’IA dans une agence
              <br />
              immobilière & touristique.
            </h3>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-brume-60">
              Pour une agence d’immobilier et de location saisonnière haut de
              gamme, je mets en place un assistant personnel par salarié : tri
              des mails, synthèse de plusieurs outils et propositions de
              réponses aux voyageurs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Un assistant par poste",
                "Des outils connectés",
                "L’équipe valide",
              ].map((label) => (
                <span className="tech-tag" key={label}>
                  {label}
                </span>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-7 inline-block text-sm font-semibold text-menthe hover:underline"
            >
              Et dans votre entreprise ? <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mt-20 mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-3xl font-medium tracking-tight">
            Un accompagnement de bout en bout.
          </h3>
          <span className="micro-label">Du diagnostic à l’autonomie</span>
        </div>
        <div className="service-list divide-y divide-ligne border-y border-ligne">
          {services.map((service) => (
            <Reveal key={service.number}>
              <div className="grid gap-3 py-7 md:grid-cols-[3rem_17rem_1fr] md:gap-6">
                <span className="micro-label text-menthe">
                  {service.number}
                </span>
                <h4 className="font-display text-xl font-medium">
                  {service.title}
                </h4>
                <p className="max-w-xl text-sm leading-relaxed text-brume-60">
                  {service.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
