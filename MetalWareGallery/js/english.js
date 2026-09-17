(function () {
  "use strict";

  var items = [
    ["ACQ-86-19: Temple Conch", "A Shaivite temple conch elaborately decorated with bronze work on either end. The decoration includes reversed snakes, peacocks, Nandi, Ganesha, Shivalinga and a Yali with a mythological lion. It belongs to India and dates to the early nineteenth century CE."],
    ["ACQ-86-12: Bed Post", "An ornamental bed-post part representing an elephant attacked by a lion. It is made of copper and brass, with the elephant standing on its hind legs, richly caparisoned, and scenes of a dancing woman and turbaned horsemen. It dates to the nineteenth century CE."],
    ["XLIV-461: Tray", "A Ganga-Jamni leaf-shaped flat filigree tray with creeper designs in arch-shaped panels and eight-petalled flowers. Karimnagar in Telangana is famous for delicate silver filigree work. The tray was made for the traditional serving of paan and dates to the nineteenth century CE."],
    ["XXV-198: Vase", "A silver vase with convex fluted designs and three panels above the base. Its embossed scenes include the churning of the milky ocean, hunting scenes and Dashavatar figures, with leafy designs, dancing figures, a domed lid and a Hanuman-shaped knob. It belongs to India and dates to the late nineteenth century CE."],
    ["XXVIII-138: Mirror with Stand", "A metal mirror stand with a round mirror and cover showing Afrasiyab seated with two attendants in a black-and-white painting. The flower-shaped frame has creeper designs and gold flowers, while the stand depicts social life and floral decoration. It belongs to Persia, or Iran, and dates to the nineteenth century CE."],
    ["ACQ-86-3: Plate", "A circular shallow metal plate made with copper and gold. It is decorated with flowers and creeper designs in gold, four leaf-shaped panels and Persian inscriptions in cartouches. The plate belongs to Punjab, India, and dates to the nineteenth century CE."],
    ["XLIV-216: Box", "A tall rectangular silver box resting on four lion-paw-shaped legs. Its hinged lid has embossed creepers and Hindu mythological figures with a Lakshmi-shaped knob. The central panel shows Sheshashayanamurthy, Lord Vishnu resting on a serpent. It belongs to India and dates to the twentieth century CE."],
    ["XLII-104: Nata Kumbha", "A temple lamp made of brass with copper and bronze components, known as a Sukunda in Nepal's Kathmandu Valley. It has a rear pot for ghee, a front wick pan, and a handle shaped as a seven-hooded serpent and Ganesha. It belongs to Nepal and dates to the eighteenth century CE."],
    ["XLIV-439: Sprinkler", "An ornate silver Ganga-Jamni filigree rose-water sprinkler with a circular tapered base, leafy relief, melon-shaped body and leafy neck. Its cypress-shaped pipe has panels, and the flower-like top has six elongated petals beneath a domed finial. It belongs to India and dates to the twentieth century CE."],
    ["XLIV-146-1: Tong", "A partly enamelled silver sugar tong, probably Russian, with colourful decorative enamel work. It has coarse-file-like tips, shell separators, a detachable lid, embossed petal panels, a brown zigzag band and multicoloured enamel floral designs. It belongs to Russia and dates to the nineteenth century CE."]
  ];

  var audioFiles = [
    "ACQ-86-19 TEMPLE CONCH.wav",
    "ACQ-86-12 Bed Post.wav",
    "XLIV-461 Tray.wav",
    "XXV-198 Vase.wav",
    "XXVIII-138 MIRROR WITH STAND.wav",
    "ACQ-86-3 Plate.wav",
    "XLIV-216 Box.wav",
    "XLII-104 NATA KUMBHA.wav",
    "XLIV-439 SPRINKLER.wav",
    "XLIV-146-1 Tong.wav"
  ];

  var keys = ["conch", "bedpost", "tray", "vase", "mirror", "plate", "box", "nata-kumbha", "sprinkler", "tong"];

  function source(index) {
    return "./Audios/English/" + audioFiles[index].split("/").map(encodeURIComponent).join("/");
  }

  function addOption() {
    var selector = document.getElementById("languageSelector");
    if (selector && !selector.querySelector('option[value="english"]')) {
      selector.insertAdjacentHTML("beforeend", '<option value="english">English</option>');
    }
    return selector;
  }

  function addItemSection(index) {
    var existing = document.getElementById("english");
    if (existing) return existing;
    var data = items[index];
    if (!data) return null;
    var section = document.createElement("section");
    section.className = "bookContentDiv langCnt";
    section.id = "english";
    section.style.display = "none";
    section.innerHTML = '<h2 class="cntHdng"></h2><div class="booImgDiv"><img alt=""></div><div class="bookCntDiv"><p></p></div>';
    section.querySelector("h2").textContent = data[0];
    section.querySelector("img").src = "./images/" + data[0].split(":")[0] + ".png";
    section.querySelector("img").alt = data[0];
    section.querySelector("p").textContent = data[1];
    var first = document.querySelector(".langCnt");
    if (first && first.parentNode) first.parentNode.insertBefore(section, first);
    return section;
  }

  function applyEnglish() {
    var selector = document.getElementById("languageSelector");
    var cards = document.querySelectorAll(".item-card");
    if (cards.length) {
      cards.forEach(function (card, index) {
        var key = keys[index];
        var label = card.querySelector('[data-card-label="' + key + '-title"]');
        var content = card.querySelector("[data-card-content]");
        if (label) label.textContent = items[index][0];
        if (content) content.textContent = items[index][1];
        var audio = card.querySelector("audio");
        if (audio) {
          audio.src = source(index);
          audio.load();
        }
      });
      document.querySelectorAll(".langCnt").forEach(function (element) {
        element.style.display = element.id === "english" ? "block" : "none";
      });
    } else {
      var number = Number((location.pathname.match(/item(\d+)\.html$/i) || [])[1]);
      if (!number) return;
      addItemSection(number - 1);
      document.querySelectorAll(".langCnt").forEach(function (element) {
        element.style.display = element.id === "english" ? "block" : "none";
      });
      var player = document.getElementById("languageAudio");
      if (player) {
        player.src = source(number - 1);
        player.load();
      }
    }
    if (selector) selector.value = "english";
  }

  var selector = addOption();
  if (selector) selector.addEventListener("change", function () {
    if (selector.value === "english") setTimeout(applyEnglish, 0);
  });
})();
