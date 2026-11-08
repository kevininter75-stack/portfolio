import Image from "next/image";
import Reveal from "@/components/ui/animations/Reveal";
import { projects } from "@/lib/data";

export default function Projects() {
  const featured = projects.find((project) => project.slug === "kout-sab")!;
  const others = projects.filter((project) => project.slug !== "kout-sab");
  return (
    <section
      id="projets"
      className="scroll-mt-24 border-t border-ligne py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Le goût de construire</p>
            <h2 className="font-display mt-4 max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-tight tracking-tight">
              Des idées devenues
              <br />
              <span className="text-menthe">des expériences.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-brume-60">
            Applications, jeux et sites : mon laboratoire pour concevoir, tester
            et livrer des produits complets.
          </p>
        </div>
        <Reveal>
          <article className="featured-project">
            <div className="featured-shots">
              <span className="project-overline">PROJET PHARE / JEU PÉI</span>
              <div className="relative z-10 flex justify-center gap-4 px-5 pt-16 sm:gap-7">
                {featured.screenshots.map((shot, i) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={300}
                    height={650}
                    sizes="(min-width: 1024px) 220px, 38vw"
                    className={`featured-phone ${i === 1 ? "mt-10" : ""}`}
                  />
                ))}
              </div>
              <span className="project-watermark" aria-hidden="true">
                KOUT SAB’
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              <p className="eyebrow text-menthe">De La Réunion, avec du jeu</p>
              <h3 className="font-display mt-5 text-5xl font-medium tracking-tight">
                {featured.title}
              </h3>
              <p className="mt-5 leading-relaxed text-brume-60">
                {featured.pitch}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {featured.highlights.map((fact) => (
                  <li key={fact} className="flex gap-3">
                    <span aria-hidden="true" className="text-menthe">
                      ✓
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-2">
                {featured.stack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <a
                  className="action-primary"
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jouer à Kout Sab’ <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="text-xs text-brume-60 underline underline-offset-4 hover:text-menthe"
                  href={featured.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explorer le code
                </a>
              </div>
            </div>
          </article>
        </Reveal>
        <div className="project-gallery mt-7 grid gap-7 md:grid-cols-2">
          {others.map((project, index) => (
            <Reveal key={project.slug} delay={0.04 * (index % 2)}>
              <article className="gallery-card h-full">
                <a
                  className={`gallery-media ${project.mobile ? "gallery-mobile" : ""}`}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Découvrir ${project.title} (nouvel onglet)`}
                  style={{
                    background: `radial-gradient(ellipse at 50% 90%, ${project.accent}25, transparent 75%), #131923`,
                  }}
                >
                  <Image
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].alt}
                    width={project.mobile ? 300 : 960}
                    height={project.mobile ? 650 : 600}
                    sizes="(min-width: 768px) 500px, 90vw"
                    className="gallery-preview"
                  />
                  <span className="gallery-open" aria-hidden="true">
                    ↗
                  </span>
                </a>
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl font-medium">
                      {project.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-brume-60">
                      {project.stack.includes("Three.js")
                        ? "Jeu 3D"
                        : project.mobile
                          ? "Application"
                          : project.slug === "declic"
                            ? "Application IA"
                            : "Site web"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brume-60">
                    {project.pitch}
                  </p>
                  <details className="project-details mt-5">
                    <summary className="cursor-pointer text-xs font-semibold text-menthe">
                      Ce que j’ai construit
                    </summary>
                    <ul className="mt-4 space-y-2 text-xs leading-relaxed text-brume-60">
                      {project.highlights.map((fact) => (
                        <li key={fact}>{fact}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span className="tech-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </details>
                  <div className="mt-6 flex items-center justify-between border-t border-ligne pt-4 text-xs">
                    <a
                      className="font-semibold hover:text-menthe"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.stack.includes("Three.js")
                        ? "Découvrir le jeu"
                        : "Découvrir le projet"}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brume-60 hover:text-menthe"
                      >
                        Code source
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
