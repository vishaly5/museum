const fs = require('fs');
const path = require('path');

const galleryDir = 'd:/validation/museum/JadeGallery';
const contentJsPath = path.join(galleryDir, 'js/content.js');
const appJsPath = path.join(galleryDir, 'js/app.js');

// Load window.jadeItemsData
const contentJsStr = fs.readFileSync(contentJsPath, 'utf8');
const window = {};
eval(contentJsStr);
const jadeItemsData = window.jadeItemsData;

const languages = [
  { id: 'hindi', label: 'हिन्दी (Hindi)' },
  { id: 'english', label: 'English' },
  { id: 'telugu', label: 'తెలుగు (Telugu)' },
  { id: 'tamil', label: 'தமிழ் (Tamil)' },
  { id: 'marathi', label: 'मराठी (Marathi)' },
  { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
  { id: 'bengali', label: 'বাংলা (Bengali)' },
  { id: 'urdu', label: 'اردو (Urdu)' },
  { id: 'gujarati', label: 'ગુજરાતી (Gujarati)' }
];

const langOptionsHtml = languages.map(l => 
  `<option value="${l.id}"${l.id === 'hindi' ? ' selected' : ''}>${l.label}</option>`
).join('\n              ');

const itemImages = [
  "archer-ring.png",
  "casket.png",
  "clock.png",
  "figure-of-parrot.png",
  "FRUIT-KNIFE-OF-NOOR-JAHAN.png",
  "jambia.png",
  "khanjarali.png",
  "necklace.png",
  "pen-and-ink-stand.png",
  "peshqabz.png",
  "ScreenShapedPhotoFrame.png",
  "spiceboxwithtray.png",
  "(knife)ofEmperorJahangir.png"
];

const itemAudioByLanguage = {
  hindi: [
    "hindi-तीरंदाजी की अंगूठी.wav",
    "hindi- संदूकची.wav",
    "hindi-घड़ी.wav",
    "hindi-तोते की आकृति.wav",
    "hindi-कर्द (नूरजहाँ की फल काटने की छुरी).wav",
    "hindi- जम्बिया.wav",
    "hindi-खंजरअली.wav",
    "hindi-हार.wav",
    "hindi-कलम और दवात रखने का आधार.wav",
    "hindi-पेशकब्ज़.wav",
    "hindi-परदे के आकार का फोटो फ्रेम.wav",
    "hindi- ट्रे के साथ मसाला डिब्बा.wav",
    "hindi- सम्राट जहाँगीर की शिकार की छुरी.wav"
  ],
  english: [
    "hindi-तीरंदाजी की अंगूठी.wav",
    "hindi- संदूकची.wav",
    "hindi-घड़ी.wav",
    "hindi-तोते की आकृति.wav",
    "hindi-कर्द (नूरजहाँ की फल काटने की छुरी).wav",
    "hindi- जम्बिया.wav",
    "hindi-खंजरअली.wav",
    "hindi-हार.wav",
    "hindi-कलम और दवात रखने का आधार.wav",
    "hindi-पेशकब्ज़.wav",
    "hindi-परदे के आकार का फोटो फ्रेम.wav",
    "hindi- ट्रे के साथ मसाला डिब्बा.wav",
    "hindi- सम्राट जहाँगीर की शिकार की छुरी.wav"
  ],
  bengali: [
    "bengali-ArcheryRing.wav",
    "bengali-Casket.wav",
    "bengali-Clock.wav",
    "bengali-Figure-of-a-Parrot_.wav",
    "bengali-fruit-knife-of-Noor-Jahan).wav",
    "bengali-Jambia.wav",
    "bengali-casket_.wav",
    "bengali-Necklace.wav",
    "bengali-Pen-and-ink-stand.wav",
    "bengali-Peshqabz.wav",
    "bengali-ScreenShapedPhotoFrame.wav",
    "bengali-SpiceBoxwithTray.wav",
    "bengali-(knife)ofEmperorJahangir.wav"
  ],
  gujarati: [
    "guj- Archery Ring.wav",
    "guj-Casket.wav",
    "guj-Clock.wav",
    "guj- Figure of a Parrot.wav",
    "guj-Kard (fruit knife of Noor Jahan).wav",
    "guj- Jambia.wav",
    "guj- Khanjarali.wav",
    "guj-Necklace.wav",
    "guj- Pen and ink stand.wav",
    "guj-Peshqabz.wav",
    "guj-Screen Shaped Photo Frame.wav",
    "guj- Spice Box with Tray.wav",
    "guj-Kard (knife) of Emperor Jahangir.wav"
  ],
  kannada: [
    "kannada-Acc No XLIX-1338 Archery Ring-.wav",
    "kannada-Acc No ACQ-90-39 Casket -.wav",
    "kannada-Acc No ACQ-63-89 Clock-.wav",
    "kannada-Acc No XLIX-188 Figure of a Parrot -.wav",
    "kannada-Acc No XLIX- 312 Kard (fruit knife of Noor Jahan)-.wav",
    "kannada-Acc No XLIX-324 Jambia-.wav",
    "kannada-Acc No XLIX-329 Khanjarali-.wav",
    "kannada-Acc No XLIX-1520 Necklace -.wav",
    "kannada-Acc No CS-IV-128 Pen and ink stand-.wav",
    "kannada-Acc No XLIX-323 Peshqabz -.wav",
    "kannada-Acc No XLIX-1636 Screen Shaped Photo Frame -.wav",
    "kannada-Acc No XLIX-205 Spice Box with Tray-.wav",
    "kannada-Acc No XLIX-311 Kard (knife) of Emperor Jahangir-.wav"
  ],
  marathi: [
    "mar-Archery Ring.wav",
    "mar-Casket.wav",
    "mar-Clock.wav",
    "mar-Figure of a Parrot.wav",
    "mar-Kard (fruit knife of Noor Jahan).wav",
    "mar-Jambia.wav",
    "mar-Khanjarali.wav",
    "mar-Necklace.wav",
    "mar-Pen and ink stand.wav",
    "mar-Peshqabz.wav",
    "mar-Screen Shaped Photo Frame.wav",
    "mar-Spice Box with Tray.wav",
    "mar-Kard (knife) of Emperor Jahangir.wav"
  ],
  odia: [
    "odia-Acc No XLIX-1338 Archery Ring.wav",
    "odia-Acc No ACQ-90-39 Casket.wav",
    "odia-Acc No ACQ-63-89 Clock.wav",
    "odia-Acc No XLIX-188 Figure of a Parrot.wav",
    "odia-Acc No XLIX- 312 Kard (fruit knife of Noor Jahan).wav",
    "odia-Acc No XLIX-324 Jambia.wav",
    "odia-Acc No XLIX-329 Khanjarali.wav",
    "odia-Acc No XLIX-1520 Necklace.wav",
    "odia-Acc No CS-IV-128 Pen and ink stand.wav",
    "odia-Acc No XLIX-323 Peshqabz.wav",
    "odia-Acc No XLIX-1636 Screen Shaped Photo Frame.wav",
    "odia-Acc No XLIX-205 Spice Box with Tray.wav",
    "odia-Acc No XLIX-311 Kard (knife) of Emperor Jahangir.wav"
  ],
  tamil: [
    "tamil-Archery Ring.wav",
    "tamil-Casket.wav",
    "tamil-Clock.wav",
    "tamil-Figure of a Parrot.wav",
    "tamil- Kard (fruit knife of Noor Jahan).wav",
    "tamil-Jambia.wav",
    "tamil- Khanjarali.wav",
    "tamil-Necklace.wav",
    "tamil-Pen and ink stand.wav",
    "tamil-Peshqabz.wav",
    "tam-Screen Shaped Photo Frame.wav",
    "tamil-Spice Box with Tray.wav",
    "tamil- Kard (knife) of Emperor Jahangir.wav"
  ],
  telugu: [
    "Telugu_Archery Ring_Female.wav",
    "Telugu_Casket_Female.wav",
    "Telugu_ACQ-63-89 Clock_Female.wav",
    "Telugu_Figure of a Parrot_Female.wav",
    "Telugu_Kard (fruit knife of Noor Jahan_Female.wav",
    "Telugu_Jambia_Female.wav",
    "Telugu_Jambia_Female.wav",
    "Telugu_Necklace_Female.wav",
    "Telugu_Pen and ink stand_Female.wav",
    "Telugu_Peshqabz_Female.wav",
    "Telugu_Screen Shaped Photo Frame_Female.wav",
    "Telugu_Spice Box with Tray_Female.wav",
    "Telugu_Kard (knife) of Emperor Jahangir_Female.wav"
  ],
  urdu: [
    "urdu-Archery Ring.wav",
    "urdu-Casket.wav",
    "urdu-Clock.wav",
    "urdu-Figure of a Parrot.wav",
    "urdu-Kard (fruit knife of Noor Jahan).wav",
    "urdu-Jambia.wav",
    "urdu-Khanjarali.wav",
    "urdu-Necklace.wav",
    "urdu-Pen and ink stand.wav",
    "urdu-Peshqabz.wav",
    "urdu-Screen Shaped Photo Frame.wav",
    "urdu-Spice Box with Tray.wav",
    "urdu-Kard (knife) of Emperor Jahangir.wav"
  ],
  malayalam: [
    "malayalam/Archery Ring.wav",
    "malayalam/casket.wav",
    "malayalam/Clock.wav",
    "malayalam/Figure of a Parrot.wav",
    "malayalam/Kard (fruit knife of Noor Jahan).wav",
    "malayalam/Jambia.wav",
    "malayalam/Khanjarali.wav",
    "malayalam/Necklace.wav",
    "malayalam/Pen and ink stand.wav",
    "malayalam/Peshqabz.wav",
    "malayalam/Screen Shaped Photo Frame.wav",
    "malayalam/Spice Box with Tray.wav",
    "malayalam/kard(knife) of jahahangir.wav"
  ]
};

const itemCount = 13;

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;');
}

