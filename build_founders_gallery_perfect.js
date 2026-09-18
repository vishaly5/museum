const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = __dirname;
const galleryDir = path.join(rootDir, 'Founders gallery');
const sourceDocxDir = 'C:/Users/ASUS/Downloads/content/founders gallery';
const sourceAudioDir = 'C:/Users/ASUS/Downloads/audio/founders gallery';

const languages = [
  'bengali',
  'english',
  'gujarati',
  'hindi',
  'kannada',
  'malayalam',
  'marathi',
  'odia',
  'tamil',
  'telugu',
  'urdu'
];

const languageLabels = {
  bengali: 'বাংলা (Bengali)',
  english: 'English',
  gujarati: 'ગુજરાતી (Gujarati)',
  hindi: 'हिन्दी (Hindi)',
  kannada: 'ಕನ್ನಡ (Kannada)',
  malayalam: 'മലയാളം (Malayalam)',
  marathi: 'मराठी (Marathi)',
  odia: 'ଓଡ଼ିଆ (Odia)',
  tamil: 'தமிழ் (Tamil)',
  telugu: 'తెలుగు (Telugu)',
  urdu: 'اردو (Urdu)'
};

const footerTranslations = {
  bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, Anuvadini AI',
  english: '© 2024 All rights reserved, By Anuvadini AI',
  gujarati: '© 2024 સર્વ હકો અનામત, Anuvadini AI',
  hindi: '© 2024 सर्वाधिकार सुरक्षित, Anuvadini AI',
  kannada: '© 2024 ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ, Anuvadini AI',
  malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം, Anuvadini AI',
  marathi: '© 2024 सर्व हक्क राखीव, Anuvadini AI',
  odia: '© 2024 ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ, Anuvadini AI',
  tamil: '© 2024 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை, Anuvadini AI',
  telugu: '© 2024 సర్వహక్కులు ప్రత్యేకించబడ్డాయి, Anuvadini AI',
  urdu: '© 2024 جملہ حقوق محفوظ ہیں، Anuvadini AI'
};

const itemMarkers = [
  'XLIV-548',
  'XXVIII-160',
  'ACQ-62-41-2',
  'XLIV-231',
  'XXVIII-20',
  'LXIII-A-10',
  'LXIII-A-13',
  'LXIII-A-11',
  'LX-352'
];

