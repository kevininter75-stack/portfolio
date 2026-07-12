/**
 * Toutes les données du portfolio centralisées ici :
 * un seul fichier à modifier pour mettre à jour le contenu du site.
 */

export const profile = {
  name: "Kévin Intertaglia",
  firstName: "Kévin",
  role: "Développeur web & IA en reconversion",
  location: "Saint-Gilles-les-Bains, La Réunion",
  phone: "+262692319616",
  phoneDisplay: "0692 31 96 16",
  email: "kevin.inter75@gmail.com",
  github: "https://github.com/kevininter75-stack",
  githubHandle: "kevininter75-stack",
  // Photo de profil : déposer le fichier dans /public/images/profile.jpg
  photo: "/images/profile.jpg",
  // CV : déposer le fichier PDF dans /public/cv-kevin-intertaglia.pdf
  cvFile: "/cv-kevin-intertaglia.pdf",
};

/** Étapes numérotées du parcours, façon storytelling « Le Bichique » */
export const journey = [
  {
    number: "01",
    title: "L'hôtellerie de luxe",
    text: "Bar manager à l'Hôtel Boucan Canot 4★ puis à l'Hôtel Le Lux 5★. Dix ans de service exigeant : rigueur, sens du détail, gestion d'équipe et obsession de l'expérience client.",
  },
  {
    number: "02",
    title: "Le déclic",
    text: "Reconversion autodidacte vers le développement web et l'IA. Avec Claude Code comme copilote, je construis des produits complets : de l'idée au déploiement, en passant par le code.",
  },
  {
    number: "03",
    title: "La suite",
    text: "Aujourd'hui à Ti Mahi Mahi (Saint-Gilles-les-Bains), je candidate à l'alternance développement web & IA chez Beforma pour transformer cette pratique en diplôme reconnu.",
  },
];

export type Project = {
  slug: string;
  title: string;
  pitch: string;
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
    slug: "serene",
    title: "Sérène",
    pitch:
      "PWA de bien-être et de méditation : respirer, se recentrer, suivre sa pratique. Prototypée sur Emergent.sh puis entièrement finalisée avec Claude Code.",
    stack: ["PWA", "React", "FastAPI", "Emergent.sh", "Claude Code", "Vercel"],
    url: "https://mindfull-topaz.vercel.app/auth",
    github: "https://github.com/kevininter75-stack/mindfull",
    screenshots: [
      { src: "/images/projects/serene-1.png", alt: "Écran d'accueil de Sérène" },
    ],
    mobile: true,
    accent: "#8B9FE8",
  },
  {
    slug: "declic",
    title: "Déclic",
    pitch:
      "Application de pratique du français conversationnel pour expatriés : des situations réelles, des dialogues guidés, une progression mesurable.",
    stack: ["Next.js", "Supabase", "n8n", "Vercel"],
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
    slug: "fruit-ninja-reunion",
    title: "Fruit Ninja Réunion",
    pitch:
      "Jeu mobile façon fruit-slicer aux couleurs de La Réunion : letchis, mangues et ananas Victoria à trancher, packagé en PWA et en app native.",
    stack: ["Phaser 3", "TypeScript", "Vite", "Capacitor", "PWA"],
    url: "https://kevininter75-stack.github.io/fruit-ninja-reunion/",
    github: "https://github.com/kevininter75-stack/fruit-ninja-reunion",
    screenshots: [
      { src: "/images/projects/fruit-ninja-1.png", alt: "Écran titre de Fruit Ninja Réunion" },
      { src: "/images/projects/fruit-ninja-2.png", alt: "Partie en cours de Fruit Ninja Réunion" },
    ],
    mobile: true,
    accent: "#7ED957",
  },
  {
    slug: "le-bichique",
    title: "Le Bichique",
    pitch:
      "Site vitrine d'un restaurant fictif au port de Saint-Gilles : un exercice de storytelling en scroll, de motion design et de design system soigné.",
    stack: ["Next.js", "GSAP", "Lenis", "Tailwind CSS"],
    url: "https://le-bichique.vercel.app/",
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
  "Three.js",
  "n8n",
  "Vite",
  "Capacitor",
  "Git / GitHub",
  "Claude Code",
];

/** Mots du bandeau défilant du hero */
export const marqueeWords = [
  "Next.js",
  "TypeScript",
  "Claude Code",
  "La Réunion",
  "Idée → Code → Déploiement",
  "Dev assisté par IA",
];
