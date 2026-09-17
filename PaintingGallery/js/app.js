document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const langMetaMap = {
    bengali: { code: "bn", dir: "ltr", title: "পেইন্টিং গ্যালারি (Painting Gallery) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "പെയിന്റിംഗ് ഗാലറി (Painting Gallery) | Salar Jung Museum" }
  };

  const footerTranslations = {
    bengali: '© 2024 সর্বস্বত্ব সংরক্ষিত, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">অনুবাদিনী AI</a> দ্বারা',
    malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> മുഖേന'
  };

  const AUDIO_MISSING =
    "🔇 Is bhasha me is vastu ka audio abhi uplabdh nahi hai.";

  function renderCards(language) {
    if (!galleryGrid) return;

    const items = itemsData[language] || itemsData.bengali || [];

    galleryGrid.innerHTML = "";
    items.forEach((item, index) => {
      const article = document.createElement("article");
      article.className = "utility-card";

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
    const meta = langMetaMap[language] || langMetaMap.bengali;
    document.documentElement.lang = meta.code;
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
    updatePageLanguage(languageSelector.value || "bengali");
  }
});