const defaultItemTitles = [
  'XLIV-548: Decorative Bowl',
  'XXVIII-160: Decorative Bowl',
  'ACQ-62-41-2: Sherwani',
  'XLIV-231: Casket',
  'XXVIII-20: Plate',
  'LXIII-A-10: Vase',
  'LXIII-A-13: Vase',
  'LXIII-A-11: Vase',
  'LX-352: Huqqa'
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseDocxContent() {
  const scriptPath = path.join(rootDir, 'extract_founders_content.py');
  const raw = execFileSync('python', ['-X', 'utf8', scriptPath], {
    encoding: 'utf-8',
    env: { ...process.env, PYTHONUTF8: '1', PYTHONIOENCODING: 'utf-8' }
  });
  return JSON.parse(raw);
}

function syncAudioFolders() {
  const audioDir = path.join(galleryDir, 'Audios');
  ensureDir(audioDir);

  const stale = ['malyalam', 'marati'];
  for (const name of stale) {
    const target = path.join(audioDir, name);
    if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
  }

  for (const lang of languages) {
    const src = path.join(sourceAudioDir, lang);
    const dest = path.join(audioDir, lang);
    if (fs.existsSync(src)) {
      if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
      fs.cpSync(src, dest, { recursive: true });
    }
  }
}

function buildAudioMap() {
  const audioDir = path.join(galleryDir, 'Audios');
  const map = {};

  for (const lang of languages) {
    const dir = path.join(audioDir, lang);
    const files = fs.existsSync(dir)
      ? fs.readdirSync(dir).filter((name) => fs.statSync(path.join(dir, name)).isFile())
      : [];

    const mapping = new Array(9).fill('');

    if (lang === 'english' || lang === 'hindi' || lang === 'tamil' || lang === 'odia' || lang === 'urdu') {
      for (const f of files) {
        const m = f.match(/^([1-9])[\.\)\s]/);
        if (m) {
          mapping[parseInt(m[1], 10) - 1] = f;
        }
      }
    } else if (lang === 'gujarati') {
      for (const f of files) {
        const u = f.toUpperCase();
        if (f === 'BOWL.wav') mapping[0] = f;
        else if (u.includes('160')) mapping[1] = f;
        else if (u.includes('SHERWANI')) mapping[2] = f;
        else if (u.includes('CASKET')) mapping[3] = f;
        else if (u.includes('PLATE')) mapping[4] = f;
        else if (f === 'VASE.wav') mapping[5] = f;
        else if (u.includes('LXIII-A-13')) mapping[6] = f;
        else if (u.includes('LXIII-A-11')) mapping[7] = f;
        else if (u.includes('HUQQA')) mapping[8] = f;
      }
    } else if (lang === 'marathi') {
      for (const f of files) {
        const u = f.toUpperCase();
        if (u === 'BOWL.WAV') mapping[0] = f;
        else if (u.includes('160')) mapping[1] = f;
        else if (u.includes('SHERWANI')) mapping[2] = f;
        else if (u.includes('231') || u.includes('CASKET')) mapping[3] = f;
        else if (u.includes('20') || u.includes('PLATE')) mapping[4] = f;
        else if (u.includes('LXIII-A-10') || u.includes('LXIII_A_10')) mapping[5] = f;
        else if (u.includes('LXIII-A-13') || u.includes('XIII-A-13')) mapping[6] = f;
        else if (u.includes('LXIII-A-11')) mapping[7] = f;
        else if (u.includes('352') || u.includes('HUQQA')) mapping[8] = f;
      }
    } else {
      // bengali, kannada, malayalam, telugu
      for (const f of files) {
        const u = f.toUpperCase();
        if (u.includes('548')) mapping[0] = f;
        else if (u.includes('160')) mapping[1] = f;
        else if (u.includes('SHERWANI')) mapping[2] = f;
        else if (u.includes('231') || u.includes('CASKET')) mapping[3] = f;
        else if (u.includes('20') || u.includes('PLATE')) mapping[4] = f;
        else if (u.includes('LXIII-A-10') || u.includes('LXIII_A_10')) mapping[5] = f;
        else if (u.includes('LXIII-A-13') || u.includes('XIII-A-13')) mapping[6] = f;
        else if (u.includes('LXIII-A-11')) mapping[7] = f;
        else if (u.includes('352') || u.includes('HUQQA')) mapping[8] = f;
      }
    }

    map[lang] = mapping.map((f) => (f ? `./Audios/${lang}/${f}` : ''));
  }

  return map;
}

function buildContentJs(content) {
  const js = `window.foundersGalleryContent = ${JSON.stringify(content, null, 2)};\n`;
  fs.writeFileSync(path.join(galleryDir, 'content.js'), js, 'utf8');
}

