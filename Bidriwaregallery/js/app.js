document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("galleryGrid");
  const languageSelector = document.getElementById("languageSelector");
  const footerText = document.getElementById("footerText");
  const itemsData = window.galleryItems || {};

  const langMetaMap = {
    hindi: { code: "hi", dir: "ltr", title: "बिद्री कला दीर्घा (Bidri Ware Gallery) | Salar Jung Museum" },
    english: { code: "en", dir: "ltr", title: "Bidri Ware Gallery | Salar Jung Museum" },
    telugu: { code: "te", dir: "ltr", title: "బిద్రి శిల్ప గ్యాలరీ (Bidri Ware Gallery) | Salar Jung Museum" },
    urdu: { code: "ur", dir: "rtl", title: "بدری ویئر گیلری (Bidri Ware Gallery) | Salar Jung Museum" },
    bengali: { code: "bn", dir: "ltr", title: "বিদ্রি শিল্প গ্যালারি (Bidri Ware Gallery) | Salar Jung Museum" },
    gujarati: { code: "gu", dir: "ltr", title: "બિદ્રી શિલ્પ ગેલેરી (Bidri Ware Gallery) | Salar Jung Museum" },
    kannada: { code: "kn", dir: "ltr", title: "ಬಿದ್ರಿ ಕಲಾ ಗ್ಯಾಲರಿ (Bidri Ware Gallery) | Salar Jung Museum" },
    odia: { code: "or", dir: "ltr", title: "ବିଦ୍ରି କଳା ଗ୍ୟାଲେରୀ (Bidri Ware Gallery) | Salar Jung Museum" },
    marathi: { code: "mr", dir: "ltr", title: "बिद्री कला गॅलरी (Bidri Ware Gallery) | Salar Jung Museum" },
    malayalam: { code: "ml", dir: "ltr", title: "ബിദ്രി വെയർ ഗാലറി (Bidri Ware Gallery) | Salar Jung Museum" },
    tamil: { code: "ta", dir: "ltr", title: "பித்ரிவேர் கேலரி (Bidri Ware Gallery) | Salar Jung Museum" }
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
    malayalam: '© 2024 എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തമാണ്, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">അനുവാദിനി AI</a> വഴി',
    tamil: '© 2024 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை, <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">அனுவாதுனி AI</a> மூலம்'
  };

  const TTS_LABEL = {
    hindi: "🔊 पाठ सुनें", english: "🔊 Listen to text", telugu: "🔊 వచనం వినండి",
    urdu: "🔊 متن سنیں", bengali: "🔊 লেখা শুনুন", gujarati: "🔊 લખાણ સાંભળો",
    kannada: "🔊 ಪಠ್ಯ ಕೇಳಿ", odia: "🔊 ପାଠ ଶୁଣନ୍ତୁ", marathi: "🔊 मजकूर ऐका",
    malayalam: "🔊 വാചകം കേൾക്കുക", tamil: "🔊 உரையைக் கேளுங்கள்"
  };

  const TTS_LANG = {
    hindi: "hi-IN", english: "en-IN", telugu: "te-IN", urdu: "ur-PK",
    bengali: "bn-IN", gujarati: "gu-IN", kannada: "kn-IN", odia: "or-IN",
    marathi: "mr-IN", malayalam: "ml-IN", tamil: "ta-IN"
  };

  function speakCard(button, text, language) {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const label = button.dataset.idleLabel || button.textContent;
    button.dataset.idleLabel = label;

    if (synth.speaking) {
      synth.cancel();
      if (button.dataset.speaking === "1") {
        button.dataset.speaking = "";
        button.textContent = label;
        return;
      }
    }
    document.querySelectorAll("audio").forEach((a) => a.pause());

    const u = new SpeechSynthesisUtterance(text);
    u.lang = TTS_LANG[language] || "hi-IN";
    u.rate = 0.95;
    const voice = synth.getVoices().find((v) => v.lang === u.lang)
      || synth.getVoices().find((v) => v.lang.split("-")[0] === u.lang.split("-")[0]);
    if (voice) u.voice = voice;

    u.onend = u.onerror = () => {
      button.dataset.speaking = "";
      button.textContent = label;
    };
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
          : `<div class="card-actions">
               <button type="button" class="btn-tts" aria-label="Listen to text">${TTS_LABEL[language] || TTS_LABEL.hindi}</button>
             </div>`}
      `;

      if (isRtl) article.setAttribute("dir", "rtl");

      const audioElement = article.querySelector(".card-audio");
      if (audioElement) {
        audioElement.addEventListener("play", () => {
          if ("speechSynthesis" in window) window.speechSynthesis.cancel();
          document.querySelectorAll("audio").forEach((a) => {
            if (a !== audioElement) a.pause();
          });
        });
      }

      const ttsBtn = article.querySelector(".btn-tts");
      if (ttsBtn) {
        ttsBtn.addEventListener("click", () => {
          const textToRead = `${item.title}. ${item.desc}`;
          speakCard(ttsBtn, textToRead, language);
        });
      }

      galleryGrid.appendChild(article);
    });

    document.querySelectorAll(".langCnt").forEach((el) => {
      el.style.display = el.id === language ? "block" : "none";
    });

    const meta = langMetaMap[language] || langMetaMap.hindi;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.dir;
    document.title = meta.title;

    if (footerText && footerTranslations[language]) {
      footerText.innerHTML = footerTranslations[language];
    }
  }

  if (languageSelector) {
    languageSelector.addEventListener("change", (e) => {
      renderCards(e.target.value);
    });
    renderCards(languageSelector.value || "hindi");
  } else {
    renderCards("hindi");
  }
});
