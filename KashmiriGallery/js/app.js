document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const itemsData = window.galleryItems || {};

  function escapeAttr(text) {
    return String(text).replace(/"/g, "&quot;");
  }

  function renderCards(language) {
    if (!galleryGrid) return;

    const items = itemsData[language] || itemsData.hindi || [];
    const isRtl = language === "urdu";

    galleryGrid.innerHTML = "";
    items.forEach((item) => {
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
        <audio class="card-audio" controls preload="none" ${hasAudio ? `src="${item.audioSrc}"` : ""}></audio>
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

    // Only one narration plays at a time.
    galleryGrid.querySelectorAll("audio").forEach((player) => {
      player.addEventListener("play", () => {
        galleryGrid.querySelectorAll("audio").forEach((other) => {
          if (other !== player) other.pause();
        });
      });
    });
  }

  function selectLanguage(language) {
    document.querySelectorAll(".langCnt").forEach((content) => {
      content.style.display = content.id === language ? "block" : "none";
    });
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
    selectLanguage(languageSelector.value || "hindi");
  }
});
