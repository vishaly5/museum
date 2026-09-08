document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const singleItemView = document.getElementById("singleItemView");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const urlParams = new URLSearchParams(window.location.search);
  const requestedItem = urlParams.get("item") || urlParams.get("id");

  const langMetaMap = {
    hindi: { code: "hi", dir: "ltr", title: "फ़्रांसीसी एवं अफ़्रीकी दीर्घा (French and African Gallery) | Salar Jung Museum" },
    english: { code: "en", dir: "ltr", title: "French and African Gallery | Salar Jung Museum" },
    telugu: { code: "te", dir: "ltr", title: "ఫ్రెంచ్ మరియు ఆఫ్రికన్ గ్యాలరీ (French and African Gallery) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "فرانسیسی اور افریقی گیلری (French and African Gallery) | Salar Jung Museum" },
    bengali: { code: "bn", dir: "ltr", title: "ফরাসি ও আফ্রিকান গ্যালারি (French and African Gallery) | Salar Jung Museum" },
    gujarati: { code: "gu", dir: "ltr", title: "ફ્રેન્ચ અને આફ્રિકન ગેલેરી (French and African Gallery) | Salar Jung Museum" },
    kannada: { code: "kn", dir: "ltr", title: "ಫ್ರೆಂಚ್ ಮತ್ತು ಆಫ್ರಿಕನ್ ಗ್ಯಾಲರಿ (French and African Gallery) | Salar Jung Museum" },
    odia: { code: "or", dir: "ltr", title: "ଫ୍ରେଞ୍ଚ ଓ ଆଫ୍ରିକୀୟ ଗ୍ୟାଲେରୀ (French and African Gallery) | Salar Jung Museum" },
    marathi: { code: "mr", dir: "ltr", title: "फ्रेंच आणि आफ्रिकन गॅलरी (French and African Gallery) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "ഫ്രഞ്ച്, ആഫ്രിക്കൻ ഗാലറി (French and African Gallery) | Salar Jung Museum" }
  };

  const footerTranslations = {
    hindi: '© 2024 सर्वाधिकार सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी एआई</a> द्वारा',
    english: '© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>',
    telugu: '© 2024 సర్వ హక్కులూ ప్రత్యేకించబడ్డాయి, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">అనువాదిని AI</a> ద్వారా',
    urdu: '© 2024 جملہ حقوق محفوظ ہیں، بذریعہ <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">انووادنی AI</a>',
    bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
    gujarati: '© 2024 સર્વાધિકાર સુરક્ષિત, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">અનુવાક્ય AI</a> દ્વારા',
    kannada: '© 2024 ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ಅನುವಾದಿನಿ AI</a> ಮೂಲಕ',
    odia: '© 2024 ସର୍ବାଧିକାର ସୁରକ୍ଷିତ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ଅନୁବାଦିନୀ AI</a> ଦ୍ୱାରା',
    marathi: '© 2024 सर्व हक्क सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी एआय</a> द्वारा',
    malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> വഴി'
  };

  const backTranslations = {
    hindi: "← पूरी दीर्घा देखें",
    english: "← View Full Gallery",
    telugu: "← పూర్తి గ్యాలరీని చూడండి",
    urdu: "← پوری گیلری دیکھیں",
    bengali: "← সম্পূর্ণ গ্যালারি দেখুন",
    gujarati: "← પૂરી ગેલેરી જુઓ",
    kannada: "← ಸಂಪೂರ್ಣ ಗ್ಯಾಲರಿ ನೋಡಿ",
    odia: "← ସମ୍ପୂର୍ଣ୍ଣ ଗ୍ୟାଲେରୀ ଦେଖନ୍ତୁ",
    marathi: "← संपूर्ण गॅलरी पहा",
    malayalam: "← പൂർണ്ണ ഗാലറി കാണുക"
  };

  const AUDIO_MISSING = "🔇 Is bhasha me is vastu ka audio abhi uplabdh nahi hai.";

  function escapeAttr(text) {
    return String(text).replace(/"/g, "&quot;");
  }

  function getItemIndex(items, req) {
    if (!req) return -1;
    const num = parseInt(req, 10);
    if (!isNaN(num) && num >= 1 && num <= items.length) {
      return num - 1;
    }
    return items.findIndex(item => item.id && String(item.id).toLowerCase() === String(req).toLowerCase());
  }

  function renderSingleItem(language, itemIndex) {
    if (!singleItemView) return;
    const items = itemsData[language] || itemsData.hindi || [];
    const item = items[itemIndex] || items[0];
    if (!item) return;

    const isRtl = language === "urdu";
    const hasAudio = item.audioSrc && item.audioSrc.trim() !== "";
    const backText = backTranslations[language] || backTranslations.english;

    singleItemView.innerHTML = `
      <div class="single-item-container bookContentDiv">
        <div class="single-item-nav">
          <a href="index.html" class="back-to-gallery-btn">${backText}</a>
          <span class="single-item-badge">${item.badge || ""}</span>
        </div>
        <h2 class="cntHdng" ${isRtl ? 'dir="rtl" style="text-align:right;"' : ''}>${item.title}</h2>
        <div class="booImgDiv">
          <img src="${item.image}" onerror="this.style.display='none';" alt="${escapeAttr(item.title)}">
        </div>
        <div class="bookCntDiv">
          <div class="audioPlayerDiv">
            ${
              hasAudio
                ? `<audio controls class="w-100" src="${encodeURI(item.audioSrc)}"></audio>`
                : `<div class="audio-missing-note">${AUDIO_MISSING}</div>`
            }
          </div>
          <div class="single-item-desc" ${isRtl ? 'dir="rtl" style="text-align:right;"' : ''}>${item.desc.split("\n\n").join("<br><br>")}</div>
        </div>
      </div>
    `;
  }

  function renderCards(language) {
    if (!galleryGrid) return;
    const items = itemsData[language] || itemsData.hindi || [];
    const isRtl = language === "urdu";

    galleryGrid.innerHTML = "";
    items.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "utility-card";
      const hasAudio = item.audioSrc && item.audioSrc.trim() !== "";

      article.innerHTML = `
        <div class="img-container">
          <img src="${item.image}" onerror="this.style.display='none';" alt="${escapeAttr(item.title)}">
        </div>
        <span class="badge-acq">${item.badge}</span>
        <h2>${item.title}</h2>
        <p>${item.desc.split("\n\n").join("<br><br>")}</p>
        ${
          hasAudio
            ? `<audio class="card-audio" controls preload="none" src="${encodeURI(item.audioSrc)}"></audio>`
            : `<div class="audio-missing-note">${AUDIO_MISSING}</div>`
        }
        <a href="item${index + 1}.html" style="display:inline-block; margin-top:12px; font-size:14px; font-weight:bold; color:#ab2528; text-decoration:none; padding:8px 14px; border:1px solid #ab2528; border-radius:6px; background:#fff;">🔗 Open Single Page (Item ${index + 1})</a>
      `;

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
    const meta = langMetaMap[language] || langMetaMap.hindi;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    document.title = meta.title;

    const items = itemsData[language] || itemsData.hindi || [];
    const itemIndex = getItemIndex(items, requestedItem);

    if (itemIndex !== -1) {
      // Single Item View mode
      document.querySelectorAll(".langCnt").forEach((content) => {
        content.style.display = "none";
      });
      if (galleryGrid) galleryGrid.style.display = "none";
      if (singleItemView) singleItemView.style.display = "block";
      renderSingleItem(language, itemIndex);
    } else {
      // Full Gallery View mode
      document.querySelectorAll(".langCnt").forEach((content) => {
        content.style.display = content.id === language ? "block" : "none";
      });
      if (galleryGrid) galleryGrid.style.display = "grid";
      if (singleItemView) singleItemView.style.display = "none";
      renderCards(language);
    }

    if (footerText) {
      footerText.innerHTML = footerTranslations[language] || footerTranslations.english;
      if (meta.dir === "rtl") {
        footerText.setAttribute("dir", "rtl");
      } else {
        footerText.removeAttribute("dir");
      }
    }
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
    selectLanguage(languageSelector.value || "hindi");
  }
});