function buildOverviewPage(audioMap, content) {
  const audioMapAll = {};
  for (let i = 1; i <= 9; i++) {
    audioMapAll[i] = {};
    for (const lang of languages) {
      audioMapAll[i][lang] = (audioMap[lang] && audioMap[lang][i - 1]) || '';
    }
  }

  const initialLang = 'hindi';

  const cardsHtml = defaultItemTitles.map((title, index) => {
    const itemNum = index + 1;
    const initialText = String(content[initialLang]?.[index] || '').replace(/\s+/g, ' ').trim();
    const preview = initialText.length > 240 ? initialText.slice(0, 240) + '...' : initialText;
    const initialAudio = audioMapAll[itemNum][initialLang] || '';

    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="item-card" data-item="${itemNum}">
                <a href="item${itemNum}.html" class="text-decoration-none item-link" data-item-num="${itemNum}">
                    <img src="./images/Founder gallery item no${itemNum}.png" class="img-fluid rounded" alt="${escapeHtml(title)}">
                    <h4 class="mt-3">${escapeHtml(title)}</h4>
                    <audio class="item-audio" controls preload="none" data-audio-item="${itemNum}" src="${escapeHtml(initialAudio)}"></audio>
                </a>
                <div class="card-content mt-2" data-card-content="${itemNum}">
                    ${escapeHtml(preview).replace(/\n/g, '<br>')}
                </div>
            </div>
        </div>`;
  }).join('\n');

  const selectorOptions = languages.map((lang) => {
    const selected = lang === initialLang ? ' selected' : '';
    return `<option value="${lang}"${selected}>${languageLabels[lang]}</option>`;
  }).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Founders Gallery | Salar Jung Museum</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <style>
/* ============================================================
   FOUNDERS GALLERY HEADER — MATCHING MARBLE GALLERY
   ============================================================ */
.gallery-header {
    width: 100% !important;
    height: 76px !important;
    background: #ffffff !important;
    border-bottom: 1px solid #eeeeee !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 99999 !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.08) !important;
}

.gallery-header .container-fluid {
    width: 100% !important;
    height: 100% !important;
    padding-left: 6% !important;
    padding-right: 6% !important;
}

.gallery-header .header-inner {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

.gallery-header .header-logo-left {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex: 0 0 auto !important;
}

.gallery-header .museum-logo {
    display: block !important;
    width: auto !important;
    height: 50px !important;
    max-height: 50px !important;
    max-width: 180px !important;
    object-fit: contain !important;
}

.gallery-header .header-language-right {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    flex: 0 0 auto !important;
}

/* =========================================
   LANGUAGE PILL — RED WITH ANUVADINI LOGO
   ========================================= */
.gallery-header #languageSelector {
    width: 245px !important;
    min-width: 245px !important;
    max-width: 245px !important;
    height: 46px !important;
    min-height: 46px !important;
    max-height: 46px !important;
    border: none !important;
    border-radius: 25px !important;
    background-color: #c52f35 !important;
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    padding: 0 42px 0 58px !important;
    cursor: pointer;
    appearance: none !important;
    -webkit-appearance: none !important;
    background-image:
        url("./images/logo-anu.png"),
        linear-gradient(45deg, transparent 50%, #ffffff 50%),
        linear-gradient(135deg, #ffffff 50%, transparent 50%) !important;
    background-repeat: no-repeat, no-repeat, no-repeat !important;
    background-position:
        9px center,
        calc(100% - 22px) 19px,
        calc(100% - 16px) 19px !important;
    background-size:
        38px 38px,
        7px 7px,
        7px 7px !important;
}

.gallery-header #languageSelector option {
    background: #c52f35;
    color: #ffffff;
    font-size: 16px;
}

/* =========================================
   TITLE AREA
   ========================================= */
body {
    margin: 0;
    background: #f5f5f5;
    font-family: Arial, sans-serif;
}

body > .container.mt-4 {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
}

body > .container.mt-4 > .d-flex {
    min-height: 128px !important;
    margin: 0 !important;
    padding: 28px 6% !important;
    background: #ffffff !important;
    display: flex !important;
    align-items: center !important;
}

body > .container.mt-4 > .d-flex h2 {
    margin: 0 !important;
    padding-left: 14px !important;
    border-left: 7px solid #b52b30 !important;
    color: #a50309 !important;
    font-size: 36px !important;
    font-weight: 700 !important;
    line-height: 1.25 !important;
}

/* =========================================
   GALLERY GRID & CARDS
   ========================================= */
body > .container.mt-4 > .row {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 18px !important;
    margin: 0 !important;
    padding: 30px 6% !important;
    background: #a50309 !important;
}

body > .container.mt-4 > .row > [class*="col-"] {
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
}

.item-card {
    background: #ffffff !important;
    padding: 14px !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.10) !important;
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
    transition: transform 0.2s;
    cursor: pointer;
}

.item-card:hover {
    transform: translateY(-4px);
}

.item-card img {
    width: 100% !important;
    height: 270px !important;
    object-fit: contain !important;
    background: #ffffff !important;
    border-radius: 6px !important;
}

.item-card h4,
.item-card h2 {
    margin: 14px 0 4px !important;
    color: #a50309 !important;
    font-size: 18px !important;
    font-weight: 700 !important;
}

.item-card > a {
    color: #a50309 !important;
    text-decoration: none !important;
}

.item-card .card-content {
    margin-top: 10px !important;
    color: #333333 !important;
    font-size: 15px !important;
    line-height: 1.55 !important;
    overflow-wrap: anywhere;
}

.item-audio {
    display: block !important;
    width: 100% !important;
    height: 40px !important;
    margin: 10px 0 8px !important;
}

/* =========================================
   FOOTER
   ========================================= */
#foundersFooter {
    width: 100%;
    background: #222222;
    color: #ffffff;
    text-align: center;
    padding: 22px 10px;
    margin: 0;
    box-sizing: border-box;
}

#foundersFooter p {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
}

#foundersFooter a {
    color: #f0c36a;
    text-decoration: none;
}

#foundersFooter a:hover {
    text-decoration: underline;
}

/* =========================================
   RESPONSIVE (TABLETS & MOBILE)
   ========================================= */
@media(max-width: 992px) {
    body > .container.mt-4 > .row {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

@media(max-width: 767px) {
    .gallery-header {
        height: 65px !important;
    }
    .gallery-header .container-fluid {
        padding-left: 4% !important;
        padding-right: 4% !important;
    }
    .gallery-header .museum-logo {
        height: 42px !important;
        max-height: 42px !important;
        max-width: 145px !important;
    }
    .gallery-header #languageSelector {
        width: 190px !important;
        min-width: 190px !important;
        max-width: 190px !important;
        height: 42px !important;
        min-height: 42px !important;
        max-height: 42px !important;
        font-size: 14px !important;
        line-height: 42px !important;
        padding-left: 48px !important;
        background-size:
            32px 32px,
            6px 6px,
            6px 6px !important;
        background-position:
            8px center,
            calc(100% - 18px) 17px,
            calc(100% - 13px) 17px !important;
    }
    body > .container.mt-4 > .d-flex {
        min-height: 105px !important;
        padding: 22px 4% !important;
    }
    body > .container.mt-4 > .d-flex h2 {
        font-size: 30px !important;
    }
    body > .container.mt-4 > .row {
        grid-template-columns: 1fr !important;
        padding: 18px 4% !important;
    }
    .item-card img {
        height: 240px !important;
    }
}
    </style>
</head>
<body>

<header class="gallery-header">
    <div class="container-fluid">
        <div class="header-inner">
            <div class="header-logo-left">
                <a href="../index.html">
                    <img src="./images/logo-moc.png" onerror="this.onerror=null;this.src='./images/logo.png';" alt="Salar Jung Museum" class="museum-logo">
                </a>
            </div>
            <div class="header-language-right">
                <select id="languageSelector" class="form-select" onchange="selectLanguage(this.value)" aria-label="Select language">
${selectorOptions}
                </select>
            </div>
        </div>
    </div>
</header>

<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Founders Gallery</h2>
    </div>
    <div class="row">
${cardsHtml}
    </div>
</div>

<footer id="foundersFooter">
    <p>© 2024 All rights reserved, By
        <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>
    </p>
</footer>

<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="content.js"></script>

<script>
const audioMapAll = ${JSON.stringify(audioMapAll, null, 2)};
const footerTranslations = ${JSON.stringify(footerTranslations, null, 2)};

function updateFoundersFooter(language) {
    const footer = document.getElementById('foundersFooter');
    if (!footer) return;
    const text = footerTranslations[language];
    if (text) {
        footer.innerHTML = '<p>' +
            text.replace('Anuvadini AI', '<a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>') +
            '</p>';
    }
}

function selectLanguage(language) {
    localStorage.setItem('foundersGalleryLang', language);

    if (typeof updateFoundersFooter === 'function') {
        updateFoundersFooter(language);
    }

    const contents = (window.foundersGalleryContent || {})[language];

    document.querySelectorAll('.item-card').forEach(function(card) {
        const item = parseInt(card.getAttribute('data-item'), 10);
        card.style.direction = language === 'urdu' ? 'rtl' : 'ltr';

        if (!contents || !contents[item - 1]) {
            return;
        }

        const fullText = contents[item - 1];
        const preview = fullText.length > 240 ? fullText.slice(0, 240) + '...' : fullText;

        const contentBox = card.querySelector('[data-card-content]');
        if (contentBox) {
            contentBox.innerHTML = preview.replace(/\\n/g, '<br>');
        }

        const audio = card.querySelector('.item-audio');
        if (audio && audioMapAll[item] && audioMapAll[item][language]) {
            audio.src = encodeURI(audioMapAll[item][language]);
            audio.load();
        }
    });

    // Update item link query params to carry forward selected language
    document.querySelectorAll('.item-link').forEach(function(link) {
        const itemNum = link.getAttribute('data-item-num');
        link.href = 'item' + itemNum + '.html?lang=' + encodeURIComponent(language);
    });

    const selector = document.getElementById('languageSelector');
    if (selector && selector.value !== language) {
        selector.value = language;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedLang = urlParams.get('lang') || localStorage.getItem('foundersGalleryLang');
    const selector = document.getElementById('languageSelector');
    const langToUse = (savedLang && window.foundersGalleryContent && window.foundersGalleryContent[savedLang]) ? savedLang : (selector ? selector.value : 'hindi');
    if (selector) {
        selector.value = langToUse;
    }
    selectLanguage(langToUse);
});
</script>

</body>
</html>`;

  fs.writeFileSync(path.join(galleryDir, 'index.html'), html, 'utf8');
}

function buildItemPages(audioMap, content) {
  for (let i = 0; i < defaultItemTitles.length; i += 1) {
    const itemNum = i + 1;
    const itemTitle = defaultItemTitles[i];

    const sections = languages.map((lang) => {
      const text = escapeHtml(String(content[lang]?.[i] || '')).replace(/\n/g, '<br><br>');
      const dir = lang === 'urdu' ? 'rtl' : 'ltr';
      const show = lang === 'hindi' ? 'block' : 'none';
      return `<div class="langCnt" id="${lang}" dir="${dir}" style="display:${show}">
        <h2 class="cntHdng">${escapeHtml(itemTitle)}</h2>
        <div class="booImgDiv">
            <img src="./images/Founder gallery item no${itemNum}.png" alt="${escapeHtml(itemTitle)}">
        </div>
        <div class="bookCntDiv">
            <p>${text}</p>
        </div>
      </div>`;
    }).join('\n');

    const selectorOptions = languages.map((lang) => {
      const selected = lang === 'hindi' ? ' selected' : '';
      return `<option value="${lang}"${selected}>${languageLabels[lang]}</option>`;
    }).join('\n');

    const prev = Math.max(1, i);
    const next = Math.min(defaultItemTitles.length, i + 2);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Founders Gallery - Item ${itemNum} | Salar Jung Museum</title>
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/styles.css">
    <style>
.gallery-header {
    width: 100% !important;
    height: 76px !important;
    background: #ffffff !important;
    border-bottom: 1px solid #eeeeee !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 99999 !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.08) !important;
}

.gallery-header .container-fluid {
    width: 100% !important;
    height: 100% !important;
    padding-left: 6% !important;
    padding-right: 6% !important;
}

.gallery-header .header-inner {
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
}

.gallery-header .header-logo-left {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex: 0 0 auto !important;
}

.gallery-header .museum-logo {
    display: block !important;
    width: auto !important;
    height: 50px !important;
    max-height: 50px !important;
    max-width: 180px !important;
    object-fit: contain !important;
}

.gallery-header .header-language-right {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    flex: 0 0 auto !important;
}

.gallery-header #languageSelector {
    width: 245px !important;
    min-width: 245px !important;
    max-width: 245px !important;
    height: 46px !important;
    min-height: 46px !important;
    max-height: 46px !important;
    border: none !important;
    border-radius: 25px !important;
    background-color: #c52f35 !important;
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    padding: 0 42px 0 58px !important;
    cursor: pointer;
    appearance: none !important;
    -webkit-appearance: none !important;
    background-image:
        url("./images/logo-anu.png"),
        linear-gradient(45deg, transparent 50%, #ffffff 50%),
        linear-gradient(135deg, #ffffff 50%, transparent 50%) !important;
    background-repeat: no-repeat, no-repeat, no-repeat !important;
    background-position:
        9px center,
        calc(100% - 22px) 19px,
        calc(100% - 16px) 19px !important;
    background-size:
        38px 38px,
        7px 7px,
        7px 7px !important;
}

.gallery-header #languageSelector option {
    background: #c52f35;
    color: #ffffff;
    font-size: 16px;
}

.audioPlayerDiv, .navBtnDiv {
    max-width: 900px;
    margin: 20px auto;
    padding: 15px;
}

.audioPlayerDiv {
    background: #2e2e2e;
    color: #ffffff;
    border-radius: 10px;
    padding: 15px 20px;
}

.audioPlayerDiv p {
    margin: 0 0 8px;
    font-size: 14px;
}

.cntHdng {
    color: #a50309;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 16px;
}

.booImgDiv {
    width: 100%;
    max-height: 480px;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #eee;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
}

.booImgDiv img {
    max-height: 460px;
    max-width: 100%;
    object-fit: contain;
}

.bookCntDiv {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    max-width: 900px;
    margin: 0 auto;
    padding: 10px 0;
}

.langCnt {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 15px;
}

.langCnt[dir="rtl"] {
    direction: rtl;
    text-align: right;
}

.navBtnDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.navBtn {
    background: #a50309;
    color: #fff;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
}

.navBtn:hover {
    background: #7a0206;
    color: #fff;
}

#foundersFooter {
    width: 100%;
    background: #222222;
    color: #ffffff;
    text-align: center;
    padding: 22px 10px;
    margin: 40px 0 0;
    box-sizing: border-box;
}

#foundersFooter p {
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
}

#foundersFooter a {
    color: #f0c36a;
    text-decoration: none;
}

#foundersFooter a:hover {
    text-decoration: underline;
}

