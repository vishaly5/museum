const fs = require('fs');
const path = require('path');

// ===== Configuration =====
const galleryDir = path.join(__dirname, 'RemainingGalleries');
const structuredJsonPath = path.join(__dirname, 'scratch', 'remaining_gallery_items.json');

// Read structured content
const structuredItems = JSON.parse(fs.readFileSync(structuredJsonPath, 'utf8'));

// Languages available for this gallery
const languages = [
  { id: 'bengali', label: 'বাংলা (Bengali)' },
  { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { id: 'marathi', label: 'मराठी (Marathi)' },
  { id: 'urdu', label: 'اردو (Urdu)' },
  { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { id: 'gujarati', label: 'ગુજરાતી (Gujarati)' },
  { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
  { id: 'telugu', label: 'తెలుగు (Telugu)' },
  { id: 'tamil', label: 'தமிழ் (Tamil)' }
];

const langOptionsHtml = languages.map(l =>
  `<option value="${l.id}"${l.id === 'bengali' ? ' selected' : ''}>${l.label}</option>`
).join('\n              ');

const itemCount = 4;

// ===== 1. Generate artworksData.js =====
function buildArtworksDataJs() {
  const jsContent = `window.galleryItems = ${JSON.stringify(structuredItems, null, 2)};\n`;
  const jsDir = path.join(galleryDir, 'js');
  if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, { recursive: true });
  fs.writeFileSync(path.join(jsDir, 'artworksData.js'), jsContent, 'utf8');
  console.log('Generated js/artworksData.js');
}

// ===== 2. Generate index.html =====
function buildIndexHtml() {
  const introSections = languages.map((langObj, idx) => {
    const lang = langObj.id;
    const isDisplayAttr = idx === 0 ? ' style="display: block;"' : '';
    const isRtl = lang === 'urdu' ? ' dir="rtl"' : '';

    const titles = {
      bengali: 'অবশিষ্ট গ্যালারি (Remaining Galleries)',
      kannada: 'ಉಳಿದ ಗ್ಯಾಲರಿಗಳು (Remaining Galleries)',
      marathi: 'उर्वरित गॅलऱ्या (Remaining Galleries)',
      urdu: 'باقی نمائش گاہیں (Remaining Galleries)',
      malayalam: 'ശേഷിക്കുന്ന ഗാലറികൾ (Remaining Galleries)',
      gujarati: 'બાકી રહેલી ગેલેરીઓ (Remaining Galleries)',
      odia: 'ଅବଶିଷ୍ଟ ଗ୍ୟାଲେରୀ (Remaining Galleries)',
      telugu: 'మిగిలిన గ్యాలరీలు (Remaining Galleries)',
      tamil: 'மீதமுள்ள அரங்கங்கள் (Remaining Galleries)'
    };

    const descs = {
      bengali: 'অডিও গাইড অ্যাপের উদ্দেশ্যে অবশিষ্ট গ্যালারি থেকে নির্বাচিত নিম্নলিখিত বস্তুগুলি।',
      kannada: 'ಆಡಿಯೋ ಗೈಡ್ ಅಪ್ಲಿಕೇಶನ್ ಉದ್ದೇಶಕ್ಕಾಗಿ ಉಳಿದ ಗ್ಯಾಲರಿಗಳಿಂದ ಈ ಕೆಳಗಿನ ಆಯ್ದ ವಸ್ತುಗಳು.',
      marathi: 'ऑडिओ मार्गदर्शक ॲपच्या उद्देशाने उर्वरित गॅलरीमधून खालील निवडलेल्या वस्तू.',
      urdu: 'آڈیو گائیڈ ایپ کے لیے باقی نمائش گاہوں سے منتخب کردہ درج ذیل اشیا۔',
      malayalam: 'ഓഡിയോ ഗൈഡ് ആപ്പിനായി ശേഷിക്കുന്ന ഗാലറികളിൽ നിന്ന് തിരഞ്ഞെടുത്ത വസ്തുക്കൾ.',
      gujarati: 'ઓડિયો ગાઇડ એપના હેતુ માટે બાકીની ગેલેરીઓમાંથી પસંદ કરેલી નીચે મુજબની વસ્તુઓ.',
      odia: 'ଅଡିଓ ଗାଇଡ୍ ଆପ୍ ପାଇଁ ଅବଶିଷ୍ଟ ଗ୍ୟାଲେରୀରୁ ମନୋନୀତ ନିମ୍ନଲିଖିତ ବସ୍ତୁଗୁଡ଼ିକ।',
      telugu: 'ఆడియో గైడ్ యాప్ ప్రయోజనం కోసం మిగిలిన గ్యాలరీల నుండి ఎంచుకున్న క్రింది వస్తువులు.',
      tamil: 'ஒலி வழிகாட்டி பயன்பாட்டிற்காக மீதமுள்ள காட்சியகங்களிலிருந்து தேர்ந்தெடுக்கப்பட்ட பின்வரும் பொருட்கள்.'
    };

    return `    <section class="gallery-intro langCnt" id="${lang}"${isRtl}${isDisplayAttr}>
      <h1>${titles[lang]}</h1>
      <p>${descs[lang]}</p>
    </section>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="bn">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>অবশিষ্ট গ্যালারি (Remaining Galleries) | Salar Jung Museum</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="sliderHeaderDiv">
    <div class="container">
      <header>
        <div class="logoLft">
          <a href="../index.html" class="logo logoTwo"><img src="images/logo-moc.png" onerror="this.onerror=null; this.src='../MusicalClock/images/logo-moc.png';" alt="Ministry of Culture"></a>
        </div>
        <div class="logoRgt">
          <div class="langDiv">
            <span class="anuIcn"><img src="images/logo-anu.png" onerror="this.onerror=null; this.src='../MusicalClock/images/logo-anu.png';" alt="Anuvadini"></span>
            <select class="form formLang" id="languageSelector" aria-label="Select language">
              ${langOptionsHtml}
            </select>
          </div>
        </div>
      </header>
    </div>
  </div>

  <main>
    <!-- Intro -->
${introSections}

    <!-- Gallery Grid: cards are built from js/artworksData.js -->
    <section class="gallery-grid" id="galleryGrid"></section>
  </main>

  <footer>
    <p id="footerText">© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a></p>
  </footer>

  <script src="js/artworksData.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
  console.log('Generated index.html');
}

// ===== 3. Generate app.js =====
function buildAppJs() {
  const appJs = `document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const langMetaMap = {
    bengali: { code: "bn", dir: "ltr", title: "অবশিষ্ট গ্যালারি (Remaining Galleries) | Salar Jung Museum" },
    kannada: { code: "kn", dir: "ltr", title: "ಉಳಿದ ಗ್ಯಾಲರಿಗಳು (Remaining Galleries) | Salar Jung Museum" },
    marathi: { code: "mr", dir: "ltr", title: "उर्वरित गॅलऱ्या (Remaining Galleries) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "باقی نمائش گاہیں (Remaining Galleries) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "ശേഷിക്കുന്ന ഗാലറികൾ (Remaining Galleries) | Salar Jung Museum" },
    gujarati: { code: "gu", dir: "ltr", title: "બાકી રહેલી ગેલેરીઓ (Remaining Galleries) | Salar Jung Museum" },
    odia: { code: "or", dir: "ltr", title: "ଅବଶିଷ୍ଟ ଗ୍ୟାଲେରୀ (Remaining Galleries) | Salar Jung Museum" },
    telugu: { code: "te", dir: "ltr", title: "మిగిలిన గ్యాలరీలు (Remaining Galleries) | Salar Jung Museum" },
    tamil: { code: "ta", dir: "ltr", title: "மீதமுள்ள அரங்கங்கள் (Remaining Galleries) | Salar Jung Museum" }
  };

  const footerTranslations = {
    bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
    kannada: '© 2024 ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ಅನುವಾದಿನಿ AI</a> ಮೂಲಕ',
    marathi: '© 2024 सर्व हक्क सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी एआय</a> द्वारा',
    urdu: '© 2024 جملہ حقوق محفوظ ہیں، بذریعہ <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">انووادنی AI</a>',
    malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> മുഖേന',
    gujarati: '© 2024 તમામ હકો અનામત, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">અનુવાિદની AI</a> દ્વારા',
    odia: '© 2024 ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ଅନୁବାଦିନୀ AI</a> ଦ୍ୱାରା',
    telugu: '© 2024 సర్వహక్కులు ప్రత్యేకించబడ్డాయి, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">అనువాదిని AI</a> ద్వారా',
    tamil: '© 2024 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">அனுவாமினி AI</a> மூலம்'
  };

  const AUDIO_MISSING =
    "🔇 Is bhasha me is vastu ka audio abhi uplabdh nahi hai.";

  function renderCards(language) {
    if (!galleryGrid) return;

    const items = itemsData[language] || itemsData.bengali || [];
    const isRtl = language === "urdu";

    galleryGrid.innerHTML = "";
    items.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "utility-card";

      const hasAudio = item.audioSrc && item.audioSrc.trim() !== "";
      const itemNum = index + 1;

      article.innerHTML = \`
        <span class="badge-acq">\${item.badge}</span>
        <h2><a href="item\${itemNum}.html">\${item.title}</a></h2>
        <p>\${item.desc.split("\\n\\n").join("<br><br>")}</p>
        \${hasAudio
          ? \`<audio class="card-audio" controls preload="none" src="\${encodeURI(item.audioSrc)}"></audio>\`
          : \`<div class="audio-missing-note">\${AUDIO_MISSING}</div>\`}
      \`;

      article.querySelectorAll("h2, .badge-acq, p").forEach((el) => {
        if (isRtl) {
          el.setAttribute("dir", "rtl");
          el.style.textAlign = "right";
        } else {
          el.removeAttribute("dir");
          el.style.textAlign = el.tagName === "P" ? "justify" : "left";
        }
      });

      galleryGrid.appendChild(article);
    });

    galleryGrid.querySelectorAll("audio").forEach((player) => {
      player.addEventListener("play", () => {
        galleryGrid.querySelectorAll("audio").forEach((other) => {
          if (other !== player) other.pause();
        });
      });
    });
  }

  function selectLanguage(language) {
    const meta = langMetaMap[language] || langMetaMap.bengali;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    document.title = meta.title;

    document.querySelectorAll(".langCnt").forEach((content) => {
      content.style.display = content.id === language ? "block" : "none";
    });

    if (footerText) {
      footerText.innerHTML = footerTranslations[language] || footerTranslations.bengali;
      if (meta.dir === "rtl") {
        footerText.setAttribute("dir", "rtl");
      } else {
        footerText.removeAttribute("dir");
      }
    }

    renderCards(language);
  }

  const anuIcn = document.querySelector(".anuIcn");
  if (anuIcn && languageSelector) {
    anuIcn.style.cursor = "pointer";
    anuIcn.addEventListener("click", () => {
      languageSelector.focus();
      if ("showPicker" in HTMLSelectElement.prototype) {
        try {
          languageSelector.showPicker();
        } catch (e) {
          languageSelector.click();
        }
      } else {
        languageSelector.click();
      }
    });
  }

  if (languageSelector) {
    languageSelector.addEventListener("change", function () {
      selectLanguage(this.value);
    });
    selectLanguage(languageSelector.value || "bengali");
  }
});
`;

  fs.writeFileSync(path.join(galleryDir, 'js', 'app.js'), appJs, 'utf8');
  console.log('Generated js/app.js');
}

// ===== 4. Generate item pages — matching KashmiriGallery format exactly =====
function generateItemPage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const items = structuredItems[lang] || structuredItems.bengali || [];
    const item = items[itemIndex] || {};

    const isDisplay = lang === 'bengali' ? 'display: block;' : 'display: none;';

    // Audio path
    const rawAudio = item.audioSrc ? item.audioSrc.trim() : '';
    audioMap[lang] = rawAudio ? `./${encodeURI(rawAudio)}` : '';

    const title = item.title || `Item ${itemNum}`;
    const badge = item.badge || '';
    const rawDesc = item.desc || '';
    const desc = rawDesc ? rawDesc.split('\n\n').join('<br><br>') : '';

    // Image — no item images exist so use logo.png as fallback
    const imgSrc = `${relPath}images/logo.png`;

    // RTL only for Urdu heading and content div
    const hdngRtlAttr = lang === 'urdu' ? ' dir="rtl" style="text-align:right;"' : '';
    const contentRtlStyle = lang === 'urdu'
      ? 'dir="rtl" style="text-align: right; font-size: 19px; line-height: 2.1; color: #333333;"'
      : 'style="font-size: 16px; line-height: 1.8; color: #333333;"';

    langDivsHtml += `
    <div class="bookContentDiv langCnt" id="${lang}" style="${isDisplay}">
      <h2 class="cntHdng"${hdngRtlAttr}>${title}</h2>
      <div class="booImgDiv">
        <img src="${imgSrc}" width="100%" alt="${title}" onerror="this.onerror=null; this.src='${imgSrc}';">
      </div>
      <div class="bookCntDiv">
        <p style="margin-bottom: 8px; font-weight: bold; color: #a50309;">${badge}</p>
        <div ${contentRtlStyle}>${desc}</div>
      </div>
    </div>`;
  });

  // Previous / Next navigation
  const prevLink = itemNum > 1
    ? `<a href="${relPath === './' ? '' : '../'}item${itemNum - 1}.html" class="navBtn">← Previous</a>`
    : `<span></span>`;
  const nextLink = itemNum < itemCount
    ? `<a href="${relPath === './' ? '' : '../'}item${itemNum + 1}.html" class="navBtn">Next →</a>`
    : `<span></span>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Remaining Galleries - Item ${itemNum} | Salar Jung Museum</title>
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
    .navBtnDiv {
      max-width: 900px;
      margin: 0 auto 40px auto;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
    }
    .navBtn {
      display: inline-block;
      padding: 10px 24px;
      background: #a50309;
      color: #fff;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      transition: background 0.2s;
    }
    .navBtn:hover {
      background: #8e1d20;
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

    <div class="navBtnDiv">
      ${prevLink}
      ${nextLink}
    </div>
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
      selectLanguage(languageSelector.value || "bengali");
    }
  </script>
</body>
</html>
`;
}

function buildItemPages() {
  for (let i = 0; i < itemCount; i++) {
    const itemNum = i + 1;

    // item1.html at gallery root
    const pageDirect = generateItemPage(i, './');
    fs.writeFileSync(path.join(galleryDir, `item${itemNum}.html`), pageDirect, 'utf8');

    // Item1/index.html subfolder
    const itemFolder = path.join(galleryDir, `Item${itemNum}`);
    if (!fs.existsSync(itemFolder)) fs.mkdirSync(itemFolder, { recursive: true });
    const pageSubfolder = generateItemPage(i, '../');
    fs.writeFileSync(path.join(itemFolder, 'index.html'), pageSubfolder, 'utf8');

    console.log(`Generated item${itemNum}.html and Item${itemNum}/index.html`);
  }
}

// ===== Run all =====
console.log('Building Remaining Galleries...');
buildArtworksDataJs();
buildAppJs();
buildIndexHtml();
buildItemPages();
console.log('Done! All files generated for RemainingGalleries.');
