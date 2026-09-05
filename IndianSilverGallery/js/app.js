document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");
  const galleryGrid = document.getElementById("galleryGrid");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const langMetaMap = {
    hindi: { code: "hi", dir: "ltr", title: "भारतीय रजत दीर्घा (Indian Silver Gallery) | Salar Jung Museum" },
    english: { code: "en", dir: "ltr", title: "Indian Silver Gallery | Salar Jung Museum" },
    telugu: { code: "te", dir: "ltr", title: "భారతీయ వెండి గ్యాలరీ (Indian Silver Gallery) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "ہندوستانی چاندی گیلری (Indian Silver Gallery) | Salar Jung Museum" },
    bengali: { code: "bn", dir: "ltr", title: "ভারতীয় রৌপ্য গ্যালারি (Indian Silver Gallery) | Salar Jung Museum" },
    gujarati: { code: "gu", dir: "ltr", title: "ભારતીય ચાંદી ગેલેરી (Indian Silver Gallery) | Salar Jung Museum" },
    kannada: { code: "kn", dir: "ltr", title: "ಭಾರತೀಯ ಬೆಳ್ಳಿ ಗ್ಯಾಲರಿ (Indian Silver Gallery) | Salar Jung Museum" },
    odia: { code: "or", dir: "ltr", title: "ଭାରତୀୟ ରୌପ୍ୟ ଗ୍ୟାଲେରୀ (Indian Silver Gallery) | Salar Jung Museum" },
    marathi: { code: "mr", dir: "ltr", title: "भारतीय चांदी गॅलरी (Indian Silver Gallery) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "ഇന്ത്യൻ വെള്ളി ഗാലറി (Indian Silver Gallery) | Salar Jung Museum" }
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

  const AUDIO_MISSING =
    "🔇 Is bhasha me is vastu ka audio abhi uplabdh nahi hai.";

  const TTS_LABEL = {
    hindi: "🔊 पाठ सुनें", english: "🔊 Listen to text", telugu: "🔊 వచనం వినండి",
    urdu: "🔊 متن سنیں", bengali: "🔊 লেখা শুনুন", gujarati: "🔊 લખાણ સાંભળો",
    kannada: "🔊 ಪಠ್ಯ ಕೇಳಿ", odia: "🔊 ପାଠ ଶୁଣନ୍ତୁ", marathi: "🔊 मजकूर ऐका",
    malayalam: "🔊 വാചകം കേൾക്കുക"
  };

  // Speech-synthesis voice tag per language, for the read-aloud fallback.
  const TTS_LANG = {
    hindi: "hi-IN", english: "en-IN", telugu: "te-IN", urdu: "ur-PK",
    bengali: "bn-IN", gujarati: "gu-IN", kannada: "kn-IN", odia: "or-IN",
    marathi: "mr-IN", malayalam: "ml-IN"
  };

  function speakCard(button, text, language) {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const label = button.dataset.idleLabel || button.textContent;
    button.dataset.idleLabel = label;

    if (synth.speaking) {
      synth.cancel();
      if (button.dataset.speaking === "1") { button.dataset.speaking = ""; button.textContent = label; return; }
    }
    document.querySelectorAll("audio").forEach((a) => a.pause());

    const u = new SpeechSynthesisUtterance(text);
    u.lang = TTS_LANG[language] || "hi-IN";
    u.rate = 0.95;
    const voice = synth.getVoices().find((v) => v.lang === u.lang)
      || synth.getVoices().find((v) => v.lang.split("-")[0] === u.lang.split("-")[0]);
    if (voice) u.voice = voice;
    u.onend = u.onerror = () => { button.dataset.speaking = ""; button.textContent = label; };
    button.dataset.speaking = "1";
    button.textContent = "⏹ " + label.replace(/^\S+\s*/, "");
    synth.speak(u);
  }

  function escapeAttr(text) {
    return String(text).replace(/"/g, "&quot;");
  }

  function renderCards(language) {
    if (!galleryGrid) return;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

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
        ${hasAudio
          ? `<audio class="card-audio" controls preload="none" src="${encodeURI(item.audioSrc)}"></audio>`
          : `<button type="button" class="tts-btn">${TTS_LABEL[language] || TTS_LABEL.english}</button>`}
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

      const ttsBtn = article.querySelector(".tts-btn");
      if (ttsBtn) {
        ttsBtn.addEventListener("click", () => speakCard(ttsBtn, item.title + ". " + item.desc, language));
      }

      galleryGrid.appendChild(article);
    });

    // Only one narration plays at a time.
    galleryGrid.querySelectorAll("audio").forEach((player) => {
      player.addEventListener("play", () => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
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

    document.querySelectorAll(".langCnt").forEach((content) => {
      content.style.display = content.id === language ? "block" : "none";
    });

    if (footerText) {
      footerText.innerHTML = footerTranslations[language] || footerTranslations.english;
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
    selectLanguage(languageSelector.value || "hindi");
  }
});