@media (max-width: 767px) {
    .gallery-header {
        height: 65px !important;
    }
    .gallery-header .container-fluid {
        padding-left: 4% !important;
        padding-right: 4% !important;
    }
    .gallery-header .museum-logo {
        height: 42px !important;
        max-height: 42px !important;
        max-width: 145px !important;
    }
    .gallery-header #languageSelector {
        width: 190px !important;
        min-width: 190px !important;
        max-width: 190px !important;
        height: 42px !important;
        font-size: 14px !important;
        padding-left: 48px !important;
    }
}
    </style>
</head>
<body>

<header class="gallery-header">
    <div class="container-fluid">
        <div class="header-inner">
            <div class="header-logo-left">
                <a href="./index.html">
                    <img src="./images/logo-moc.png" onerror="this.onerror=null;this.src='./images/logo.png';" alt="Ministry of Culture" class="museum-logo">
                </a>
            </div>
            <div class="header-language-right">
                <select id="languageSelector" class="form formLang" aria-label="Select language">
${selectorOptions}
                </select>
            </div>
        </div>
    </div>
</header>

<main>
    <div class="audioPlayerDiv">
        <p>Audio Explanation</p>
        <audio id="audio" controls style="width:100%"></audio>
    </div>
${sections}
    <div class="navBtnDiv">
        <a id="prevItemBtn" class="navBtn" href="item${prev}.html">← Previous Item</a>
        <a id="overviewBtn" class="navBtn" href="index.html">Back to Gallery Overview</a>
        <a id="nextItemBtn" class="navBtn" href="item${next}.html">Next Item →</a>
    </div>
