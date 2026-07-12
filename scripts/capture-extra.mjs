/**
 * Captures complémentaires nécessitant une interaction :
 *  - declic-2 : la liste des scénarios (clic sur « Choisir un scénario »)
 *  - fruit-ninja-2 : une partie en cours (swipe sur le fruit CLASSIQUE)
 * Puis compression de toutes les captures (resize + PNG optimisé) avec sharp.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { readdirSync, renameSync } from "node:fs";

const OUT = "public/images/projects";
const browser = await chromium.launch();

// --- Déclic : page des scénarios -------------------------------------------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto("https://declic-liart.vercel.app/", { waitUntil: "networkidle", timeout: 45000 });
  await page.getByText("Choisir un scénario").first().click();
  await page.waitForTimeout(4000);
  await page.screenshot({ path: `${OUT}/declic-2.png` });
  console.log("✓ declic-2.png →", page.url());
  await page.close();
}

// --- Fruit Ninja : partie en cours ------------------------------------------
{
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto("https://kevininter75-stack.github.io/fruit-ninja-reunion/", {
    waitUntil: "load",
    timeout: 45000,
  });
  await page.waitForTimeout(4000);
  // Swipe en diagonale sur le fruit « CLASSIQUE » (au centre, ~40% de hauteur)
  await page.mouse.move(140, 480);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(140 + i * 15, 480 - i * 12);
    await page.waitForTimeout(16);
  }
  await page.mouse.up();
  await page.waitForTimeout(2200); // la partie démarre, des fruits sont lancés
  await page.screenshot({ path: `${OUT}/fruit-ninja-2.png` });
  console.log("✓ fruit-ninja-2.png");
  await page.close();
}

await browser.close();

// --- Compression : resize aux dimensions d'affichage réelles ----------------
for (const file of readdirSync(OUT).filter((f) => f.endsWith(".png"))) {
  const path = `${OUT}/${file}`;
  const tmp = `${path}.tmp`;
  const meta = await sharp(path).metadata();
  const target = meta.width > meta.height ? 1600 : 800; // desktop vs mobile
  await sharp(path)
    .resize({ width: Math.min(target, meta.width) })
    .png({ compressionLevel: 9, quality: 82, palette: false })
    .toFile(tmp);
  renameSync(tmp, path);
  console.log(`✓ compressé ${file}`);
}
console.log("Terminé.");
