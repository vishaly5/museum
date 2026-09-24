document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const langMetaMap = {
    bengali: { code: "bn", dir: "ltr", title: "à¦…à¦¬à¦¶à¦¿à¦·à§à¦Ÿ à¦—à§à¦¯à¦¾à¦²à¦¾à¦°à¦¿ (Remaining Galleries) | Salar Jung Museum" },
    kannada: { code: "kn", dir: "ltr", title: "à²‰à²³à²¿à²¦ à²—à³à²¯à²¾à²²à²°à²¿à²—à²³à³ (Remaining Galleries) | Salar Jung Museum" },
    marathi: { code: "mr", dir: "ltr", title: "à¤‰à¤°à¥à¤µà¤°à¤¿à¤¤ à¤—à¥…à¤²à¤±à¥à¤¯à¤¾ (Remaining Galleries) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "Ø¨Ø§Ù‚ÛŒ Ù†Ù…Ø§Ø¦Ø´ Ú¯Ø§ÛÛŒÚº (Remaining Galleries) | Salar Jung Museum" },
    gujarati: { code: "gu", dir: "ltr", title: "àª¬àª¾àª•à«€ àª°àª¹à«‡àª²à«€ àª—à«‡àª²à«‡àª°à«€àª“ (Remaining Galleries) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "à´¶àµ‡à´·à´¿à´•àµà´•àµà´¨àµà´¨ à´—à´¾à´²à´±à´¿à´•àµ¾ (Remaining Galleries) | Salar Jung Museum" },
    odia: { code: "or", dir: "ltr", title: "à¬…à¬¬à¬¶à¬¿à¬·à­à¬Ÿ à¬—à­à­Ÿà¬¾à¬²à­‡à¬°à­€ (Remaining Galleries) | Salar Jung Museum" },
    telugu: { code: "te", dir: "ltr", title: "à°®à°¿à°—à°¿à°²à°¿à°¨ à°—à±à°¯à°¾à°²à°°à±€à°²à± (Remaining Galleries) | Salar Jung Museum" },
    tamil: { code: "ta", dir: "ltr", title: "à®®à¯€à®¤à®®à¯à®³à¯à®³ à®•à®¾à®Ÿà¯à®šà®¿à®•à¯à®•à¯‚à®Ÿà®™à¯à®•à®³à¯ (Remaining Galleries) | Salar Jung Museum" }
  };
  const footerTranslations = {
    bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
    hindi: '© 2024 सर्वाधिकार सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी AI</a> द्वारा',
    english: '© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a>',
    kannada: '© 2024 ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ಅನುವಾದಿನಿ AI</a> ಮೂಲಕ',
    marathi: '© 2024 सर्व हक्क सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी एआय</a> द्वारा',
    urdu: '© 2024 جملہ حقوق محفوظ ہیں، بذریعہ <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">انووادنی AI</a>',
    gujarati: '© 2024 સર્વાધિકાર સુરક્ષિત, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">અનુવાદિની AI</a> દ્વારા',
    malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> മുഖേന',
    odia: '© 2024 ସର୍ବସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ଅନୁବାଦିନୀ AI</a> ଦ୍ୱାରା',
    telugu: '© 2024 అన్ని హక్కులూ ప్రత్యేకించబడ్డాయి, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">అనువాదిని AI</a> ద్వారా',
    tamil: '© 2024 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">அனுவாதினி AI</a> மூலம்'
  };

  const AUDIO_MISSING =
    "ðŸ”‡ Is bhasha me is vastu ka audio abhi uplabdh nahi hai.";

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

      article.innerHTML = `
        <span class="badge-acq">${item.badge}</span>
        <h2><a href="item${itemNum}.html">${item.title}</a></h2>
        <p>${item.desc.split("\n\n").join("<br><br>")}</p>
        ${hasAudio
          ? `<audio class="card-audio" controls preload="none" src="${item.audioSrc}"></audio>`
          : `<div class="audio-missing-note">${AUDIO_MISSING}</div>`}
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