</main>

<footer id="foundersFooter">
    <p>© 2024 All rights reserved, By
        <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>
    </p>
</footer>

<script>
const audioFiles = ${JSON.stringify(audioMap)};
const footerTranslations = ${JSON.stringify(footerTranslations, null, 2)};
const selector = document.getElementById('languageSelector');
const audio = document.getElementById('audio');
const sections = [...document.querySelectorAll('.langCnt')];

function updateFoundersFooter(language) {
    const footer = document.getElementById('foundersFooter');
    if (!footer) return;
    const text = footerTranslations[language];
    if (text) {
        footer.innerHTML = '<p>' +
            text.replace('Anuvadini AI', '<a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>') +
            '</p>';
    }
}

function setLanguage(lang) {
    localStorage.setItem('foundersGalleryLang', lang);
    if (selector && selector.value !== lang) {
        selector.value = lang;
    }

    sections.forEach((section) => {
        section.style.display = section.id === lang ? 'block' : 'none';
    });

    const track = (audioFiles[lang] || [])[${i}] || '';
    if (track) {
        audio.src = track;
        audio.load();
    }

    updateFoundersFooter(lang);

    // Update nav links to carry selected language
    const prevBtn = document.getElementById('prevItemBtn');
    if (prevBtn) prevBtn.href = 'item${prev}.html?lang=' + encodeURIComponent(lang);
    const overviewBtn = document.getElementById('overviewBtn');
    if (overviewBtn) overviewBtn.href = 'index.html?lang=' + encodeURIComponent(lang);
    const nextBtn = document.getElementById('nextItemBtn');
    if (nextBtn) nextBtn.href = 'item${next}.html?lang=' + encodeURIComponent(lang);
}

selector.addEventListener('change', (event) => setLanguage(event.target.value));

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedLang = urlParams.get('lang') || localStorage.getItem('foundersGalleryLang');
    const langToUse = (savedLang && audioFiles[savedLang]) ? savedLang : (selector ? selector.value : 'hindi');
    setLanguage(langToUse);
});
</script>

</body>
</html>`;

    fs.writeFileSync(path.join(galleryDir, `item${i + 1}.html`), html, 'utf8');
  }
}

function main() {
  ensureDir(galleryDir);
  syncAudioFolders();

  const content = parseDocxContent();
  buildContentJs(content);

  const audioMap = buildAudioMap();
  buildOverviewPage(audioMap, content);
  buildItemPages(audioMap, content);

  console.log('Founders Gallery rebuilt successfully.');
  console.log('Languages:', Object.keys(content).join(', '));
  console.log('Counts:', Object.entries(content).map(([lang, values]) => `${lang}:${values.length}`).join(' | '));
  console.log('Audio map:', Object.entries(audioMap).map(([lang, files]) => `${lang}:${files.filter(Boolean).length}`).join(' | '));
}

main();
