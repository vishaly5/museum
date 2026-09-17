(function () {
  "use strict";

  var items = [
    ["Leda and the Swan (XLV - 17)", "This marble sculpture shows Leda and the Swan, a famous story from Greek mythology. Zeus changes himself into a swan and approaches Leda. Leda sits in a gentle pose, holding the swan close, while the smooth marble and detailed carving of feathers and drapery show the sculptor's skill. This work is a copy of an ancient Greek theme traditionally connected to the sculptor Timothies'."],
    ["Pillar Shaped as Female (Greek Mythological Figure) (AK - 22)", "This marble sculpture is both a pillar and a female figure, combining architecture and art. Inspired by Greek mythology, it represents a woman connected with nature and celebration. She wears a crown of grapes and a goat skin, symbols associated with Dionysus, the Greek god of wine, fertility and festivity. The pillar-like lower part is decorated with floral designs."],
    ["L. Automne (AK - 24)", "This marble statue shows a semi-nude young woman standing in a graceful pose. She holds grapes in her right hand and more fruits in the fold of her dress, while a wreath of grape leaves decorates her head. The statue represents Autumn, the season of harvest. Grapes and fruits symbolize abundance, fertility and prosperity."],
    ["Venus and Mars (XLV - 161) (War and Peace)", "Mars is shown with a spear and helmet, identifying him as the god of war. Venus is the Roman goddess of love, beauty and fertility. When Venus stands near Mars, he appears calmer, showing that love can control war and reduce violence. The sculpture expresses the harmony possible when love and strength are balanced."],
    ["Cleopatra - Queen of Egypt (XLV - 151)", "This marble sculpture shows Cleopatra VII, the last queen of ancient Egypt. Made in Italy around 1870-1880, it depicts the final moment of her life. After losing her kingdom to the Romans, she chose death rather than captivity, represented by the poisonous snake in her hand. Her calm face and graceful pose express courage, dignity and royal pride."],
    ["Apollo and Daphne (XLV - 133)", "This marble sculpture shows a famous scene from Greek mythology. Apollo, god of music and light, falls in love with Daphne, a forest nymph. Daphne asks the gods for protection and begins transforming into a laurel tree. Her raised hands become leaves while Apollo reaches toward her in surprise and sadness. It is a nineteenth-century Italian sculpture signed by Pietro Bazzanti of Florence."],
    ["Cynthia (MS - 3068)", "Cynthia is the Greek goddess known as Diana in Roman mythology. She is the goddess of the moon, forests, wild animals and purity. The crescent moon on her forehead is her main symbol, while the globe beneath her feet represents the universe and the star in her hand represents light and hope. Her calm pose expresses peace, balance and divine strength."],
    ["Bust of a Young Lady (XLV - 166)", "This marble sculpture shows the bust of a young lady wearing a frilly cap and beautifully decorated dress. She holds two small berries in her mouth, giving her a playful and cheerful look. The artist carefully carved the lace collar, puffed sleeves and flowers. The berries may symbolize youth and enjoyment of life, while the flowers represent freshness and femininity."],
    ["Egyptian Priestess (Allegorical Figure) (XLV - 18)", "This marble statue shows a woman imagined as an Egyptian priestess. She stands calmly with her hands raised, suggesting prayer or an offering to the gods. She wears a double necklace with a winged Egyptian head pendant, a symbol of protection, divine power and spirituality. The statue reflects European classical styles inspired by Greek and Roman sculpture and shows the influence of ancient Egypt on nineteenth-century European art."]
  ];

  var audioFiles = [
    "1. Leda and the Swan (XLV - 17).wav",
    "2.Pillar Shaped as Female.wav",
    "3. L. AUTOMME (AK - 24).wav",
    "4. Venus and Mars (XLV - 161).wav",
    "5. Cleopatra – Queen of Egypt (XLV - 151).wav",
    "6. Apollo and Daphne (XLV - 133).wav",
    "7.  Cynthia (MS - 3068).wav",
    "8. Bust of a young lady (XLV - 166).wav",
    "9. Egyptian Priestess (Allegorical Figure) (XLV - 18).wav"
  ];

  function path(value) {
    return value.split("/").map(encodeURIComponent).join("/");
  }

  function addOption() {
    var selector = document.getElementById("languageSelector");
    if (selector && !selector.querySelector('option[value="english"]')) {
      selector.insertAdjacentHTML("beforeend", '<option value="english">English</option>');
    }
    return selector;
  }

  function applyEnglish() {
    var selector = document.getElementById("languageSelector");
    var cards = document.querySelectorAll(".item-card");
    if (cards.length) {
      cards.forEach(function (card, index) {
        if (!items[index]) return;
        var title = card.querySelector("[data-card-title]");
        var content = card.querySelector("[data-card-content]");
        if (title) title.textContent = items[index][0];
        if (content) content.textContent = items[index][1];
        var audio = card.querySelector("audio");
        if (audio) {
          audio.src = "./audios/English/" + path(audioFiles[index]);
          audio.load();
        }
      });
    } else {
      var number = Number((location.pathname.match(/item(\d+)\.html$/i) || [])[1]);
      if (!number || !items[number - 1]) return;
      var section = document.getElementById("english");
      if (!section) {
        section = document.createElement("div");
        section.className = "langCnt";
        section.id = "english";
        section.dir = "ltr";
        section.innerHTML = '<h2 class="cntHdng"></h2><div class="booImgDiv"><img alt=""></div><div class="bookCntDiv"><p></p></div>';
        var first = document.querySelector(".langCnt");
        if (first && first.parentNode) first.parentNode.insertBefore(section, first);
      }
      section.querySelector(".cntHdng").textContent = items[number - 1][0];
      section.querySelector("img").src = "./images/marblegallery-item" + number + ".png";
      section.querySelector("img").alt = items[number - 1][0];
      section.querySelector("p").textContent = items[number - 1][1];
      var player = document.getElementById("languageAudio");
      if (player) {
        player.src = "./audios/English/" + path(audioFiles[number - 1]);
        player.load();
      }
    }
    document.querySelectorAll(".langCnt").forEach(function (element) {
      element.style.display = element.id === "english" ? "block" : "none";
    });
    if (selector) selector.value = "english";
  }

  var selector = addOption();
  if (selector) selector.addEventListener("change", function () {
    if (selector.value === "english") setTimeout(applyEnglish, 0);
  });
})();
