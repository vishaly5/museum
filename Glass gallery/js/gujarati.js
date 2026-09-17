(function () {
  "use strict";

  var items = [
    [
      "MS-2969: ફૂલદાની",
      "આ ફૂલદાની (અથવા પિચર) ક્લાસિક નાશપતી આકારની છે અને પ્રવાહી રેડવા માટે ત્રણ હોઠવાળો (ટ્રિફોઇલ) કોર ધરાવે છે. તે સોનેરી, હાથથી લગાડેલી હેન્ડલ અને આંતરિક શીતલનિયોજન સાથેનું કાચનું કારીગર્ય છે, જે તેને સંગ્રહકર્તાઓમાં ખાસ લોકપ્રિય બનાવે છે."
    ],
    [
      "LVIII-378: બાઉલ",
      "આ બાઉલ પર નવું-ક્લાસિકલ દ્રશ્યોની સોનેરી ગિલ્ડેડ ફ્રિઝ છે, અને તે ગ્રીક અથવા રોમન પરિપ્રેક્ષ્યના સતત નૃત્ય દર્શાવતી આકૃતિઓથી શણગારેલ છે. સમગ્ર બાઉલ ચોથા ભાગ સાથે છઠ્ઠા ખૂણાવાળા પાયે સ્થિત છે."
    ],
    [
      "MS-2204: બાઉલ",
      "આ એમ્ફોરા આકારની કાચની ફૂલદાની છે, જે બંને બાજુ બે હેન્ડલ ધરાવે છે. તે પાણીની અંદરનું દ્રશ્ય અનેવહેતુ તરતી માછલીઓ દર્શાવે છે અને એક ત્રિ-પરિમાણીય ‘સમુદ્ર’નો અસરકારક પ્રભાવ આપે છે."
    ],
    [
      "LVIII-422: કોબાલ્ટ blå કટ ક્રિસ્ટલ ડીકેન્ટર",
      "આ કોબાલ્ટ બ્લુ ક્રિસ્ટલ ડીકેન્ટર અથવા શોભિત ફૂલદાની છે. તેની ઘાટી વાદળી ભૂમિકા નીચે રહેલા સ્પષ્ટ ક્રિસ્ટલને ખુલ્લું કરવા માટે કાળજીપૂર્વક કાપવામાં આવી છે અને ‘ટ્રાઉબે’ પેટર્નમાં દ્રાક્ષ અને ફૂલોની વિગતવાર ડિઝાઇન છે."
    ],
    [
      "MS-1686, MS-2068: ચાનો સેટ",
      "કાચના આ ચાના સેટમાં એક ઢાંકણવાળો ચા-પાત્ર અને ચાર નાની ચાની કપો છે. તેમાં જાંબલી અને સફેદ ફૂલો, લીલા પાંદડાં, અને સોનેરી પટ્ટીઓ અને ઉદભવેલી હેન્ડલ સાથેની શૈલી દેખાય છે."
    ],
    [
      "LVIII-221: વેનેશિયન કાચની સુરાહી / ડીકેન્ટર",
      "આ વસ્તુ એક સુરાહી અથવા જગ છે, જે તેના પાયાવાળા આધાર, હેન્ડલ અને પ્રવાહી રેડવા માટેના સ્પાઉટ દ્વારા ઓળખાય છે. તેમાં સોનેરી ગિલ્ડિંગ અને સફેદ ઇનામેલવાળા ફૂલો અને પાંદડાઓની શૈલી છે, જે મુરાનો કાચ-કલા સાથે જોડાયેલી છે."
    ],
    [
      "MS-4560: વેનેશિયન કાચની શોભિત ફૂલદાની / સુરાહી",
      "આ ફૂલદાની તેજસ્વી, અપારદર્શક કોબાલ્ટ બ્લુ કાચમાંથી બનાવવામાં આવી છે અને તેની સજાવટ ઓરોપ્લાસ્ટિક તકનીકથી કરવામાં આવી છે. મોટા સોનેરી પેનલ્સમાં યોદ્ધાઓ અને પૌરાણિક દ્રશ્યો દર્શાવ્યા છે, અને તેને ભૌમિતિક ગ્રીક-કી પેટર્નથી_framed કરવામાં આવ્યું છે."
    ],
    [
      "LVIII-136: બોહેમિયન અથવા વેનેશિયન ફ્રોસ્ટેડ કાચની સુરાહી / પિચર",
      "આ પ્રાચીન બોહેમિયન અથવા વેનેશિયન ફ્રોસ્ટેડ પિચર અપારદર્શક સફેદ અથવા રંગહીન કાચની બનેલી છે. તેના સાપનુરૂપ હેન્ડલ અને શટિલ વિરુદ્ધ રંગની દોરીથી બનેલી શૈલી તેને એક જટિલ હસ્તનિર્મિત આર્ટ ગ્લાસનું ઉત્તમ ઉદાહરણ બનાવે છે."
    ],
    [
      "MS-2943: ડીકેન્ટર્સ",
      "આ સુરાહીઓ રૂબી-લાલ ઓવરલેવાળા કાચથી બનાવવામાં આવી છે અને પછી તેની સજાવટ માટે કાપવામાં આવી છે. તેની જટિલ ગિલ્ટ Flour, ફૂલ અને ભૂમિતિક પેટર્ન અને ઊંચા, સ્પાઇરી ઢાંકણ સાથે આ કાચની રચના ખાસ છે."
    ],
    [
      "LVIII-387: શોભિત ફૂલદાની",
      "આ ફૂલદાની પર ટોચ અને પાયા પાસે ધાકડીવાળી સોનેરી પટ્ટીઓ અને દ્રાક્ષવેલીના પેટર્ન સાથે વ્યાપક ગિલ્ટ સજાવટ છે. ચોરસ, ફેસેટેડ આકાર અને હસ્ત-નિર્મિત શણગારો તેને બોહેમિયન કાચકલાનું ખાસ લક્ષણ આપે છે."
    ],
    [
      "LVIII-371: ઢાંકણ સાથેનું બોહેમિયન ક્રિસ્ટલ ડીકેન્ટર",
      "આ એક સ્પષ્ટ ક્રિસ્ટલ કાચની સુરાહી અને તેનો ઢાંકણ છે, જેમાં શૈલીબદ્ધ ફૂલો અને પાંદડાઓની વ્યાપક સોનેરી સજાવટ છે. અંડાકાર રૂબી-લાલ કાચના પેનલ્સ પ્રકાશને પકડે છે અને તેની જટિલ ડિઝાઇનને વધુ ઉજાગર કરે છે."
    ],
    [
      "MS-1698: ઢાંકણવાળો બોહેમિયન એમ્બર-સ્ટેઇન્ડ ગોબ્લેટ",
      "આ અતિસુંદર ઢાંકણવાળો ગોબ્લેટ ૧૯મી સદીના બોહેમિયન કાચકારોની જટિલ કારીગરી દર્શાવે છે. સ્પષ્ટ કાચ પર પકડતું એમ્બર રંગનું સ્ટેઇન, સફેદ ઇનામેલ અને સોનેરી શૈલી સાથે પ્રાકૃતિક દ્રશ્યો અને પાંદડાઓનો શોભાસ્થાન છે."
    ],
    [
      "LVIII-224: ફૂલદાની",
      "આ ફૂલદાની ઝળહળતા એમરાલ્ડ અથવા ગાઢ લીલા કાચથી બનેલી છે અને હસ્તનિર્મિત સોનેરી ગિલ્ડિંગ અને ઇનામેલનું વ્યાપક કામ છે. તેની મુખ્ય વિશેષતા એક અંડાકાર મેડેલિયન છે, જેમાં સ્ત્રીનું સુંદર પોટ્રેટ અને જટિલ હસ્ત-નિર્મિત કામ છે. વારંવાર તેને ફ્લોરેન્ટાઇન આર્ટ કેમિયો ગ્લાસ કહેવામાં આવે છે."
    ]
  ];

  var audioFiles = [
    "Acc. No_ MS-2969, Title_ Vase, Material_ Glass.wav",
    "Acc. No_ LVIII-378, Title_ Bowl, Material_ Glass.wav",
    "Acc. No_ MS-2204, Title_ Bowl, Material_  Bohemian Glass.wav",
    "Acc. No_ LVIII-422, Title_ cobalt blue cut crystal decanter, Material_   Glass.wav",
    "Acc. No_ MS- 1686, MS-2068, Title_ tea set, Material_ Glass.wav",
    "Acc. No_ LVIII-221, Title_ Venetian glass ewer _decanter, Material_ Glass.wav",
    "Acc. No_ MS-4560, Title_ Venetian glass decorative vase_decanter.wav",
    "Acc. No_ LVIII-136, Title_ Bohemian or Venetian frosted glass ewer_pitcher_.wav",
    "Acc. No_ MS-2943,  Title_ Decanters, Material_ Venetian glass.wav",
    "Acc. No_ LVIII-387, Title_  Decorative vase, Material_ Venetian glass_.wav",
    "Acc. No_ LVIII-371, Title_ Bohemian crystal decanter with Lid.wav",
    "Acc. No_ MS-1698, Title_ Bohemian amber-stained goblet with lid.wav",
    "Acc. No_ LVIII-224, Title_ vase.wav"
  ];

  function encodePath(path) {
    return path.split("/").map(encodeURIComponent).join("/");
  }

  function addOption() {
    var selector = document.getElementById("languageSelector");
    if (selector && !selector.querySelector('option[value="gujarati"]')) {
      selector.insertAdjacentHTML("beforeend", '<option value="gujarati">ગુજરાતી (Gujarati)</option>');
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
      element.src = "Audio/Gujarati/" + encodePath(audioFiles[index]);
      element.load();
    });
    selector.value = "gujarati";
  }

  function itemPage(selector) {
    var number = Number((location.pathname.match(/item(\d+)\.html$/i) || [])[1]);
    if (!number) return;
    var data = items[number - 1];
    var section = document.getElementById("gujarati");
    if (!section) {
      section = document.createElement("section");
      section.className = "bookContentDiv langCnt";
      section.id = "gujarati";
      section.lang = "gu";
      section.dir = "ltr";
      section.innerHTML = '<h2 class="cntHdng"></h2><div class="booImgDiv"><img alt=""></div><div class="bookCntDiv"><p></p></div>';
      var firstSection = document.querySelector(".langCnt");
      if (firstSection && firstSection.parentNode) {
        firstSection.parentNode.insertBefore(section, firstSection);
      }
    }
    section.querySelector(".cntHdng").textContent = data[0];
    section.querySelector("img").src = "Images/Glassgallery-item" + number + ".png";
    section.querySelector("img").alt = data[0];
    section.querySelector("p").textContent = data[1];
    document.querySelectorAll(".langCnt").forEach(function (element) {
      element.style.display = element.id === "gujarati" ? "block" : "none";
    });
    var player = document.getElementById("languageAudio");
    if (player) {
      player.src = "Audio/Gujarati/" + encodePath(audioFiles[number - 1]);
      player.load();
    }
    selector.value = "gujarati";
  }

  function apply(selector) {
    if (document.querySelector("[data-card-title]")) overview(selector);
    else itemPage(selector);
  }

  var selector = addOption();
  if (selector) selector.addEventListener("change", function () {
    if (selector.value === "gujarati") {
      setTimeout(function () {
        apply(selector);
      }, 0);
    }
  });
})();
