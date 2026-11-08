/**
 * Toutes les données du portfolio centralisées ici :
 * un seul fichier à modifier pour mettre à jour le contenu du site.
 */

export const profile = {
  name: "Kévin Intertaglia",
  firstName: "Kévin",
  role: "Fondateur d'INTER IA — IA en entreprise & sites web",
  location: "Saint-Gilles-les-Bains, La Réunion",
  phone: "+262692319616",
  phoneDisplay: "0692 31 96 16",
  email: "kevin.inter@hotmail.fr",
  github: "https://github.com/kevininter75-stack",
  githubHandle: "kevininter75-stack",
  linkedin: "https://www.linkedin.com/in/kévin-intertaglia-0a3aab221",
  // Photo de profil : déposer le fichier dans /public/images/profile.jpg
  photo: "/images/profile.jpg",
  // CV : déposer le fichier PDF dans /public/cv-kevin-intertaglia.pdf
  cvFile: "/cv-kevin-intertaglia.pdf",
  // Code source de ce portfolio (affiché dans le footer)
  siteRepo: "https://github.com/kevininter75-stack/portfolio",
};


/** Étapes numérotées du parcours, façon storytelling « Le Bichique » */
export const journey = [
  {
    number: "01",
    title: "L'hôtellerie de luxe",
    text: "Le service à l'Hôtel Le Lux 5★, le bar à l'Hôtel Boucan Canot 4★, et aujourd'hui la responsabilité du bar de Ti Mahi Mahi à Saint-Gilles. Avant ça, le bâtiment et l'immobilier. Des années de terrain qui m'ont appris à comprendre comment une équipe travaille vraiment.",
  },
  {
    number: "02",
    title: "Le déclic",
    text: "La curiosité web ne date pas d'hier : première boutique en ligne sur Shopify dès 2016. Puis la reconversion, en autodidacte, vers le développement web et l'IA. Applications, jeux, sites : des produits complets, de l'idée à la mise en ligne.",
  },
  {
    number: "03",
    title: "INTER IA",
    text: "En parallèle de mon poste, j'ai créé INTER IA, ma micro-entreprise. J'aide les entreprises à intégrer l'IA dans leur quotidien (première mission : déployer Claude dans une agence immobilière et de location saisonnière haut de gamme) et je crée des sites web. Je pars du métier et des gens, pas de la technologie.",
  },
];

/** Langues parlées, affichées sous la photo dans la section À propos */
export const languages = [
  "Français — langue maternelle",
  "Créole — bilingue",
  "Anglais — intermédiaire",
];

export type Project = {
  slug: string;
  title: string;
  pitch: string;
  /** Faits concrets et vérifiables mis en avant sur la carte (2-3 max) */
  highlights: string[];
  stack: string[];
  url: string;
  github?: string;
  /** Captures d'écran réelles prises sur le site en ligne */
  screenshots: { src: string; alt: string }[];
  /** true → captures au format téléphone (app mobile) */
  mobile: boolean;
  /** Couleur d'accent de la carte projet */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "declic",
    title: "Déclic",
    pitch:
      "Application de pratique du français conversationnel pour expatriés, avec une IA intégrée au cœur du produit : situations réelles, corrections personnalisées, progression mesurable.",
    highlights: [
      "Coach de correction et scénarios personnalisés générés par l'API Claude",
      "Comptes utilisateurs et données sur Supabase",
      "Automatisations back-office avec n8n",
    ],
    stack: ["Next.js", "API Claude", "Supabase", "n8n", "Vercel"],
    url: "https://declic-liart.vercel.app/",
    github: "https://github.com/kevininter75-stack/declic",
    screenshots: [
      { src: "/images/projects/declic-1.png", alt: "Page d'accueil de Déclic" },
      { src: "/images/projects/declic-2.png", alt: "Interface de conversation de Déclic" },
    ],
    mobile: false,
    accent: "#F2B950",
  },
  {
    slug: "kout-sab",
    title: "Kout Sab'",
    pitch:
      "« Un coup de sabre », en créole. Jeu mobile de fruits péi à trancher, né d'un prototype et devenu un vrai jeu : classement en ligne, défi quotidien, musique maloya, installable sur téléphone.",
    highlights: [
      "Classement en ligne sur Supabase, avec pseudos et garde-fous anti-triche",
      "Défi du jour : une règle et un objectif différents chaque jour",
      "PWA jouable hors ligne + application Android (Capacitor)",
    ],
    stack: ["Phaser 3", "TypeScript", "Supabase", "Vite", "Capacitor", "PWA"],
    url: "https://kevininter75-stack.github.io/fruit-ninja-reunion/",
    github: "https://github.com/kevininter75-stack/fruit-ninja-reunion",
    screenshots: [
      { src: "/images/projects/kout-sab-1.png", alt: "Menu de Kout Sab' : modes Classique, Chrono et Défi du jour" },
      { src: "/images/projects/kout-sab-2.png", alt: "Partie en cours de Kout Sab'" },
    ],
    mobile: true,
    accent: "#7ED957",
  },
  {
    slug: "serene",
    title: "Sérène",
    pitch:
      "PWA de bien-être et de méditation : respirer, se recentrer, suivre sa pratique. Prototypée sur Emergent.sh puis entièrement finalisée avec Claude Code.",
    highlights: [
      "Prototype repris et finalisé de A à Z avec Claude Code",
      "Gamification complète : série, XP, badges, check-in d'humeur",
      "Installable sur téléphone (PWA)",
    ],
    stack: ["PWA", "React", "FastAPI", "Emergent.sh", "Claude Code", "Vercel"],
    url: "https://mindfull-topaz.vercel.app/auth",
    github: "https://github.com/kevininter75-stack/mindfull",
    screenshots: [
      {
        src: "/images/projects/serene-1.png",
        alt: "Accueil de Sérène : suivi de série, progression XP et check-in d'humeur",
      },
      {
        src: "/images/projects/serene-2.png",
        alt: "Parcours guidés de Sérène : programmes TCC gestion du stress et sommeil",
      },
    ],
    mobile: true,
    accent: "#8B9FE8",
  },
  {
    slug: "le-bichique",
    title: "Le Bichique",
    pitch:
      "Site vitrine d'un restaurant fictif au port de Saint-Gilles : un exercice de storytelling en scroll, de motion design et de design system soigné.",
    highlights: [
      "Conçu à partir d'un cahier des charges complet, comme pour un vrai client",
      "Design system, animations GSAP et smooth scroll sur mesure",
      "Le socle technique qui a servi de base à ce portfolio",
    ],
    stack: ["Next.js", "GSAP", "Lenis", "Tailwind CSS"],
    url: "https://le-bichique.vercel.app/",
    github: "https://github.com/kevininter75-stack/le-bichique",
    screenshots: [
      { src: "/images/projects/bichique-1.jpg", alt: "Hero du site Le Bichique" },
      { src: "/images/projects/bichique-2.jpg", alt: "Section storytelling du Bichique" },
    ],
    mobile: false,
    accent: "#FF6B5E",
  },
];

