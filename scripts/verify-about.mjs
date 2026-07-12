/** Captures de contrôle : section À propos (photo + langues) et carte Sérène. */
import { chromium } from "playwright";

const OUT = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:3020", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

await page.evaluate(() => document.querySelector("#a-propos")?.scrollIntoView());
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/check-about.png` });

await page.evaluate(() => document.querySelector("#projets")?.scrollIntoView());
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollBy(0, 500));
await page.waitForTimeout(2200);
await page.screenshot({ path: `${OUT}/check-serene.png` });

console.log("erreurs console:", errors.length ? errors : "aucune");
await browser.close();
