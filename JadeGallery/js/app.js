document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById("languageSelector");

  const itemAudioByLanguage = {
    hindi: {
      files: [
        "तीरंदाजी की अंगूठी.wav",
        "संदूकची.wav",
        "घड़ी.wav",
        "तोते की आकृति.wav",
        "कर्द (नूरजहाँ की फल काटने की छुरी).wav",
        "जम्बिया.wav",
        "खंजरअली.wav",
        "हार.wav",
        "कलम और दवात रखने का आधार.wav",
        "पेशकब्ज़.wav",
        "परदे के आकार का फोटो फ्रेम.wav",
        "ट्रे के साथ मसाला डिब्बा.wav",
        "सम्राट जहाँगीर की शिकार की छुरी.wav"
      ]
    },
    bengali: {
      files: [
        "bengali-ArcheryRing.wav",
        "bengali-Casket.wav",
        "bengali-Clock.wav",
        "bengali-Figure-of-a-Parrot_.wav",
        "bengali-fruit-knife-of-Noor-Jahan).wav",
        "bengali-Jambia.wav",
        "bengali-casket_.wav",
        "bengali-Necklace.wav",
        "bengali-Pen-and-ink-stand.wav",
        "bengali-Peshqabz.wav",
        "bengali-ScreenShapedPhotoFrame.wav",
        "bengali-SpiceBoxwithTray.wav",
        "bengali-(knife)ofEmperorJahangir.wav"
      ]
    },
    gujarati: {
      files: [
        "guj- Archery Ring.wav",
        "guj-Casket.wav",
        "guj-Clock.wav",
        "guj- Figure of a Parrot.wav",
        "guj-Kard (fruit knife of Noor Jahan).wav",
        "guj- Jambia.wav",
        "guj- Khanjarali.wav",
        "guj-Necklace.wav",
        "guj- Pen and ink stand.wav",
        "guj-Peshqabz.wav",
        "guj- Screen Shaped Photo Frame.wav",
        "guj- Spice Box with Tray.wav",
        "guj-Kard (knife) of Emperor Jahangir.wav"
      ]
    },
    kannada: {
      files: [
        "kannada-Acc No XLIX-1338 Archery Ring-.wav",
        "kannada-Acc No ACQ-90-39 Casket -.wav",
        "kannada-Acc No ACQ-63-89 Clock-.wav",
        "kannada-Acc No XLIX-188 Figure of a Parrot -.wav",
        "kannada-Acc No XLIX- 312 Kard (fruit knife of Noor Jahan)-.wav",
        "kannada-Acc No XLIX-324 Jambia-.wav",
        "kannada-Acc No XLIX-329 Khanjarali-.wav",
        "kannada-Acc No XLIX-1520 Necklace -.wav",
        "kannada-Acc No CS-IV-128 Pen and ink stand-.wav",
        "kannada-Acc No XLIX-323 Peshqabz -.wav",
        "kannada-Acc No XLIX-1636 Screen Shaped Photo Frame -.wav",
        "kannada-Acc No XLIX-205 Spice Box with Tray-.wav",
        "kannada-Acc No XLIX-311 Kard (knife) of Emperor Jahangir-.wav"
      ]
    },
    marathi: {
      files: [
        "mar-Archery Ring.wav",
        "mar-Casket.wav",
        "mar-Clock.wav",
        "mar-Figure of a Parrot.wav",
        "mar-Kard (fruit knife of Noor Jahan).wav",
        "mar-Jambia.wav",
        "mar-Khanjarali.wav",
        "mar-Necklace.wav",
        "mar-Pen and ink stand.wav",
        "mar-Peshqabz.wav",
        "mar-Screen Shaped Photo Frame.wav",
        "mar-Spice Box with Tray.wav",
        "mar-Kard (knife) of Emperor Jahangir.wav"
      ]
    },
    odia: {
      files: [
        "odia-Acc No XLIX-1338 Archery Ring.wav",
        "odia-Acc No ACQ-90-39 Casket.wav",
        "odia-Acc No ACQ-63-89 Clock.wav",
        "odia-Acc No XLIX-188 Figure of a Parrot.wav",
        "odia-Acc No XLIX- 312 Kard (fruit knife of Noor Jahan).wav",
        "odia-Acc No XLIX-324 Jambia.wav",
        "odia-Acc No XLIX-329 Jambia.wav",
        "odia-Acc No XLIX-1520 Necklace.wav",
        "odia-Acc No CS-IV-128 Pen and ink stand.wav",
        "odia-Acc No XLIX-323 Peshqabz.wav",
        "odia-Acc No XLIX-1636 Screen Shaped Photo Frame.wav",
        "odia-Acc No XLIX-205 Spice Box with Tray.wav",
        "odia-Acc No XLIX-311 Kard (knife) of Emperor Jahangir.wav"
      ]
    },
    tamil: {
      files: [
        "tamil-Archery Ring.wav",
        "tamil-Casket.wav",
        "tamil-Clock.wav",
        "tamil-Figure of a Parrot.wav",
        "tamil- Kard (fruit knife of Noor Jahan).wav",
        "tamil-Jambia.wav",
        "tamil-Khanjarali.wav",
        "tamil-Necklace.wav",
        "tamil-Pen and ink stand.wav",
        "tamil-Peshqabz.wav",
        "tam-Screen Shaped Photo Frame.wav",
        "tamil-Spice Box with Tray.wav",
        "tamil- Kard (knife) of Emperor Jahangir.wav"
      ]
    },
    telugu: {
      files: [
        "Telugu_Archery Ring_Female.wav",
        "Telugu_Casket_Female.wav",
        "Telugu_ACQ-63-89 Clock_Female.wav",
        "Telugu_Figure of a Parrot_Female.wav",
        "Telugu_Kard (fruit knife of Noor Jahan_Female.wav",
        "Telugu_Jambia_Female.wav",
        "Telugu_Jambia_Female.wav",
        "Telugu_Necklace_Female.wav",
        "Telugu_Pen and ink stand_Female.wav",
        "Telugu_Peshqabz_Female.wav",
        "Telugu_Screen Shaped Photo Frame_Female.wav",
        "Telugu_Spice Box with Tray_Female.wav",
        "Telugu_Kard (knife) of Emperor Jahangir_Female.wav"
      ]
    },
    urdu: {
      files: [
        "urdu-Archery Ring.wav",
        "urdu-Casket.wav",
        "urdu-Clock.wav",
        "urdu-Figure of a Parrot.wav",
        "urdu-Kard (fruit knife of Noor Jahan).wav",
        "urdu-Jambia.wav",
        null,
        "urdu-Necklace.wav",
        "urdu-Pen and ink stand.wav",
        "urdu-Peshqabz.wav",
        "urdu-Screen Shaped Photo Frame.wav",
        "urdu-Spice Box with Tray.wav",
        "urdu-Kard (knife) of Emperor Jahangir.wav"
      ]
    }
  };

  const itemsData = window.jadeItemsData || {};

  function updateCards(language) {
    const cards = document.querySelectorAll(".utility-card");
    const langData = itemsData[language] || itemsData.hindi;
    const audioData = itemAudioByLanguage[language];
    const isRtl = language === "urdu";

    cards.forEach((card, index) => {
      const audio = card.querySelector(".card-audio");
      const filename = audioData && audioData.files[index];
      if (audio) {
        audio.pause();
        if (filename) {
          audio.src = "audio/" + encodeURIComponent(filename);
        } else {
          audio.removeAttribute("src");
          audio.load();
        }
      }

      const item = langData && langData[index];
      if (!item) return;

      const title = card.querySelector("h2");
      const badge = card.querySelector(".badge-acq");
      const description = card.querySelector("p");
      if (title) title.textContent = item.title;
      if (badge) badge.textContent = item.badge;
      if (description) {
        description.innerHTML = item.desc.replace(/\n\n/g, "<br><br>");
        description.dir = isRtl ? "rtl" : "ltr";
        description.style.textAlign = isRtl ? "right" : "justify";
      }
      if (title) {
        title.dir = isRtl ? "rtl" : "ltr";
        title.style.textAlign = isRtl ? "right" : "left";
      }
      if (badge) badge.dir = isRtl ? "rtl" : "ltr";
    });
  }

  function selectLanguage(language) {
    document.querySelectorAll(".langCnt").forEach((content) => {
      content.style.display = content.id === language ? "block" : "none";
    });
    updateCards(language);
  }

  const anuIcn = document.querySelector(".anuIcn");
  if (anuIcn && languageSelector) {
    anuIcn.style.cursor = "pointer";
    anuIcn.addEventListener("click", () => {
      languageSelector.focus();
      if (typeof languageSelector.showPicker === "function") {
        try {
          languageSelector.showPicker();
        } catch (error) {
          languageSelector.click();
        }
      } else {
        languageSelector.click();
      }
    });
  }

  if (languageSelector) {
    languageSelector.addEventListener("change", () => {
      selectLanguage(languageSelector.value);
    });
    selectLanguage(languageSelector.value || "hindi");
  }

  document.querySelectorAll("audio").forEach((player) => {
    player.addEventListener("play", () => {
      document.querySelectorAll("audio").forEach((other) => {
        if (other !== player) other.pause();
      });
    });
  });
});