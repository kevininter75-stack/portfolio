/**
 * Extrait du CV PDF : le texte (pour récupérer les infos) et les images
 * embarquées (pour récupérer la photo de profil).
 * Usage : node scripts/extract-cv.mjs "<chemin du pdf>" "<dossier de sortie>"
 */
import { getDocument, OPS } from "pdfjs-dist/legacy/build/pdf.mjs";
import { writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

const [, , pdfPath, outDir] = process.argv;
mkdirSync(outDir, { recursive: true });

const doc = await getDocument({ url: pdfPath, useSystemFonts: true }).promise;
console.log(`pages: ${doc.numPages}`);

let imgIndex = 0;
for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);

  // --- texte ---
  const tc = await page.getTextContent();
  const text = tc.items.map((i) => i.str).join(" ");
  writeFileSync(`${outDir}/page-${p}.txt`, text, "utf8");

  // --- images embarquées ---
  const ops = await page.getOperatorList();
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] !== OPS.paintImageXObject) continue;
    const name = ops.argsArray[i][0];
    try {
      const img = await new Promise((resolve, reject) => {
        page.objs.get(name, (o) => (o ? resolve(o) : reject(new Error("null"))));
      });
      if (!img?.data || !img.width || img.width < 80 || img.height < 80) continue;
      imgIndex++;
      const { width, height, data } = img;
      // data peut être RGB ou RGBA selon le PDF
      const channels = data.length / (width * height);
      if (channels !== 3 && channels !== 4) continue;
      await sharp(Buffer.from(data), { raw: { width, height, channels } })
        .png()
        .toFile(`${outDir}/image-${imgIndex}.png`);
      console.log(`image-${imgIndex}.png (${width}x${height})`);
    } catch {
      // objet image non résolu : on ignore
    }
  }
}
console.log("Terminé.");
