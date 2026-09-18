const fs = require('fs');
const path = require('path');

// ===== Configuration =====
const galleryDir = path.join(__dirname, 'PaintingGallery');
const structuredJsonPath = path.join(__dirname, 'scratch', 'painting_gallery_items.json');

// Read structured content
const structuredItems = JSON.parse(fs.readFileSync(structuredJsonPath, 'utf8'));

// Languages available for Painting Gallery (Hindi, English, Bengali, Malayalam, Urdu, Tamil, and Gujarati)
const languages = [
  { id: 'hindi', label: 'हिन्दी (Hindi)' },
  { id: 'english', label: 'English' },
  { id: 'bengali', label: 'বাংলা (Bengali)' },
  { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { id: 'urdu', label: 'اردو (Urdu)' },
  { id: 'tamil', label: 'தமிழ் (Tamil)' },
  { id: 'gujarati', label: 'ગુજરાતી (Gujarati)' }
];

const langOptionsHtml = languages.map((l, idx) =>
  `<option value="${l.id}"${idx === 0 ? ' selected' : ''}>${l.label}</option>`
).join('\n              ');

const itemCount = 9;

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
    const dirAttr = lang === 'urdu' ? ' dir="rtl"' : '';

    const titles = {
      hindi: 'चित्र दीर्घा (पश्चिमी खंड)',
      english: 'Paintings Gallery (Western Block)',
      bengali: 'পেইন্টিং গ্যালারি (ওয়েস্টার্ন ব্লক)',
      malayalam: 'പെയിന്റിംഗ് ഗാലറി (വെസ്റ്റേൺ ബ്ലോക്ക്)',
      urdu: 'پینٹنگ گیلری (مغربی حصہ)',
      tamil: 'ஓவியக் காட்சிக்கூடம் (மேற்குப் பகுதி)',
      gujarati: 'ચિત્રકલા ગેલેરી (પશ્ચિમ વિભાગ)'
    };

    const descs = {
      hindi: 'ऑडियो गाइड ऐप के लिए पेंटिंग गैलरी से चुनी गई वस्तुएँ।',
      english: 'The following objects selected from the Painting Gallery for audio guide app.',
      bengali: 'অডিও গাইড অ্যাপের উদ্দেশ্যে পেইন্টিং গ্যালারি থেকে নির্বাচিত নিম্নলিখিত বস্তুগুলি।',
      malayalam: 'ആഡിയോ ഗൈഡ് ആപ്പ് ആവശ്യത്തിനായി പെയിന്റിംഗ് ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുത്തിരിക്കുന്ന വസ്തുക്കൾ.',
      urdu: 'آڈیو گائیڈ ایپ کے لیے پینٹنگ گیلری سے منتخب کی گئی اشیاء۔',
      tamil: 'ஆடியோ வழிகாட்டி செயலிக்காக ஓவியக் காட்சிக்கூடத்திலிருந்து தேர்ந்தெடுக்கப்பட்ட பொருட்கள்.',
      gujarati: 'ઑડિયો ગાઇડ ઍપ માટે પશ્ચિમ વિભાગની ચિત્રકલા ગેલેરીમાંથી પસંદ કરેલી વસ્તુઓ.'
    };

    return `    <section class="gallery-intro langCnt" id="${lang}"${dirAttr}${isDisplayAttr}>
      <h1>${titles[lang]}</h1>
      <p>${descs[lang]}</p>
    </section>`;
  }).join('\n');

  const html = `<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>चित्र दीर्घा (पश्चिमी खंड) | Salar Jung Museum</title>
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
    <p id="footerText">© 2024 सर्वाधिकार सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी AI</a> द्वारा</p>
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
    hindi: { code: "hi", dir: "ltr", title: "चित्र दीर्घा (पश्चिमी खंड) | Salar Jung Museum" },
    english: { code: "en", dir: "ltr", title: "Paintings Gallery (Western Block) | Salar Jung Museum" },
    bengali: { code: "bn", dir: "ltr", title: "পেইন্টিং গ্যালারি (Painting Gallery) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "പെയിന്റിംഗ് ഗാലറി (Painting Gallery) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "پینٹنگ گیلری (مغربی حصہ) | Salar Jung Museum" },
    tamil: { code: "ta", dir: "ltr", title: "ஓவியக் காட்சிக்கூடம் (மேற்குப் பகுதி) | Salar Jung Museum" },
    gujarati: { code: "gu", dir: "ltr", title: "ચિત્રકલા ગેલેરી (પશ્ચિમ વિભાગ) | Salar Jung Museum" }
  };

  const footerTranslations = {
    hindi: '© 2024 सर्वाधिकार सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी AI</a> द्वारा',
    english: '© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>',
    bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
    malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> മുഖേന',
    urdu: '© 2024 تمام حقوق محفوظ ہیں، بذریعہ <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">انووادنی AI</a>',
    tamil: '© 2024 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">அனுவாதினி AI</a> மூலம்',
    gujarati: '© 2024 સર્વાધિકાર સુરક્ષિત, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">અનુવાદિની AI</a> દ્વારા'
  };

  const AUDIO_MISSING =
    "🔇 Is bhasha me is vastu ka audio abhi uplabdh nahi hai.";

  function renderCards(language) {
    if (!galleryGrid) return;

    const items = itemsData[language] || itemsData.hindi || itemsData.english || [];
    const isRtl = language === 'urdu';

    galleryGrid.innerHTML = "";
    items.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "utility-card";
      if (isRtl) article.setAttribute("dir", "rtl");

      const hasAudio = item.audioSrc && item.audioSrc.trim() !== "";
      const itemNum = index + 1;

      article.innerHTML = \`
        <span class="badge-acq">\${item.badge}</span>
        <div class="img-container">
          <img src="\${item.imgSrc}" alt="\${item.title}" onerror="this.onerror=null; this.src='./images/logo.png';">
        </div>
        <h2><a href="\${item.itemUrl}">\${itemNum}. \${item.title}</a></h2>
        <div class="card-audio">
          \${
            hasAudio
              ? \`<audio controls preload="none">
                  <source src="\${item.audioSrc}" type="audio/wav">
                  Your browser does not support the audio element.
                </audio>\`
              : \`<div class="audio-missing-note">\${AUDIO_MISSING}</div>\`
          }
        </div>
        <div class="card-meta" style="font-size: 13px; font-weight: bold; color: #a50309; margin-bottom: 8px;">
          \${item.meta}
        </div>
        <div class="card-desc" style="font-size: 14px; color: #555; line-height: 1.6; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">
          \${item.paras[0] || ''}
        </div>
      \`;

      galleryGrid.appendChild(article);
    });
  }

  function updatePageLanguage(language) {
    const meta = langMetaMap[language] || langMetaMap.hindi;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    document.title = meta.title;

    if (footerText && footerTranslations[language]) {
      footerText.innerHTML = footerTranslations[language];
    }

    document.querySelectorAll(".langCnt").forEach((el) => {
      if (el.id === language) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    });

    renderCards(language);
  }

  if (languageSelector) {
    languageSelector.addEventListener("change", (e) => {
      updatePageLanguage(e.target.value);
    });
    updatePageLanguage(languageSelector.value || "hindi");
  }
});
`;

  const jsDir = path.join(galleryDir, 'js');
  fs.writeFileSync(path.join(jsDir, 'app.js'), appJs, 'utf8');
  console.log('Generated js/app.js');
}