function generatePage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const imageName = itemImages[itemIndex] || `item${itemNum}.png`;
  const imgPath = `${relPath}images/${imageName}`;
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const items = jadeItemsData[lang] || jadeItemsData.hindi || [];
    const item = items[itemIndex] || items[0] || {};

    const isDisplay = lang === 'hindi' ? 'block' : 'none';
    const isRtl = lang === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
    
    // Audio path
    const audioArr = itemAudioByLanguage[lang];
    const rawAudioFile = audioArr ? audioArr[itemIndex] : null;
    const audioPath = rawAudioFile ? `${relPath}audio/${encodeURI(rawAudioFile)}` : '';
    audioMap[lang] = audioPath;

    const title = item.title || `Item ${itemNum}`;
    const badge = item.badge || '';
    const rawDesc = item.desc || item.description || '';
    const desc = rawDesc ? rawDesc.split('\n\n').join('<br><br>') : '';

    langDivsHtml += `
    <div class="bookContentDiv langCnt" id="${lang}" style="display: ${isDisplay};">
      <h2 class="cntHdng" ${isRtl}>${title}</h2>
      <div class="booImgDiv">
        <img src="${imgPath}" width="100%" alt="${escapeAttr(title)}" onerror="this.onerror=null; this.src='${relPath}images/logo.png';">
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
  <title>Jade Gallery - Item ${itemNum} | Salar Jung Museum</title>
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

  console.log(`Generated item${itemNum}.html and Item${itemNum}/index.html for JadeGallery`);
}
