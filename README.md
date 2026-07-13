# Portfolio — Kévin Intertaglia

Site portfolio personnel : vitrine de mon parcours (hôtellerie de luxe → développement web & IA) et de mes 4 projets construits avec Claude Code.

**Stack** : Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Lenis (smooth scroll) · Framer Motion (`motion`).

## Démarrer en local

```bash
npm install
npm run dev -- --port 3020
```

Puis ouvrir http://localhost:3020.

## À tenir à jour

- **Contenu** : tout est centralisé dans `lib/data.ts` (textes, projets, liens).
- **Photo de profil** : `public/images/profile.jpg` contient la photo extraite du CV ; la remplacer par une photo dédiée de meilleure qualité quand disponible.
- **CV** : penser à faire correspondre l'email du CV PDF avec celui du site.

Tout le contenu du site (textes, projets, compétences, liens) est centralisé dans **`lib/data.ts`**.

## Déployer sur Vercel

1. Pousser le repo sur GitHub (compte `kevininter75-stack`).
2. Sur [vercel.com](https://vercel.com) : **Add New → Project**, importer le repo, cliquer **Deploy** (aucun réglage nécessaire, Next.js est détecté automatiquement).
3. Une fois l'URL définitive connue (ex. `kevin-intertaglia.vercel.app`), vérifier qu'elle correspond bien à `metadataBase` dans `app/layout.tsx` ainsi qu'aux URLs de `app/robots.ts` et `app/sitemap.ts`.

## Scripts utiles

- `scripts/capture-screenshots.mjs` — reprend de vraies captures d'écran des 4 projets en ligne (Playwright).
- `scripts/capture-extra.mjs` / `scripts/capture-fruit-ninja-game.mjs` — captures avec interaction (page scénarios de Déclic, partie de Fruit Ninja) + compression.
- `scripts/make-placeholders.mjs` — régénère la photo et le CV placeholder.

## Structure

```
app/                  layout (fonts, SEO, JSON-LD), page, robots, sitemap
components/
  sections/           Hero, About, Projects, Skills, Contact, Footer
  ui/                 Nav, ProjectCard (carte réutilisable des 4 projets)
  ui/animations/      Marquee, Reveal, TextReveal, Parallax, ImageReveal, Magnetic
  providers/          SmoothScroll (Lenis + ScrollTrigger)
lib/                  data.ts (contenu), gsap.ts, useReducedMotion.ts
public/images/        photo de profil + captures des projets
```

---

Fait avec [Claude Code](https://claude.com/claude-code) — évidemment.
