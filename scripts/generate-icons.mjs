import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url));
const sizes = [
  ['public/favicon-32x32.png', 32],
  ['public/apple-touch-icon.png', 180],
  ['public/icon-192.png', 192],
  ['public/icon-512.png', 512],
] ;

for (const [out, size] of sizes) {
  await sharp(svg).resize(size, size).png().toFile(out);
  console.log(`wrote ${out}`);
}
