const fs = require('fs');
const path = require('path');

const galleryDir = 'd:/validation/museum/KashmiriGallery';
const itemImages = [];

for (let i = 1; i <= 9; i++) {
  const file = path.join(galleryDir, `item${i}.html`);
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const match = content.match(/class="booImgDiv"[\s\S]*?src=["']\.\/images\/([^"']+)["']/);
    itemImages.push(match ? match[1] : `item${i}.jpg`);
  } else {
    itemImages.push(`item${i}.jpg`);
  }
}

console.log('Kashmiri Artwork Images:', JSON.stringify(itemImages, null, 2));
