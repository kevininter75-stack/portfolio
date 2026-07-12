/** Vérifie le curseur custom et l'easter egg barman (captures dans le scratchpad). */
import { chromium } from "playwright";

const OUT = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto("http://localhost:3020", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(2000);

// Curseur : on déplace la souris au milieu puis sur un CTA
await page.mouse.move(700, 450);
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/cursor-idle.png` });
await page.mouse.move(262, 702, { steps: 12 }); // CTA « Voir mes projets »
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/cursor-hover.png` });

// Easter egg : descendre au footer et cliquer le cocktail
await page.evaluate(() => document.querySelector("footer")?.scrollIntoView());
await page.waitForTimeout(1500);
const egg = page.getByRole("button", { name: /tournée du barman/i });
await egg.click();
await page.waitForTimeout(900); // pendant la secousse du shaker
await page.screenshot({ path: `${OUT}/egg-shake.png` });
await page.waitForTimeout(1200); // au moment du toast
await page.screenshot({ path: `${OUT}/egg-toast.png` });

console.log("erreurs console:", errors.length ? errors : "aucune");
await browser.close();
