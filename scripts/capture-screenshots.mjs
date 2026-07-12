/**
 * Prend de vraies captures d'écran des 4 projets en ligne avec Playwright.
 * Usage : node scripts/capture-screenshots.mjs
 * Les images sont écrites dans public/images/projects/.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "public/images/projects";
mkdirSync(OUT, { recursive: true });

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1440, height: 900 };

/** [nom de fichier, url, viewport, scroll vertical en px avant capture] */
const shots = [
  ["serene-1", "https://mindfull-topaz.vercel.app/auth", MOBILE, 0],
  ["declic-1", "https://declic-liart.vercel.app/", DESKTOP, 0],
  ["declic-2", "https://declic-liart.vercel.app/", DESKTOP, 900],
  ["fruit-ninja-1", "https://kevininter75-stack.github.io/fruit-ninja-reunion/", MOBILE, 0],
  ["bichique-1", "https://le-bichique.vercel.app/", DESKTOP, 0],
  ["bichique-2", "https://le-bichique.vercel.app/", DESKTOP, 2400],
];

const browser = await chromium.launch();

for (const [name, url, viewport, scrollY] of shots) {
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: 2, // captures nettes (retina)
    isMobile: viewport === MOBILE,
    hasTouch: viewport === MOBILE,
  });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    // networkidle peut ne jamais arriver (jeu Phaser, polling…) : on continue quand même
  }
  await page.waitForTimeout(3500); // laisse le temps aux animations d'entrée de se jouer
  if (scrollY > 0) {
    await page.mouse.wheel(0, scrollY);
    await page.waitForTimeout(2500); // laisse les animations au scroll se terminer
  }
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`✓ ${name}.png (${url})`);
  await page.close();
}

await browser.close();
console.log("Terminé.");
