/**
 * Vérifie que les animations au scroll sont rejouables :
 * descente complète → remontée en haut → l'étape 01 doit être re-masquée,
 * puis re-descente → elle doit se ré-animer.
 */
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:3020", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

const getOpacity = () =>
  page.evaluate(() => {
    const step = document.querySelector("#a-propos .flex.flex-col.gap-14 > div");
    return getComputedStyle(step).opacity;
  });

// Descente complète par paliers (laisse les triggers se jouer)
for (let y = 0; y <= 7200; y += 900) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(350);
}
await page.waitForTimeout(1200);
console.log("en bas — étape 01 jouée puis hors écran");

// Remontée complète
for (let y = 7200; y >= 0; y -= 900) {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(350);
}
await page.waitForTimeout(1200);
console.log("remonté en haut — opacité étape 01 (attendu 0):", await getOpacity());

// Re-descente vers l'À propos : l'animation doit se rejouer
await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "smooth" }));
await page.waitForTimeout(2500);
console.log("redescendu sur À propos — opacité étape 01 (attendu 1):", await getOpacity());

console.log("erreurs console:", errors.length ? errors : "aucune");
await browser.close();
