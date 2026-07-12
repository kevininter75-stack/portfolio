/**
 * Génère les fichiers temporaires en attendant les vrais :
 *  - public/images/profile.jpg  (portrait placeholder avec initiales)
 *  - public/cv-kevin-intertaglia.pdf (PDF minimal « à remplacer »)
 * Usage : node scripts/make-placeholders.mjs
 */
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("public/images", { recursive: true });

// --- Portrait placeholder -------------------------------------------------
const svg = `
<svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#111722"/>
      <stop offset="60%" stop-color="#0a4d68"/>
      <stop offset="100%" stop-color="#4fe3c1"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#g)"/>
  <text x="400" y="480" font-family="Arial, sans-serif" font-size="220" font-weight="bold"
        fill="#e8edf5" text-anchor="middle">KI</text>
  <text x="400" y="580" font-family="Arial, sans-serif" font-size="34"
        fill="#e8edf5" fill-opacity="0.75" text-anchor="middle">Photo à remplacer</text>
  <text x="400" y="630" font-family="Arial, sans-serif" font-size="26"
        fill="#e8edf5" fill-opacity="0.55" text-anchor="middle">public/images/profile.jpg</text>
</svg>`;
await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile("public/images/profile.jpg");
console.log("✓ public/images/profile.jpg");

// --- PDF placeholder --------------------------------------------------------
// PDF minimal assemblé à la main, offsets xref calculés au fur et à mesure.
const chunks = [];
const offsets = [];
let pos = 0;
function push(s) {
  offsets.push(pos);
  chunks.push(s);
  pos += Buffer.byteLength(s, "latin1");
}
const header = "%PDF-1.4\n";
pos = Buffer.byteLength(header, "latin1");
const objs = [
  "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
  "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
  "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n",
];
const text =
  "BT /F1 24 Tf 60 760 Td (CV - Kevin Intertaglia) Tj ET\n" +
  "BT /F1 12 Tf 60 720 Td (Fichier temporaire : remplacer par le vrai CV) Tj ET\n" +
  "BT /F1 12 Tf 60 700 Td (public/cv-kevin-intertaglia.pdf) Tj ET\n";
objs.push(`4 0 obj\n<< /Length ${text.length} >>\nstream\n${text}endstream\nendobj\n`);
objs.push("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
for (const o of objs) push(o);
const xrefPos = pos;
let xref = `xref\n0 6\n0000000000 65535 f \n`;
for (const off of offsets) xref += `${String(off).padStart(10, "0")} 00000 n \n`;
const pdf =
  header +
  chunks.join("") +
  xref +
  `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;
writeFileSync("public/cv-kevin-intertaglia.pdf", Buffer.from(pdf, "latin1"));
console.log("✓ public/cv-kevin-intertaglia.pdf");
