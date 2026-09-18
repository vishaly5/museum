document.addEventListener("DOMContentLoaded", () => {
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

      article.innerHTML = `
        <span class="badge-acq">${item.badge}</span>
        <div class="img-container">
          <img src="${item.imgSrc}" alt="${item.title}" onerror="this.onerror=null; this.src='./images/logo.png';">
        </div>
        <h2><a href="${item.itemUrl}">${itemNum}. ${item.title}</a></h2>
        <div class="card-audio">
          ${
            hasAudio
              ? `<audio controls preload="none">
                  <source src="${item.audioSrc}" type="audio/wav">
                  Your browser does not support the audio element.
                </audio>`
              : `<div class="audio-missing-note">${AUDIO_MISSING}</div>`
          }
        </div>
        <div class="card-meta" style="font-size: 13px; font-weight: bold; color: #a50309; margin-bottom: 8px;">
          ${item.meta}
        </div>
        <div class="card-desc" style="font-size: 14px; color: #555; line-height: 1.6; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical;">
          ${item.paras[0] || ''}
        </div>
      `;

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
