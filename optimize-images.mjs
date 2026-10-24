import sharp from "sharp";
import fs from "fs";
import path from "path";

sharp.cache(false); // مهم في ويندوز: يمنع قفل ملفات الصور

const dir = "src/assets/images";
const backup = "images-backup";
fs.mkdirSync(backup, { recursive: true });

// صور الخلفيات الكبيرة
const BIG = ["hero", "aboutHeader", "menuHero"];
// صور بتتعرض كبيرة (السلايدر + الأكثر مبيعاً) - بنسيبها 900px
const LARGE = [
  "date_molten_cake", "galaxy_cake", "tiramisu", "honey_cake", "up_down_cake",
  "pudding", "crunch_cheese_cake", "san_sebestian", "frensh_toast",
  "peanut_ice_cream", "mango_ice_cream", "lumin_mojito", "special_redbull",
  "refresh", "hibiscus", "havana", "smoke", "espresso", "spanish_latte",
];

const baseName = (f) => path.parse(f).name.toLowerCase();
const maxWidth = (file) => {
  if (BIG.some((n) => file.startsWith(n))) return 1920;
  if (baseName(file) === "logo") return 512; // اللوجو بيتعرض صغير
  if (LARGE.includes(baseName(file))) return 900;
  return 400; // باقي صور المنيو (بتتعرض 100px)
};

let before = 0;
let after = 0;
let count = 0;
const failed = [];

for (const file of fs.readdirSync(dir)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const filePath = path.join(dir, file);
  const size = fs.statSync(filePath).size;
  const isLogo = baseName(file) === "logo";
  if (size < 200 * 1024 && !isLogo) continue; // الصور الصغيرة سيبها

  try {
    const input = fs.readFileSync(filePath);

    // لو الصورة اتضغطت قبل كده سيبها
    const meta = await sharp(input, { failOn: "none" }).metadata();
    if ((meta.width ?? 0) <= maxWidth(file) && size < 600 * 1024) continue;

    fs.copyFileSync(filePath, path.join(backup, file)); // نسخة احتياطية

    const img = sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: maxWidth(file), withoutEnlargement: true });

    const buf =
      ext === ".png"
        ? await img.png({ quality: 80, compressionLevel: 9, palette: true }).toBuffer()
        : await img.jpeg({ quality: 75, mozjpeg: true }).toBuffer();

    if (buf.length < size) {
      fs.writeFileSync(filePath, buf);
      before += size;
      after += buf.length;
      count++;
      console.log(`${file}: ${(size / 1048576).toFixed(2)}MB -> ${(buf.length / 1048576).toFixed(2)}MB`);
    }
  } catch (err) {
    failed.push(file);
    console.log(`❌ ${file}: ${err.code ?? err.message}`);
  }
}

console.log(
  count
    ? `\nتم ضغط ${count} صورة: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`
    : "\nمفيش صور محتاجة ضغط ✅"
);
if (failed.length) console.log(`\n⚠️ فشلت ${failed.length} صورة:`, failed.join(", "));