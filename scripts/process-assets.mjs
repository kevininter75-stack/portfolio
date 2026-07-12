/**
 * Prépare les assets fournis par Kévin :
 *  - captures Sérène (téléphone) : retrait barre de statut + barre système Android,
 *    redimensionnement cohérent avec les autres captures mobiles ;
 *  - photo de profil : extraite du CV (ovale sur fond blanc), détourée puis posée
 *    sur un dégradé sombre assorti au site.
 */
import sharp from "sharp";

const SCRATCH =
  "C:/Users/admin/AppData/Local/Temp/claude/D--Claude-Kev/bb80ec64-1817-4af5-b3ad-fab09087bb18/scratchpad";

// --- Captures Sérène ---------------------------------------------------------
// Original 1080x2316 : status bar ≈ 100 px en haut, barre système ≈ 150 px en bas.
const crops = [
  ["C:/Users/admin/Desktop/1000025217.jpg", "public/images/projects/serene-1.png"],
  ["C:/Users/admin/Desktop/1000025221.jpg", "public/images/projects/serene-2.png"],
];
for (const [src, dest] of crops) {
  await sharp(src)
    .extract({ left: 0, top: 100, width: 1080, height: 2316 - 100 - 150 })
    .resize({ width: 780 })
    .png({ compressionLevel: 9 })
    .toFile(dest);
  console.log(`✓ ${dest}`);
}

// --- Photo de profil ---------------------------------------------------------
// L'image extraite du CV : 308x415, portrait dans un ovale sur fond blanc.
const SRC = `${SCRATCH}/cv-extract/image-1.png`;
const W = 308;
const H = 415;

// Masque elliptique légèrement rétréci pour couper proprement le bord blanc
const mask = Buffer.from(
  `<svg width="${W}" height="${H}"><ellipse cx="${W / 2}" cy="${H / 2}" rx="${W / 2 - 4}" ry="${H / 2 - 4}" fill="#fff"/></svg>`
);
const oval = await sharp(SRC)
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer();

// Fond 800x1000 : dégradé sombre assorti au site (nuit → lagon → menthe)
const bg = Buffer.from(`
<svg width="800" height="1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111722"/>
      <stop offset="55%" stop-color="#0a4d68"/>
      <stop offset="100%" stop-color="#2ea88f"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
</svg>`);

// Photo agrandie à 620 px de large, centrée
const bigOval = await sharp(oval)
  .resize({ width: 620 })
  .png()
  .toBuffer();
const meta = await sharp(bigOval).metadata();

await sharp(bg)
  .composite([
    {
      input: bigOval,
      left: Math.round((800 - meta.width) / 2),
      top: Math.round((1000 - meta.height) / 2),
    },
  ])
  .jpeg({ quality: 90 })
  .toFile("public/images/profile.jpg");
console.log("✓ public/images/profile.jpg");
