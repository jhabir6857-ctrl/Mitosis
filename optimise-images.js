const sharp = require("sharp");
const path  = require("path");
const fs    = require("fs");

// ─── CONFIG ────────────────────────────────────────────────
const INPUT_DIR  = path.join(__dirname, "raw-images");
const OUTPUT_DIR = path.join(__dirname, "public"); // served at /slide-1.webp etc.
const TARGET_W   = 1920;
const TARGET_H   = 1080;
const QUALITY    = 80;
// ───────────────────────────────────────────────────────────

async function optimise() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const allowed = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff"];
  const files   = fs.readdirSync(INPUT_DIR).filter(f =>
    allowed.includes(path.extname(f).toLowerCase())
  );

  if (!files.length) {
    console.log("⚠  No images found in ./raw-images — drop your images there and re-run.");
    return;
  }

  console.log(`\n🔧  Optimising ${files.length} image(s)  →  1920×1080 WebP @ Q${QUALITY}\n`);

  for (const file of files) {
    const src  = path.join(INPUT_DIR, file);
    const stem = path.parse(file).name;
    const dest = path.join(OUTPUT_DIR, `${stem}.webp`);

    const beforeKB = (fs.statSync(src).size / 1024).toFixed(0);

    await sharp(src)
      .resize(TARGET_W, TARGET_H, { fit: "cover", position: "centre" })
      .webp({ quality: QUALITY })
      .toFile(dest);

    const afterKB = (fs.statSync(dest).size / 1024).toFixed(0);
    const saved   = (((beforeKB - afterKB) / beforeKB) * 100).toFixed(1);

    console.log(
      `  ✅  ${file.padEnd(32)} →  ${stem}.webp  ` +
      `(${beforeKB} KB  →  ${afterKB} KB,  −${saved}%)`
    );
  }

  console.log(`\n🎉  Done!  Files saved to ./public/images/\n`);
}

optimise().catch(err => {
  console.error("❌  Error:", err.message);
  process.exit(1);
});
