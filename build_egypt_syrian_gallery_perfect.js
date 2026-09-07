const fs = require('fs');
const path = require('path');

const galleryDir = 'd:/validation/museum/Egypt and Syrian Gallery';
const appJsPath = path.join(galleryDir, 'js/app.js');

const appJsStr = fs.readFileSync(appJsPath, 'utf8');

// Extract itemsData using regex or Function
const matchItemsData = appJsStr.match(/const itemsData = (\{[\s\S]*?\n  \};\n)/);
let itemsData = {};
if (matchItemsData) {
  const evalCode = matchItemsData[1];
  eval('itemsData = ' + evalCode.replace(/;\s*$/, ''));
} else {
  console.error("Could not parse itemsData from app.js");
  process.exit(1);
}

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

// Audio folders map
const audioFolderMap = {
  hindi: 'hindi',
  english: 'urdu',
  telugu: 'telugu',
  urdu: 'urdu',
  bengali: 'Bengauli',
  gujarati: 'gujrati',
  kannada: 'kannade',
  odia: 'odia',
  marathi: 'marathi',
  malayalam: 'Malayalam',
  tamil: 'Tamil'
};

const accMap = [
  'XXIII-95',   // Item 1
  'XXIII-101',  // Item 2
  'XXIII-65',   // Item 3
  '107',        // Item 4
  'XXIII-71',   // Item 5
  'XLVI-186',   // Item 6
  'CS-I-1280',  // Item 7
  'XLVI-688',   // Item 8
  'XXIII-37',   // Item 9
  'XVII-5'      // Item 10
];

function getAudioPath(lang, itemIndex) {
  const folder = audioFolderMap[lang];
  if (!folder) return '';
  const dirPath = path.join(galleryDir, 'Audios', folder);
  if (!fs.existsSync(dirPath)) return '';

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.wav') || f.endsWith('.mp3'));
  if (files.length === 0) return '';

  const itemNum = itemIndex + 1;

  // 1. Check for number prefix e.g. "1.", "1 ", "1-"
  let found = files.find(f => {
    const trimmed = f.trim();
    return trimmed.startsWith(`${itemNum}.`) || trimmed.startsWith(`${itemNum} `) || trimmed.startsWith(`${itemNum}-`);
  });
  if (found) return `Audios/${folder}/${found}`;

  // 2. Check by accession number
  const acc = accMap[itemIndex];
  if (acc) {
    const accNormalized = acc.replace(/-/g, '');
    found = files.find(f => {
      const fNorm = f.replace(/_/g, '-').replace(/\s+/g, '');
      return fNorm.includes(acc) || fNorm.includes(accNormalized);
    });
    if (found) return `Audios/${folder}/${found}`;
  }

  // 3. Check by keyword matching for telugu/urdu
  const itemKeywords = [
    ['tutankhamen'],                                    // 1
    ['screen.wav', 'xxiii-101'],                        // 2
    ['sofa'],                                           // 3
    ['stand'],                                          // 4
    ['nefertiti'],                                      // 5
    ['xlvi-186', 'chair.wav'],                          // 6
    ['table lamp'],                                     // 7
    ['stool'],                                          // 8
    ['screen representing', 'egyptian figures'],        // 9
    ['curtain']                                         // 10
  ];

  const keywords = itemKeywords[itemIndex];
  if (keywords) {
    found = files.find(f => {
      const lower = f.toLowerCase();
      return keywords.some(kw => lower.includes(kw));
    });
    if (found) return `Audios/${folder}/${found}`;
  }

  // 4. Fallback: by index if files exist (e.g. Malayalam)
  if (files[itemIndex]) {
    return `Audios/${folder}/${files[itemIndex]}`;
  }

  return '';
}

const itemCount = 10;

function escapeAttr(str) {
  if (!str) return '';
  return str.replace(/"/g, '&quot;');
}

function generatePage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const imgPath = `${relPath}images/egypt-item${itemNum}.png`;
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const items = itemsData[lang] || itemsData.hindi || itemsData.english || [];
    const item = items[itemIndex] || items[0] || {};

    const isDisplay = lang === 'hindi' ? 'block' : 'none';
    const isRtl = lang === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
    
    // Audio path
    const rawAudioPath = getAudioPath(lang, itemIndex);
    const audioPath = rawAudioPath ? `${relPath}${encodeURI(rawAudioPath)}` : '';
    audioMap[lang] = audioPath;

    const title = item.title || `Item ${itemNum}`;
    const badge = item.badge || '';
    const rawDesc = item.desc || item.description || '';
    const desc = rawDesc ? rawDesc.split('\n\n').join('<br><br>') : '';

    langDivsHtml += `
    <div class="bookContentDiv langCnt" id="${lang}" style="display: ${isDisplay};">
      <h2 class="cntHdng" ${isRtl}>${title}</h2>
      <div class="booImgDiv">
        <img src="${imgPath}" width="100%" alt="${escapeAttr(title)}" onerror="this.onerror=null; this.src='${relPath}images/egypt-item${itemNum}.png';">
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
  <title>Egypt and Syrian Gallery - Item ${itemNum} | Salar Jung Museum</title>
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

  console.log(`Generated item${itemNum}.html and Item${itemNum}/index.html for Egypt and Syrian Gallery`);
}
