(function () {
  "use strict";

  var items = [
    ["MS-2969: Vase", "The vase or pitcher has a classic pear shape, a trefoil three-lipped rim for pouring, and a decorative hand-applied twisted rope handle. This intricate process gives the glass its unique, beautiful, tactile finish. This type of pitcher often has an internal compartment or ice bladder where ice could be placed to chill liquid without diluting it."],
    ["LVIII-378: Bowl", "This bowl features a gold-gilded frieze of neoclassical scenes, often showing Greek or Roman figures in a continuous dancing scene described as dancing hours or muses. A detailed relief gilt band depicts classical dancing figures, and the entire bowl is mounted on a hexagonal base."],
    ["MS-2204: Bowl", "This amphora-shaped Bohemian glass vase has two handles attached on either side. It represents an underwater scene with enamelled glass fish that appear to be swimming. Applied high-relief enamelled fish, hand-painted seaweed and aquatic grasses create a three-dimensional ocean or fish-pond effect."],
    ["LVIII-422: Cobalt Blue Cut Crystal Decanter", "This cobalt blue crystal decanter or decorative vase has an outer blue glass layer carefully cut away by hand to reveal clear crystal underneath. It features a Traube pattern, meaning grape in German, with detailed grape and flower designs. The cut facets brilliantly catch the light."],
    ["MS-1686, MS-2068: Tea Set", "This glass tea set has a lidded teapot and four small teacups. Miniature sets could include a sugar bowl and creamer. It features hand-painted or transferware floral patterns with purple and white flowers and green leaves, accented by gold banding on the rims, handles and spout."],
    ["LVIII-221: Venetian Glass Ewer / Decanter", "This object is an ewer or jug with a footed base, handle and pouring spout. It has extensive hand-applied decoration, including elaborate gold gilding and white enamel floral or foliate motifs associated with the Murano technique. The lower body is heavily gilded with a gold overlay."],
    ["MS-4560: Venetian Glass Decorative Vase / Decanter", "This vase is made from vibrant opaque cobalt blue glass, providing a striking background for its ornamentation. An oroplastique technique raises pure gold in relief to create detailed imagery and patterns. Large gilded panels depict classical figures, warriors and mythological scenes framed by a geometric Greek Key."],
    ["LVIII-136: Bohemian or Venetian Frosted Glass Ewer / Pitcher", "This antique frosted glass ewer or pitcher has an applied serpent handle. It is made from opaque white or colourless glass with a frosted or crackleware finish. A contrasting amber or ruby-red glass strip is skilfully applied and coiled around the body and neck to form the handle."],
    ["MS-2943: Decanters", "These decanters are made from glass with a ruby-red overlay or stain, which is cut to create decorative panels. The red and clear glass create a strong contrast. The bottles are hand-decorated with gilt and enamel floral or geometric motifs and scrollwork, with bulbous bodies, long ring-knapped necks and tall pointed stoppers."],
    ["LVIII-387: Decorative Vase", "This vase features extensive gilt decoration, including bands around the top and base and a detailed grapevine motif common to decanters or vases of this style. Its square, faceted shape is typical of these pieces. This ornate hand-decorated glass was a specialty of Bohemian or Czech glassmaking."],
    ["LVIII-371: Bohemian Crystal Decanter with Lid", "This clear crystal glass decanter and stopper feature extensive raised gilt decoration of stylized floral and foliate motifs. Oval ruby-red glass panels catch the light and highlight the intricate design. The surface is decorated through a meticulous gilding process."],
    ["MS-1698: Bohemian Amber-Stained Goblet with Lid", "This exquisite covered goblet demonstrates the intricate craftsmanship of nineteenth-century Bohemian glassmakers. Its clear glass body has a vibrant translucent amber stain, delicate white enamel and gilded highlights depicting natural scenes or elegant foliage, with a dome-shaped lid and finial."],
    ["LVIII-224: Vase", "This tall vase is made from vibrant emerald or forest green glass with extensive hand-painted gold gilt decoration and enamel work. Its central oval medallion contains finely detailed hand-painted enamel and a portrait of a lady. This style is sometimes called Florentine Art Cameo Glass and was typically used as a presentation vase."]
  ];

  var audioFiles = [
    "1.Vase, Material Glass.wav",
    "2. Bowl, Material Glass.wav",
    "3.  Bowl, Material  Bohemian Glass.wav",
    "4. cobalt blue cut crystal decanter, Material.wav",
    "5. tea set, Material Glass.wav",
    "6.  Venetian glass ewer decanter, Material Glass.wav",
    "7. Venetian glass decorative vasedecanter.wav",
    "8.  Bohemian or Venetian frosted glass ewerpitcher.wav",
    "9. Decanters, Material Venetian glass.wav",
    "10.  Decorative vase, Material Venetian glass.wav",
    "11. Bohemian crystal decanter with Lid.wav",
    "12. Bohemian amber-stained goblet with lid.wav",
    "13. vase, Material Glass.wav"
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

  function overview(selector) {
    document.querySelectorAll("[data-card-title]").forEach(function (element, index) {
      element.textContent = items[index][0];
    });
    document.querySelectorAll("[data-card-content]").forEach(function (element, index) {
      element.textContent = items[index][1];
    });
    document.querySelectorAll(".item-card audio").forEach(function (element, index) {
      element.src = "Audio/English/" + path(audioFiles[index]);
      element.load();
    });
    selector.value = "english";
  }

  function itemPage(selector) {
    var number = Number((location.pathname.match(/item(\d+)\.html$/i) || [])[1]);
    if (!number) return;
    var data = items[number - 1];
    var section = document.getElementById("english");
    if (!section) {
      section = document.createElement("section");
      section.className = "bookContentDiv langCnt";
      section.id = "english";
      section.lang = "en";
      section.innerHTML = '<h2 class="cntHdng"></h2><div class="booImgDiv"><img alt=""></div><div class="bookCntDiv"><p></p></div>';
      document.querySelector(".langCnt").parentNode.insertBefore(section, document.querySelector(".langCnt"));
    }
    section.querySelector(".cntHdng").textContent = data[0];
    section.querySelector("img").src = "Images/Glassgallery-item" + number + ".png";
    section.querySelector("img").alt = data[0];
    section.querySelector("p").textContent = data[1];
    document.querySelectorAll(".langCnt").forEach(function (element) {
      element.style.display = element.id === "english" ? "block" : "none";
    });
    var player = document.getElementById("languageAudio");
    if (player) {
      player.src = "Audio/English/" + path(audioFiles[number - 1]);
      player.load();
    }
    selector.value = "english";
  }

  function apply(selector) {
    if (document.querySelector("[data-card-title]")) overview(selector);
    else itemPage(selector);
  }

  var selector = addOption();
  if (selector) selector.addEventListener("change", function () {
    if (selector.value === "english") apply(selector);
  });
})();