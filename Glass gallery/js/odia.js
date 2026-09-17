(function () {
  "use strict";

  var items = [
    ["MS-2969: ଜଗ୍", "କାଚର ଏହି ସୁନ୍ଦର ଜଗ୍‌ର ଆକୃତି ନାଶପାତି ପରି। ପାନୀୟ ଢାଳିବା ପାଇଁ ଏହାର ମୁହଁଟି ତିନୋଟି ପାଖୁଡ଼ା ଆକାରରେ ଗଢ଼ାଯାଇଛି ଏବଂ ହାତରେ ତିଆରି ମୋଡ଼ା ଦଉଡ଼ି ଶୈଳୀର ହ୍ୟାଣ୍ଡେଲ୍ ଲାଗିଛି। ଏହି ପ୍ରକାରର ଜଗ୍‌ରେ ବରଫ ରଖିବା ପାଇଁ ଏକ ଆଭ୍ୟନ୍ତରୀଣ କୋଠରୀ ବା ‘ଆଇସ୍ ବ୍ଲାଡର୍’ ଥାଏ।"],
    ["LVIII-378: ବାଉଲ୍", "ଏହି ବାଉଲ୍‌ରେ ନ୍ୟୁ କ୍ଲାସିକାଲ୍ ଦୃଶ୍ୟର ଏକ ସୁନା-ଗୋଲ୍ଡେଡ୍ ଫ୍ରିଜ୍ ଅଛି। ଏଥିରେ ଗ୍ରୀକ୍ କିମ୍ବା ରୋମାନ୍ ଚିତ୍ରମାନଙ୍କର କ୍ରମାଗତ ନୃତ୍ୟ ଦୃଶ୍ୟ ଦେଖାଯାଏ। ବିସ୍ତୃତ ରିଲିଫ୍ ଗିଲ୍ଡେଡ୍ ବ୍ୟାଣ୍ଡ୍ ଓ ଷଟ୍‌କୋଣୀୟ ଭିତ୍ତି ଏହାର ବିଶେଷତା।"],
    ["MS-2204: ଫୁଲଦାନୀ", "ବୋହେମିଆନ୍ କାଚରେ ତିଆରି ଏହି ଆମ୍ଫୋରା ଆକୃତିର ଫୁଲଦାନୀର ଦୁଇ ପାଖରେ ହ୍ୟାଣ୍ଡେଲ୍ ଅଛି। ଏଥିରେ ରଙ୍ଗୀନ ଏନାମେଲ୍ କାଚର ମାଛ, ହାତଚିତ୍ରିତ ଜଳଚର ଘାସ ଓ ସମୁଦ୍ରଦଳ ରହିଛି, ଯାହା ଏକ ତ୍ରିମାତ୍ରିକ ‘ସମୁଦ୍ର’ ବା ‘ମାଛ ପୋଖରୀ’ର ଭ୍ରମ ସୃଷ୍ଟି କରେ।"],
    ["LVIII-422: କୋବାଲ୍ଟ ବ୍ଲୁ କଟ୍ କ୍ରିଷ୍ଟାଲ୍ ଡିକାଣ୍ଟର୍", "ଗଭୀର କୋବାଲ୍ଟ ନୀଳ ରଙ୍ଗର ବାହ୍ୟ କାଚ ସ୍ତରକୁ ହାତରେ କାଟି ତଳେ ଥିବା ସ୍ପଷ୍ଟ କ୍ରିଷ୍ଟାଲ୍‌କୁ ଦେଖାଯାଇଛି। ‘ଟ୍ରୁବେ’ ଢାଞ୍ଚାରେ ଅଙ୍ଗୁର ଓ ଫୁଲର ଡିଜାଇନ୍ ରହିଛି ଏବଂ କାଟା ପୃଷ୍ଠଗୁଡ଼ିକ ଆଲୋକକୁ ଚମତ୍କାର ଭାବରେ ଧରିଥାଏ।"],
    ["MS-1686, MS-2068: ଚାହା ପାତ୍ର ସେଟ୍", "ଏହି କାଚର ଚାହା ପାତ୍ର ସେଟ୍‌ରେ ଢାଙ୍କୁଣି ଥିବା ଏକ ଚାହାଦାନୀ ଏବଂ ଚାରୋଟି ଛୋଟ ଚାହା କପ୍ ରହିଛି। ବାଇଗଣି ଓ ଧଳା ଫୁଲ, ସବୁଜ ପତ୍ର ଏବଂ ଧାର, ମୁଠି ଓ ନଳୀରେ ସୂକ୍ଷ୍ମ ସୁନେଲି ପଟି ଏହାକୁ ଶୋଭା ଦେଇଛି।"],
    ["LVIII-221: ଭେନିସିଆନ୍ ସୁରେଇ / ଜଗ୍", "କାଚରେ ତିଆରି ଏହି ଭେନିସିଆନ୍ ସୁରେଇର ତଳେ ଏକ ଆଧାର, ବଙ୍କା ମୁଠି ଏବଂ ପାନୀୟ ଢାଳିବା ପାଇଁ ଏକ ନଳୀ ରହିଛି। ହାତରେ କରାଯାଇଥିବା ସୁନେଲି ପ୍ରଲେପ ଓ ଧଳା ଏନାମେଲ୍‌ର ଫୁଲ-ପତ୍ର ନକ୍ସା ଏହାର ମୁଖ୍ୟ ଆକର୍ଷଣ।"],
    ["MS-4560: ସଜ୍ଜିତ ଭେନିସୀୟ କାଚ ଫୁଲଦାନୀ / ଡିକାଣ୍ଟର୍", "ଏହି ଫୁଲଦାନୀ ଉଜ୍ଜ୍ୱଳ କୋବାଲ୍ଟ ନୀଳ କାଚରେ ତିଆରି। ‘ଓରୋପ୍ଲାଷ୍ଟିକ୍’ କୌଶଳରେ କାଚ ପୃଷ୍ଠରେ ବିଶୁଦ୍ଧ ସୁନାର ଉଦ୍ଭାସିତ ଚିତ୍ର ଓ ନକ୍ସା ଗଢ଼ାଯାଇଛି। ସୁନେଲି ପ୍ୟାନେଲ୍‌ଗୁଡ଼ିକରେ ଯୋଦ୍ଧା ଓ ପୌରାଣିକ ଦୃଶ୍ୟ ରହିଛି।"],
    ["LVIII-136: ବୋହେମିଆନ୍ କିମ୍ବା ଭେନିସିଆନ୍ ଫ୍ରୋଷ୍ଟେଡ୍ କାଚର ସୁରେଇ / ଜଗ୍", "ଏହି ପ୍ରାଚୀନ ସୁରେଇ ଧଳା କିମ୍ବା ରଙ୍ଗହୀନ ଫ୍ରୋଷ୍ଟେଡ୍ କାଚରେ ତିଆରି। ବିପରୀତ ରଙ୍ଗର କାଚର ଏକ ଖଣ୍ଡକୁ ଦେହ ଓ ବେକ ଚାରିପାଖରେ ଗୁଡ଼ାଇ ସର୍ପିଳ ହ୍ୟାଣ୍ଡେଲ୍ ତିଆରି କରାଯାଇଛି।"],
    ["MS-2943: ସୁରାହୀ / ଡିକାଣ୍ଟର୍", "ଏହି ଭେନିସିଆନ୍ କାଚର ସୁରେଇ ମାଣିକ ଲାଲ୍ ଆସ୍ତରଣ ଥିବା କାଚରେ ତିଆରି ଏବଂ ସୂକ୍ଷ୍ମ ଭାବେ କାଟି ପ୍ୟାନେଲ୍ ତିଆରି କରାଯାଇଛି। ସୁନେଲି କାରୁକାର୍ଯ୍ୟ, ଏନାମେଲ୍ ଫୁଲ, ଜ୍ୟାମିତିକ ନକ୍ସା ଓ ଲମ୍ବା ନକ୍ସାଯୁକ୍ତ ବେକ ଏହାର ବିଶେଷତା।"],
    ["LVIII-387: ସୁସଜ୍ଜିତ ଫୁଲଦାନୀ", "ଏହି ଫୁଲଦାନୀର ଉପରି ଭାଗ ଓ ଆଧାର ଚାରିପାଖରେ ସୁନେଲି ପଟି ଏବଂ ଅଙ୍ଗୁରଲତାର ସୂକ୍ଷ୍ମ କାରୁକାର୍ଯ୍ୟ ରହିଛି। ଏହାର ବର୍ଗାକାର ଆକୃତି ଏହି ପ୍ରକାର କାଚପାତ୍ରର ବିଶେଷ ସ୍ୱରୂପ ଏବଂ ବୋହେମିଆନ୍ ଶିଳ୍ପର ପରିଚୟ।"],
    ["LVIII-371: ଠିପି ସହିତ ବୋହେମିଆନ୍ କ୍ରିଷ୍ଟାଲ୍ ସୁରେଇ", "ଏହି ବୋହେମିଆନ୍ ସୁରେଇ ଓ ଠିପି ସ୍ୱଚ୍ଛ କ୍ରିଷ୍ଟାଲ୍ କାଚରେ ତିଆରି। ଉଦ୍ଭାସିତ ଫୁଲ ଓ ପତ୍ରର ସୁନେଲି କାରୁକାର୍ଯ୍ୟ ଏବଂ ଅଣ୍ଡାକୃତି ମାଣିକ ଲାଲ୍ କାଚ ପ୍ୟାନେଲ୍‌ଗୁଡ଼ିକ ଏହାକୁ ଅତ୍ୟନ୍ତ ବିଳାସପୂର୍ଣ୍ଣ କରିଛି।"],
    ["MS-1698: ବୋହେମିଆନ୍ ଆମ୍ବର୍ ଢାଙ୍କୁଣିଯୁକ୍ତ ପାନପାତ୍ର", "ଏହି ଢାଙ୍କୁଣି ଥିବା କାଚ ପାନପାତ୍ର ଉନବିଂଶ ଶତାବ୍ଦୀର ବୋହେମିଆନ୍ କାଚଶିଳ୍ପୀଙ୍କ କାରୀଗରୀର ଉଦାହରଣ। ସ୍ୱଚ୍ଛ କାଚରେ ଆମ୍ବର୍ ରଙ୍ଗର ଆସ୍ତରଣ, ଧଳା ଏନାମେଲ୍ ଓ ସୁନେଲି କାରୁକାର୍ଯ୍ୟ ରହିଛି। ଶୀର୍ଷରେ ଗମ୍ବୁଜ ଆକାରର ଢାଙ୍କୁଣି ଅଛି।"],
    ["LVIII-224: ଫୁଲଦାନୀ", "ଗାଢ଼ ମରକତ-ସବୁଜ କାଚରେ ତିଆରି ଏହି ଉଚ୍ଚ ଫୁଲଦାନୀରେ ହାତରେ ଅଙ୍କା ସୁନେଲି କାରୁକାର୍ଯ୍ୟ ଓ ଏନାମେଲ୍ କାମ ରହିଛି। କେନ୍ଦ୍ରର ଅଣ୍ଡାକୃତି ମେଡାଲିଅନ୍‌ରେ ଜଣେ ମହିଳାଙ୍କ ଜୀବନ୍ତ ପ୍ରତିକୃତି ଅଙ୍କିତ। ଏହି ଶୈଳୀକୁ ‘ଫ୍ଲୋରେଣ୍ଟାଇନ୍ ଆର୍ଟ କ୍ୟାମିଓ’ କୁହାଯାଏ।"]
  ];

  var audioFiles = [
    "1. Acc. No MS-2969, Vase.wav",
    "2. Acc. No LVIII-378, Bowl.wav",
    "3. Acc. No MS-2204, Bowl, Material  Bohemian Glass.wav",
    "4. Acc. No LVIII-422, cobalt blue cut crystal decanter.wav",
    "5. Acc. No MS- 1686, MS-2068, Tea set.wav",
    "6. Acc. No LVIII-221, Venetian glass ewer decanter, Material Glass.wav",
    "7. Acc. No MS-4560, Venetian glass decorative vasedecanter.wav",
    "8. Acc. No LVIII-136, Bohemian or Venetian frosted glass ewerpitcher.wav",
    "9. Acc. No MS-2943,  Decanters, Material Venetian glass.wav",
    "10. Acc. No LVIII-387, Decorative vase.wav",
    "11. Acc. No LVIII-371, Bohemian crystal decanter with Lid.wav",
    "12. Acc. No MS-1698, Bohemian amber-stained goblet with lid.wav",
    "13. Acc. No LVIII-224, vase,.wav"
  ];

  function path(value) {
    return value.split("/").map(encodeURIComponent).join("/");
  }

  function addOption() {
    var selector = document.getElementById("languageSelector");
    if (selector && !selector.querySelector('option[value="odia"]')) {
      selector.insertAdjacentHTML("beforeend", '<option value="odia">ଓଡ଼ିଆ (Odia)</option>');
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
      element.src = "Audio/Odia/" + path(audioFiles[index]);
      element.load();
    });
    selector.value = "odia";
  }

  function itemPage(selector) {
    var number = Number((location.pathname.match(/item(\d+)\.html$/i) || [])[1]);
    if (!number) return;
    var data = items[number - 1];
    var section = document.getElementById("odia");
    if (!section) {
      section = document.createElement("section");
      section.className = "bookContentDiv langCnt";
      section.id = "odia";
      section.lang = "or";
      section.innerHTML = '<h2 class="cntHdng"></h2><div class="booImgDiv"><img alt=""></div><div class="bookCntDiv"><p></p></div>';
      document.querySelector(".langCnt").parentNode.insertBefore(section, document.querySelector(".langCnt"));
    }
    section.querySelector(".cntHdng").textContent = data[0];
    section.querySelector("img").src = "Images/Glassgallery-item" + number + ".png";
    section.querySelector("img").alt = data[0];
    section.querySelector("p").textContent = data[1];
    document.querySelectorAll(".langCnt").forEach(function (element) {
      element.style.display = element.id === "odia" ? "block" : "none";
    });
    var player = document.getElementById("languageAudio");
    if (player) {
      player.src = "Audio/Odia/" + path(audioFiles[number - 1]);
      player.load();
    }
    selector.value = "odia";
  }

  function apply(selector) {
    if (document.querySelector("[data-card-title]")) overview(selector);
    else itemPage(selector);
  }

  var selector = addOption();
  if (selector) selector.addEventListener("change", function () {
    if (selector.value === "odia") apply(selector);
  });
})();