// ===== 4. Generate item HTML files (item1.html .. item9.html) =====
function buildItemHtmlFiles() {
  for (let i = 0; i < itemCount; i++) {
    const itemNum = i + 1;
    const fileName = `item${itemNum}.html`;

    const prevLink = itemNum > 1 ? `<a href="item${itemNum - 1}.html" class="navBtn">← Previous</a>` : `<span></span>`;
    const nextLink = itemNum < itemCount ? `<a href="item${itemNum + 1}.html" class="navBtn">Next →</a>` : `<span></span>`;

    // Audio sources map by language for this item
    const audioMap = {};
    languages.forEach(l => {
      const itemData = structuredItems[l.id] ? structuredItems[l.id][i] : null;
      audioMap[l.id] = itemData ? itemData.audioSrc : '';
    });

    // Language content blocks
    const contentBlocks = languages.map((langObj, idx) => {
      const lang = langObj.id;
      const itemData = structuredItems[lang] ? structuredItems[lang][i] : null;
      if (!itemData) return '';

      const displayAttr = idx === 0 ? ' style="display: block;"' : ' style="display: none;"';
      const dirAttr = lang === 'urdu' ? ' dir="rtl"' : '';
      const parasHtml = itemData.paras.map(p => p.trim()).join('<br><br>');

      return `    <div class="bookContentDiv langCnt" id="${lang}"${dirAttr}${displayAttr}>
      <h2 class="cntHdng">${itemNum}. ${itemData.title}</h2>
      <div class="booImgDiv">
        <img src="./${itemData.imgSrc}" width="100%" alt="${itemNum}. ${itemData.title}" onerror="this.onerror=null; this.src='./images/logo.png';">
      </div>
      <div class="bookCntDiv">
        <p style="margin-bottom: 8px; font-weight: bold; color: #a50309;">${itemData.meta}</p>
        <div style="font-size: 16px; line-height: 1.8; color: #333333;">${parasHtml}</div>
      </div>
    </div>`;
    }).join('\n');

    const html = `<!doctype html>
<html lang="hi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Painting Gallery - Item ${itemNum} | Salar Jung Museum</title>
  <link href="./css/bootstrap.min.css" rel="stylesheet" onerror="this.remove()">
  <link rel="stylesheet" href="./css/styles.css">
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
          <a href="./index.html" class="logo logoTwo"><img src="./images/logo-moc.png" onerror="this.onerror=null; this.src='./../MusicalClock/images/logo-moc.png';" alt="Ministry of Culture"></a>
        </div>
        <div class="logoRgt">
          <div class="langDiv">
            <span class="anuIcn"><img src="./images/logo-anu.png" onerror="this.onerror=null; this.src='./../MusicalClock/images/logo-anu.png';" alt="Anuvadini"></span>
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

${contentBlocks}

    <div class="navBtnDiv">
      ${prevLink}
      ${nextLink}
    </div>
  </main>

  <footer>
    <p id="footerText">© 2024 सर्वाधिकार सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी AI</a> द्वारा</p>
  </footer>

  <script>
    const languageAudio = document.getElementById("languageAudio");
    const audioMissingNote = document.getElementById("audioMissingNote");
    const audioByLanguage = ${JSON.stringify(audioMap, null, 2)};
    const languageSelector = document.getElementById("languageSelector");

    const footerTranslations = {
      hindi: '© 2024 सर्वाधिकार सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी AI</a> द्वारा',
      english: '© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>',
      bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
      malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> മുഖേന',
      urdu: '© 2024 تمام حقوق محفوظ ہیں، بذریعہ <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">انووادنی AI</a>',
      tamil: '© 2024 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">அனுவாதினி AI</a> மூலம்',
      gujarati: '© 2024 સર્વાધિકાર સુરક્ષિત, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">અનુવાદિની AI</a> દ્વારા'
    };

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

      const footerText = document.getElementById("footerText");
      if (footerText && footerTranslations[language]) {
        footerText.innerHTML = footerTranslations[language];
      }
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

    fs.writeFileSync(path.join(galleryDir, fileName), html, 'utf8');
    console.log(`Generated ${fileName}`);
  }
}

// ===== Execute Build Steps =====
console.log('Building Painting Gallery HTML, JS and Data files...');
buildArtworksDataJs();
buildIndexHtml();
buildAppJs();
buildItemHtmlFiles();
console.log('Build complete!');
