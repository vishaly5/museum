const fs = require('fs');
const path = require('path');

const galleryDir = 'd:/validation/museum/JadeGallery';
const itemImages = [];

for (let i = 1; i <= 13; i++) {
  const file = path.join(galleryDir, `item${i}.html`);
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/class="booImgDiv"[\s\S]*?src=["']\.\/images\/([^"']+)["']/);
    itemImages.push(match ? match[1] : `item${i}.png`);
  } else {
    itemImages.push(`item${i}.png`);
  }
}

console.log('Artwork Images:', JSON.stringify(itemImages, null, 2));
