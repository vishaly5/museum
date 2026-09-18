document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const langMetaMap = {
    bengali: { code: "bn", dir: "ltr", title: "অবশিষ্ট গ্যালারি (Remaining Galleries) | Salar Jung Museum" },
    kannada: { code: "kn", dir: "ltr", title: "ಉಳಿದ ಗ್ಯಾಲರಿಗಳು (Remaining Galleries) | Salar Jung Museum" },
    marathi: { code: "mr", dir: "ltr", title: "उर्वरित गॅलऱ्या (Remaining Galleries) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "باقی نمائش گاہیں (Remaining Galleries) | Salar Jung Museum" }
  };

  const footerTranslations = {
    bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
    kannada: '© 2024 ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">ಅನುವಾದಿನಿ AI</a> ಮೂಲಕ',
    marathi: '© 2024 सर्व हक्क सुरक्षित, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">अनुवादिनी एआय</a> द्वारा',
    urdu: '© 2024 جملہ حقوق محفوظ ہیں، بذریعہ <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">انووادنی AI</a>'
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

      article.innerHTML = `
        <span class="badge-acq">${item.badge}</span>
        <h2><a href="item${itemNum}.html">${item.title}</a></h2>
        <p>${item.desc.split("\n\n").join("<br><br>")}</p>
        ${hasAudio
          ? `<audio class="card-audio" controls preload="none" src="${encodeURI(item.audioSrc)}"></audio>`
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
