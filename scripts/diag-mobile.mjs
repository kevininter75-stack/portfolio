/** Vérifie sous émulation mobile : Lenis désactivé ? SplitText absent ? erreurs ? */
import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["Pixel 7"] });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto("http://localhost:3021", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);

const state = await page.evaluate(() => ({
  pointerFine: matchMedia("(pointer: fine)").matches,
  lenisActive: document.documentElement.classList.contains("lenis"),
  splitMasks: document.querySelectorAll('[style*="clip-path"], .line-mask, [class*="split"]').length,
  heroTitleHTML: document.querySelector("h1")?.innerHTML.slice(0, 120),
}));
console.log(JSON.stringify(state, null, 2));
console.log("erreurs:", errors.length ? errors : "aucune");
await browser.close();
