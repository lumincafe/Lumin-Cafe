import fs from "fs";

const file = "src/assets/images.ts";
const dir = "src/assets/images";
const files = fs.readdirSync(dir);
const noExt = (f) => f.replace(/\.[^.]+$/, "").toLowerCase();

let s = fs.readFileSync(file, "utf8");
let fixed = 0;
const unresolved = [];

s = s.replace(/from "\.\/images\/([^"]+)"/g, (full, name) => {
  if (files.includes(name)) return full; // الملف موجود تمام

  const base = noExt(name);
  // نفس الاسم بأي امتداد أو بحروف مختلفة، أو امتداد مكرر (x.jpg.jpg)
  const found =
    files.find((f) => noExt(f) === base) ??
    files.find((f) => f.toLowerCase().startsWith(base + "."));

  if (found) {
    fixed++;
    console.log(`✔ ${name}  ->  ${found}`);
    return `from "./images/${found}"`;
  }
  unresolved.push(name);
  return full;
});

if (fixed) fs.writeFileSync(file, s);

console.log(fixed ? `\nتم تصليح ${fixed} سطر في images.ts` : "\nمفيش سطور اتصلحت");
for (const name of unresolved) {
  const prefix = name.slice(0, 3).toLowerCase();
  const similar = files.filter((f) => f.toLowerCase().startsWith(prefix));
  console.log(`❌ لسه مفقود: ${name}` + (similar.length ? `   (ملفات شبهه: ${similar.join(", ")})` : "   (مفيش ملف شبهه خالص)"));
}