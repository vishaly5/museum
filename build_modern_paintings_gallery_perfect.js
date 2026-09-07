const fs = require('fs');
const path = require('path');

const galleryDir = 'd:/validation/museum/ModernPaintingsGallery';
const artworksDataPath = path.join(galleryDir, 'js/artworksData.js');

const fileContent = fs.readFileSync(artworksDataPath, 'utf8');
const window = {};
eval(fileContent);
const galleryTranslations = window.galleryTranslations;

const languages = [
  { id: 'hindi', label: 'हिन्दी (Hindi)' },
  { id: 'english', label: 'English' },
  { id: 'telugu', label: 'తెలుగు (Telugu)' },
  { id: 'urdu', label: 'اردو (Urdu)' },
  { id: 'bengali', label: 'বাংলা (Bengali)' },
  { id: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
  { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
  { id: 'marathi', label: 'मराठी (Marathi)' },
  { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { id: 'tamil', label: 'தமிழ் (Tamil)' }
];

const langOptionsHtml = languages.map(l => 
  `<option value="${l.id}"${l.id === 'hindi' ? ' selected' : ''}>${l.label}</option>`
).join('\n              ');

const itemCount = galleryTranslations.hindi.items ? galleryTranslations.hindi.items.length : 9;

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;');
}

function generatePage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const trans = galleryTranslations[lang] || galleryTranslations.hindi || {};
    const items = trans.items || [];
    const item = items[itemIndex] || items[0] || {};

    const isDisplay = lang === 'hindi' ? 'block' : 'none';
    const isRtl = lang === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
    const imgPath = item.image ? `${relPath}${item.image}` : `${relPath}images/modern-painting-image${itemNum}.jpg`;
    const rawAudio = item.audioSrc ? item.audioSrc.trim() : '';
    
    // Check audio existence on disk
    let audioPath = '';
    if (rawAudio) {
      const audioOnDisk = path.join(galleryDir, rawAudio);
      if (fs.existsSync(audioOnDisk)) {
        audioPath = `${relPath}${encodeURI(rawAudio)}`;
      }
    }
    audioMap[lang] = audioPath;

    const title = item.title || `Item ${itemNum}`;
    const badge = item.accNo ? `${trans.badgeLabel || 'अभिग्रहण संख्या:'} ${item.accNo}` : '';
    const rawDesc = item.desc || item.description || '';
    const desc = rawDesc ? rawDesc.split('\n\n').join('<br><br>') : '';

    langDivsHtml += `
    <div class="bookContentDiv langCnt" id="${lang}" style="display: ${isDisplay};">
      <h2 class="cntHdng" ${isRtl}>${title}</h2>
      <div class="booImgDiv">
        <img src="${imgPath}" width="100%" alt="${escapeAttr(title)}" onerror="this.onerror=null; this.src='${relPath}images/modern-painting-image${itemNum}.jpg';">
      </div>
      <div class="bookCntDiv">
        <p style="margin-bottom: 8px; font-weight: bold; color: #a50309;">${badge}</p>
        <div ${isRtl} style="font-size: 16px; line-height: 1.8; color: #333333;">${desc}</div>
      </div>
    </div>`;
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Modern Paintings Gallery - Item ${itemNum} | Salar Jung Museum</title>
  <link href="${relPath}css/bootstrap.min.css" rel="stylesheet" onerror="this.remove()">
  <link rel="stylesheet" href="${relPath}css/styles.css">
  <style>
    .audioPlayerDiv {
      max-width: 900px;
      margin: 20px auto 0 auto;
      padding: 0 15px;
    }
    .bookContentDiv {
      max-width: 900px;
      margin: 20px auto 40px auto;
      padding: 25px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      box-sizing: border-box;
    }
    .cntHdng {
      font-size: 26px;
      font-weight: 700;
      color: #a50309;
      margin: 0 0 16px 0;
      line-height: 1.3;
    }
    .booImgDiv {
      width: 100%;
      max-height: 480px;
      overflow: hidden;
      border-radius: 10px;
      background: #f9f9f9;
      border: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      padding: 10px;
      box-sizing: border-box;
    }
    .booImgDiv img {
      max-width: 100%;
      max-height: 460px;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="sliderHeaderDiv">
    <div class="container">
      <header>
        <div class="logoLft">
          <a href="${relPath}index.html" class="logo logoTwo"><img src="${relPath}images/logo-moc.png" onerror="this.onerror=null; this.src='${relPath}../MusicalClock/images/logo-moc.png';" alt="Ministry of Culture"></a>
        </div>
        <div class="logoRgt">
          <div class="langDiv">
            <span class="anuIcn"><img src="${relPath}images/logo-anu.png" onerror="this.onerror=null; this.src='${relPath}../MusicalClock/images/logo-anu.png';" alt="Anuvadini"></span>
            <select class="form formLang" id="languageSelector" aria-label="Select language">
              ${langOptionsHtml}
            </select>
          </div>
        </div>
      </header>
    </div>
  </div>

  <main>
    <div class="audioPlayerDiv">
      <audio id="languageAudio" class="w-100" controls preload="metadata"></audio>
      <div id="audioMissingNote" style="display:none; padding:10px 14px; background:#fff4e5; border:1px solid #f0d3a3; border-radius:8px; color:#7a4b00; font-size:14px;">
        🔇 Is bhasha me is vastu ka audio abhi uplabdh nahi hai.
      </div>
    </div>

    ${langDivsHtml}
  </main>

  <footer>
    <p id="footerText">© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a></p>
  </footer>

  <script>
    const languageAudio = document.getElementById("languageAudio");
    const audioMissingNote = document.getElementById("audioMissingNote");
    const audioByLanguage = ${JSON.stringify(audioMap, null, 2)};
    const languageSelector = document.getElementById("languageSelector");

    function selectLanguage(language) {
      languageAudio.pause();
      languageAudio.currentTime = 0;

      const src = audioByLanguage[language];
      if (src && src.trim() !== "") {
        languageAudio.src = src;
        languageAudio.load();
        languageAudio.style.display = "block";
        audioMissingNote.style.display = "none";
      } else {
        languageAudio.src = "";
        languageAudio.style.display = "none";
        audioMissingNote.style.display = "block";
      }

      document.querySelectorAll(".langCnt").forEach(function (content) {
        content.style.display = content.id === language ? "block" : "none";
      });
    }

    if (languageSelector) {
      languageSelector.addEventListener("change", function () {
        selectLanguage(this.value);
      });
      selectLanguage(languageSelector.value || "hindi");
    }
  </script>
</body>
</html>
`;
}

for (let i = 0; i < itemCount; i++) {
  const itemNum = i + 1;
  // item1.html
  const pageDirect = generatePage(i, './');
  fs.writeFileSync(path.join(galleryDir, `item${itemNum}.html`), pageDirect, 'utf8');

  // Item1/index.html
  const itemFolder = path.join(galleryDir, `Item${itemNum}`);
  if (!fs.existsSync(itemFolder)) fs.mkdirSync(itemFolder, { recursive: true });
  const pageSubfolder = generatePage(i, '../');
  fs.writeFileSync(path.join(itemFolder, 'index.html'), pageSubfolder, 'utf8');

  console.log(`Generated item${itemNum}.html and Item${itemNum}/index.html for ModernPaintingsGallery`);
}
