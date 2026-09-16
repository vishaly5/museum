const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'MarbleGallery');
const contentJsPath = path.join(galleryDir, 'content.js');

if (!fs.existsSync(galleryDir)) {
    throw new Error('MarbleGallery folder not found.');
}

if (!fs.existsSync(contentJsPath)) {
    throw new Error('MarbleGallery/content.js not found.');
}

// Load Marble content
const contentJs = fs.readFileSync(contentJsPath, 'utf8');
const window = {};
eval(contentJs);

const marbleContent = window.marbleContent;

if (!marbleContent) {
    throw new Error('window.marbleContent was not found in content.js');
}

// Marble Gallery languages
const languages = [
    { id: 'bengali', label: 'বাংলা (Bengali)' },
    { id: 'hindi', label: 'हिन्दी (Hindi)' },
    { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
    { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
    { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
    { id: 'tamil', label: 'தமிழ் (Tamil)' },
    { id: 'telugu', label: 'తెలుగు (Telugu)' },
    { id: 'urdu', label: 'اردو (Urdu)' },
    { id: 'marathi', label: 'मराठी (Marathi)' }
];

const items = [
    {
        title: 'Leda and the Swan',
        image: 'images/marblegallery-item1.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/1. Leda and the Swan (XLV - 17)_.wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/1. लेडा और हंस.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Leda and the Swan (XLV - 17).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Leda and the Swan.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/1. Leda and the Swan (XLV - 17).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/1. Leda and the Swan _ TA.wav',
            telugu: 'audios/Telugu/Telugu_Leda and the Swan_Female.wav',
            urdu: 'audios/Urdu/1. Leda and the Swan (XLV - 17).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Leda and the Swan (XLV - 17).wav'
        }
    },
    {
        title: 'Pillar Shaped as Female (Greek Mythological Figure)',
        image: 'images/marblegallery-item2.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/2.Pillar Shaped as Female (Greek Mythological Figure) (AK - 22).wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/2. स्त्री के आकार का स्तंभ.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Pillar Shaped as Female (Greek Mythological Figure) (AK - 22) .wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Pillar Shaped as Female.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/2.Pillar Shaped as Female (AK - 22).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/2.Pillar Shaped as Female_TA.wav',
            telugu: 'audios/Telugu/Telugu_Pillar Shaped as Female_Female voice.wav',
            urdu: 'audios/Urdu/2.Pillar Shaped as Female (Greek Mythological Figure) (AK - 22).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Pillar Shaped as Female (Greek Mythological Figure) (AK - 22).wav'
        }
    },
    {
        title: 'L. AUTOMME',
        image: 'images/marblegallery-item3.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/3. L. AUTOMME (AK - 24).wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/3. एल. ऑटोम.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/L. AUTOMME (AK - 24).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/L. AUTOMME.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/3. L. AUTOMME (AK - 24).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/3. L. AUTOMME _ TA.wav',
            telugu: 'audios/Telugu/Telugu_L. AUTOMME_Female.wav',
            urdu: 'audios/Urdu/3. L. AUTOMME (AK - 24).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/L. AUTOMME (AK - 24).wav'
        }
    },
    {
        title: 'Venus and Mars (War and Peace)',
        image: 'images/marblegallery-item4.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/4. Venus and Mars (XLV - 161) (War and Peace)_.wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/4. शुक्र और मंगल.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Venus and Mars (XLV - 161) (War and Peace).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Venus and Mars.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/4. Venus and Mars (XLV - 161).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/4. Venus and Mars _TA.wav',
            telugu: 'audios/Telugu/Telugu_Venus and Mars_Female.wav',
            urdu: 'audios/Urdu/4. Venus and Mars (XLV - 161) (War and Peace).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Venus and Mars (XLV - 161) (War and Peace).wav'
        }
    },
    {
        title: 'Cleopatra – Queen of Egypt',
        image: 'images/marblegallery-item5.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/5. Cleopatra – Queen of Egypt (XLV - 151).wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/5. क्लियोपेट्रा – मिस्र की रानी.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Cleopatra – Queen of Egypt (XLV - 151).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Cleopatra.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/5. Cleopatra – Queen of Egypt (XLV - 151).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/5. Cleopatra – Queen of Egypt_TA.wav',
            telugu: 'audios/Telugu/Telugu_Cleopatra – Queen of Egypt_Female.wav',
            urdu: 'audios/Urdu/5. Cleopatra – Queen of Egypt (XLV - 151).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Cleopatra – Queen of Egypt (XLV - 151).wav'
        }
    },
    {
        title: 'Apollo and Daphne',
        image: 'images/marblegallery-item6.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/6. Apollo and Daphne (XLV - 133)_.wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/6. अपोलो और डैफ्नी.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Apollo and Daphne (XLV - 133) .wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Apollo and Daphne.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/6. Apollo and Daphne (XLV - 133).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/6. Apollo and Daphne _ TA.wav',
            telugu: 'audios/Telugu/Telugu_Apollo and Daphne_Female.wav',
            urdu: 'audios/Urdu/6. Apollo and Daphne (XLV - 133).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Apollo and Daphne (XLV - 133).wav'
        }
    },
    {
        title: 'Cynthia',
        image: 'images/marblegallery-item7.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/7.  Cynthia (MS - 3068)_.wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/7. सिंथिया.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Cynthia (MS - 3068).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Cynthia.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/7.  Cynthia (MS - 3068).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/7.  Cynthia _TA.wav',
            telugu: 'audios/Telugu/Telugu_Cynthia_Female.wav',
            urdu: 'audios/Urdu/7.  Cynthia (MS - 3068).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Cynthia (MS - 3068).wav'
        }
    },
    {
        title: 'Bust of a young lady',
        image: 'images/marblegallery-item8.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/8. Bust of a young lady (XLV - 166)_.wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/8. एक युवती की अर्धप्रतिमा.wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Bust of a young lady (XLV - 166).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Bust of a young lady.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/8. Bust of a young lady (XLV - 166).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/8. Bust of a young lady _ TA.wav',
            telugu: 'audios/Telugu/Telugu_Bust of a young lady_Female.wav',
            urdu: 'audios/Urdu/8. Bust of a young lady (XLV - 166).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Bust of a young lady (XLV - 166).wav'
        }
    },
    {
        title: 'Egyptian Priestess (Allegorical Figure)',
        image: 'images/marblegallery-item9.png',
        audios: {
            bengali: 'audios/Bengali/2. MARBLE GALLERY/9. Egyptian Priestess (Allegorical Figure) (XLV - 18).wav',
            hindi: 'audios/Hindi/02. Audio-MARBLE GALLERY/9. मिस्री पुजारिन (रूपकात्मक आकृति).wav',
            kannada: 'audios/Kannada/2.MARBLE GALLERY/Egyptian Priestess (Allegorical Figure) (XLV - 18).wav',
            malayalam: 'audios/Malyalam/Marble Gallery/Egyptian Priestess.wav',
            odia: 'audios/Odia/2. MARBLE GALLERY.or/9. Egyptian Priestess (XLV - 18).wav',
            tamil: 'audios/Tamil/Marble Gallery.ta/9. Egyptian Priestess  _ TA.wav',
            telugu: 'audios/Telugu/Telugu_Egyptian Priestess (Allegorical Figure)_female.wav',
            urdu: 'audios/Urdu/9. Egyptian Priestess (Allegorical Figure) (XLV - 18).wav',
            marathi: 'audios/Marathi/MARBLE GALLERY/Egyptian Priestess (Allegorical Figure) (XLV - 18).wav'
        }
    }
];

