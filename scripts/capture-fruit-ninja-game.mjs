/**
 * Nouvelle tentative pour fruit-ninja-2 : viewport mobile mais entrée souris
 * (sans émulation tactile), swipe horizontal à travers le fruit CLASSIQUE.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { renameSync } from "node:fs";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
await page.goto("https://kevininter75-stack.github.io/fruit-ninja-reunion/", {
  waitUntil: "load",
  timeout: 45000,
});
await page.waitForTimeout(4000);

// Un simple clic sur le fruit CLASSIQUE sélectionne le mode (pointerup)
await page.mouse.click(195, 420);
await page.waitForTimeout(2500); // transition vers la partie

// Rafale de captures pendant qu'on tranche : on garde ensuite la meilleure
for (let shot = 0; shot < 6; shot++) {
  // Coup de lame en diagonale au milieu de l'écran
  await page.mouse.move(80, 560);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(80 + i * 30, 560 - i * 25);
    await page.waitForTimeout(10);
  }
  await page.mouse.up();
  await page.waitForTimeout(500);
  const path = `public/images/projects/fruit-ninja-2${String.fromCharCode(97 + shot)}.png`;
  await page.screenshot({ path });
  const tmp = `${path}.tmp`;
  await sharp(path).resize({ width: 780 }).png({ compressionLevel: 9 }).toFile(tmp);
  renameSync(tmp, path);
  console.log(`✓ ${path}`);
}
await browser.close();