/** Compétences affichées dans la grille */
export const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "Phaser 3",
  "API Claude",
  "n8n",
  "Make",
  "Vite",
  "Capacitor",
  "Git / GitHub",
  "Claude Code",
  "Claude pour les équipes",
];

/** Étapes de la section « Ma méthode » : comment je travaille avec l'IA */
export const method = [
  {
    number: "01",
    title: "Je cadre",
    text: "L'idée, le besoin, le cahier des charges : je définis quoi construire et pourquoi, je découpe le projet en étapes concrètes. C'est le même réflexe qu'au bar — la mise en place avant le service.",
  },
  {
    number: "02",
    title: "Je construis avec l'IA",
    text: "Claude Code écrit vite ; moi je pilote. Choix techniques, revue de chaque fonctionnalité, tests sur de vrais appareils, itérations jusqu'à ce que ce soit propre. L'IA est un accélérateur, pas un pilote automatique.",
  },
  {
    number: "03",
    title: "Je mets en ligne",
    text: "Déploiement en production (Vercel, PWA, stores), corrections après retours, et amélioration continue. Un projet n'est terminé que quand quelqu'un peut s'en servir.",
  },
];

/** Mots du bandeau défilant du hero */
export const marqueeWords = [
  "IA en entreprise",
  "Automatisations",
  "Sites web",
  "Claude",
  "Next.js",
  "La Réunion",
  "Freelance",
];

/** Section « IA en entreprise » : ce que l'IA apporte concrètement */
export const aiBenefits = [
  {
    title: "Du temps rendu aux équipes",
    text: "Comptes rendus, réponses aux emails, devis, fiches produits, saisie : l'IA prépare le premier jet, la personne relit et valide. Les tâches répétitives fondent.",
  },
  {
    title: "Des clients mieux servis",
    text: "Réponses plus rapides et plus soignées, en français comme en anglais. Un atout direct pour le tourisme, la location et le commerce à La Réunion.",
  },
  {
    title: "Vos documents qui répondent",
    text: "Procédures, contrats, catalogues, historiques : l'IA retrouve l'information et la résume en quelques secondes, au lieu de fouiller des dossiers.",
  },
  {
    title: "Des outils qui se parlent",
    text: "Boîte mail, agenda, documents partagés, CRM : des automatisations relient vos outils pour que l'information circule sans copier-coller.",
  },
];

/** Offres freelance, de l'audit à la mise en place */
export const services = [
  {
    number: "01",
    title: "Diagnostic IA",
    text: "On regarde ensemble comment votre équipe travaille au quotidien. Je repère où l'IA fait gagner du temps pour de vrai, et je vous remets une feuille de route claire et priorisée.",
  },
  {
    number: "02",
    title: "Mise en place & formation",
    text: "Déploiement de Claude pour votre équipe : comptes, espaces de travail partagés, consignes adaptées à votre métier, connexion à vos outils. Puis formation, pour que chacun s'en serve bien et en sécurité.",
  },
  {
    number: "03",
    title: "Automatisations sur mesure",
    text: "Des assistants et des flux automatisés branchés sur vos outils (n8n, Make, API Claude) pour supprimer les tâches répétitives qui mangent vos journées.",
  },
  {
    number: "04",
    title: "Sites web",
    text: "Sites vitrines et boutiques en ligne modernes, rapides et bien référencés, conçus pour donner confiance et convertir.",
  },
];