function esc(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getContent(language, index) {
    const arr = marbleContent[language];

    if (Array.isArray(arr) && arr[index]) {
        return arr[index];
    }

    return '';
}

function getAudio(language, index, relPath) {
    const audio = items[index].audios[language];

    if (!audio) return '';

    const fullPath = path.join(galleryDir, audio);

    if (fs.existsSync(fullPath)) {
        return relPath + encodeURI(audio);
    }

    return '';
}

function generatePage(index, relPath) {
    const item = items[index];
    const itemNumber = index + 1;

    let languageSections = '';
    const audioMap = {};

    languages.forEach(lang => {
        const content = getContent(lang.id, index);
        const audio = getAudio(lang.id, index, relPath);

        audioMap[lang.id] = audio;

        languageSections += `
        <div class="langCnt" id="${lang.id}" dir="${lang.id === 'urdu' ? 'rtl' : 'ltr'}" style="display:${lang.id === 'hindi' ? 'block' : 'none'};">
            <h2 class="cntHdng">${esc(item.title)}</h2>

            <div class="booImgDiv">
                <img src="${relPath}${item.image}" alt="${esc(item.title)}">
            </div>

            <div class="bookCntDiv">
                <p>${esc(content)}</p>
            </div>
        </div>`;
    });

    const defaultAudio =
        audioMap.hindi ||
        audioMap.bengali ||
        audioMap.kannada ||
        audioMap.malayalam ||
        audioMap.odia ||
        audioMap.tamil ||
        audioMap.telugu ||
        audioMap.urdu ||
        '';

    const languageOptions = languages.map(lang =>
        `<option value="${lang.id}"${lang.id === 'hindi' ? ' selected' : ''}>${lang.label}</option>`
    ).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Marble Gallery - Item ${itemNumber} | Salar Jung Museum</title>

<link rel="stylesheet" href="${relPath}css/bootstrap.min.css">
<link rel="stylesheet" href="${relPath}css/styles.css">

<style>
.audioPlayerDiv {
    max-width: 900px;
    margin: 20px auto;
    padding: 0 15px;
}

.bookContentDiv {
    max-width: 900px;
    margin: 20px auto 40px;
    padding: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,.08);
}

.cntHdng {
    font-size: 26px;
    font-weight: 700;
    color: #a50309;
    margin-bottom: 16px;
    line-height: 1.3;
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
    width: auto;
    object-fit: contain;
}

.bookCntDiv {
    font-size: 16px;
    line-height: 1.8;
    color: #333;
}

.langCnt[dir="rtl"] {
    direction: rtl;
    text-align: right;
}

.navBtnDiv {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 900px;
    margin: 30px auto;
    padding: 0 15px;
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
</style>
</head>

<body>

<div class="sliderHeaderDiv">
    <div class="container">
        <header>

            <div class="logoLft">
                <a href="${relPath}index.html" class="logo logoTwo">
                    <img src="${relPath}images/logo-moc.png"
                         onerror="this.onerror=null;this.src='${relPath}images/logo.png';"
                         alt="Ministry of Culture">
                </a>
            </div>

            <div class="logoRgt">
                <div class="langDiv">

                    <span class="anuIcn">
                        <img src="${relPath}images/logo-anu.png"
                             alt="Anuvadini">
                    </span>

                    <select class="form formLang"
                            id="languageSelector"
                            aria-label="Select language">
                        ${languageOptions}
                    </select>

                </div>
            </div>

        </header>
    </div>
</div>

<main>

<div class="audioPlayerDiv">
    <div style="background:#2e2e2e;color:#fff;padding:15px 20px;border-radius:10px;">
        <p style="margin:0 0 8px;font-size:14px;">
            Audio Explanation
        </p>

        <audio id="languageAudio"
               controls
               preload="metadata"
               style="width:100%;"
               src="${defaultAudio}">
        </audio>
    </div>
</div>

${languageSections}

<div class="navBtnDiv">

    ${itemNumber > 1
        ? `<a href="${relPath}item${itemNumber - 1}.html" class="navBtn">← Previous Item</a>`
        : '<span></span>'}

    <a href="${relPath}index.html" class="navBtn">
        Back to Gallery Overview
    </a>

    ${itemNumber < items.length
        ? `<a href="${relPath}item${itemNumber + 1}.html" class="navBtn">Next Item →</a>`
        : '<span></span>'}

</div>

</main>

<footer>
    <p>© 2024 All rights reserved, By
        <a href="https://anuvadini.aicte-india.org/"
           target="_blank"
           rel="noreferrer">
           Anuvadini AI
        </a>
    </p>
</footer>

<script>

const selector = document.getElementById('languageSelector');
const audioPlayer = document.getElementById('languageAudio');

const audioMap = ${JSON.stringify(audioMap, null, 2)};

function changeLanguage(language) {

    document.querySelectorAll('.langCnt').forEach(function(el) {
        el.style.display =
            el.id === language ? 'block' : 'none';
    });

    const audioSrc = audioMap[language];

    if (audioPlayer && audioSrc) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.src = audioSrc;
        audioPlayer.load();
    }
}

selector.addEventListener('change', function() {
    changeLanguage(this.value);
});

changeLanguage(selector.value);

</script>

</body>
</html>`;
}

// Generate root item pages and item-folder index pages
for (let i = 0; i < items.length; i++) {

    const itemNumber = i + 1;

    // Root page
    const rootItemPath =
        path.join(galleryDir, `item${itemNumber}.html`);

    fs.writeFileSync(
        rootItemPath,
        generatePage(i, './'),
        'utf8'
    );

    // Item folder
    const folderPath =
        path.join(galleryDir, `item${itemNumber}`);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Folder index page
    const subItemPath =
        path.join(folderPath, 'index.html');

    fs.writeFileSync(
        subItemPath,
        generatePage(i, '../'),
        'utf8'
    );

    console.log(`Generated Marble item ${itemNumber}`);
}

console.log('');
console.log('==============================================');
console.log('MARBLE GALLERY BUILD COMPLETED');
console.log('9 item pages generated successfully.');
console.log('==============================================');
