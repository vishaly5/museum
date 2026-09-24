const fs = require('fs');

const contentJS = fs.readFileSync('content.js', 'utf8');
// Evaluating content.js locally
let window = {};
let textileContent = {};
try {
    eval(contentJS);
    if (window.textileContent) {
        textileContent = window.textileContent;
    }
} catch (e) {
    console.log("Error eval contentJS", e);
}

const indexHTML = fs.readFileSync('index.html', 'utf8');
const titleMapsMatch = indexHTML.match(/const titleMaps = (\{[\s\S]*?\});/);
let titleMaps = {};
if (titleMapsMatch) {
    eval('titleMaps = ' + titleMapsMatch[1]);
} else {
    console.log("Could not find titleMaps in index.html");
}

const langs = ['english', 'kannada', 'telugu'];

for (let i = 1; i <= 9; i++) {
    const filename = `item${i}.html`;
    let html = fs.readFileSync(filename, 'utf8');
    
    // find where to inject: before <div class="navBtnDiv"> or </main>
    const injectionPoint = '</main>';
    
    let newBlocks = '';
    
    langs.forEach(lang => {
        // Only inject if not already present
        if (!html.includes(`id="${lang}"`)) {
            const title = titleMaps[`item${i}Title`][lang] || '';
            const desc = textileContent[lang] ? (textileContent[lang][i-1] || '') : '';
            
            const catNoMatches = title.match(/^([a-zA-Z0-9\-]+)/);
            const catNo = catNoMatches ? catNoMatches[1] : '';
            
            newBlocks += `
    <div class="bookContentDiv langCnt" id="${lang}" style="display: none;">
      <h2 class="cntHdng">${title}</h2>
      <div class="booImgDiv">
        <img src="./images/Indian-textile-item${i}.png" alt="${title}"
          onerror="this.onerror=null; this.src='./images/Indian-textile-item${i}.png';">
      </div>
      <div class="bookCntDiv">
        <p style="margin-bottom: 8px; font-weight: bold; color: #a50309;">Catalogue No. ${catNo}</p>
        <div style="font-size: 16px; line-height: 1.8; color: #333333;">${desc}</div>
      </div>
    </div>
`;
        }
    });

    if (newBlocks) {
        html = html.replace(injectionPoint, newBlocks + injectionPoint);
        fs.writeFileSync(filename, html, 'utf8');
        console.log(`Updated ${filename}`);
    } else {
        console.log(`No updates needed for ${filename}`);
    }
}
