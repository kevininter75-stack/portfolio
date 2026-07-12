/** Vérification visuelle finale : badge dispo, section Méthode, highlights, footer, OG image. */
import { chromium } from "playwright";

const OUT = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:3021", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/final-hero.png` });

await page.evaluate(() => document.querySelector("#projets")?.scrollIntoView());
await page.waitForTimeout(300);
await page.evaluate(() => window.scrollBy(0, 400));
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/final-project.png` });

await page.evaluate(() => document.querySelector("#methode")?.scrollIntoView());
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/final-method.png` });

await page.evaluate(() => document.querySelector("footer")?.scrollIntoView());
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/final-footer.png` });

// Image OG générée
await page.goto("http://localhost:3021/opengraph-image", { timeout: 30000 });
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/final-og.png` });

console.log("erreurs console:", errors.length ? errors.filter((e) => !e.includes("404")) : "aucune");
console.log("(le 404 de /_vercel/insights est attendu hors Vercel)");
await browser.close();
