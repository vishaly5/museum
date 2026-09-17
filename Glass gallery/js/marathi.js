(function () {
  "use strict";

  var items = [
    ["MS-2969: फुलदाणी", "या फुलदाणीला क्लासिक नाशपातीचा आकार, ओतण्यासाठी ट्रेफॉइल किनार आणि हाताने लावलेले पिळवटलेल्या दोरीसारखे सजावटीचे हँडल आहे. या प्रकारच्या पिचरमध्ये द्रव पातळ न करता थंड ठेवण्यासाठी बर्फ ठेवण्याचा अंतर्गत कप्पा असू शकतो."],
    ["LVIII-378: वाडगा", "या वाडग्यावर निओक्लासिक दृश्यांची सोन्याने मढवलेली फ्रिझ आहे. त्यात ग्रीक किंवा रोमन आकृत्यांचे सतत नृत्य करणारे दृश्य असून, तो सविस्तर उठावदार सुवर्ण पट्ट्याने सजवलेला आणि षटकोनी पायावर बसवलेला आहे."],
    ["MS-2204: वाडगा", "अॅम्फोरा आकाराच्या या पारंपरिक बोहेमियन काचेच्या फुलदाणीच्या दोन्ही बाजूंना हँडल आहेत. पाण्याखालील दृश्याचा परिणाम निर्माण करण्यासाठी इनॅमल केलेले काचेचे मासे, हाताने रंगवलेले शेवाळ आणि जलचर गवत यांची सजावट केली आहे."],
    ["LVIII-422: कोबाल्ट ब्लू कट क्रिस्टल डिकॅंटर", "हा कोबाल्ट निळ्या रंगाचा क्रिस्टल डिकॅंटर किंवा सजावटीची फुलदाणी आहे. बाहेरील निळा थर काळजीपूर्वक हाताने कापून आतील पारदर्शक क्रिस्टल दाखवले आहे. ट्रॉबे नमुन्यात द्राक्षे आणि फुलांची रचना असून कापलेल्या पृष्ठभागांवर प्रकाश सुंदरपणे परावर्तित होतो."],
    ["MS-1686, MS-2068: चहा संच", "या काचेच्या चहा संचात झाकणाचे चहाचे भांडे आणि चार लहान कप आहेत. जांभळ्या व पांढऱ्या फुलांचे, हिरव्या पानांचे हाताने रंगवलेले किंवा ट्रान्सफरवेअर नमुने असून कडा, हँडल आणि नळीवर नाजूक सोन्याच्या पट्ट्या आहेत."],
    ["LVIII-221: व्हेनेशियन ग्लास ईवर / डिकॅंटर", "पाय असलेला तळ, हँडल आणि द्रव ओतण्यासाठी नळी असलेल्या या जगवर हाताने केलेली सोन्याची मढवण आणि पांढऱ्या इनॅमलमधील फुलांची व पानांची सजावट आहे. ही गुंतागुंतीची शैली मुरानो तंत्राशी संबंधित आहे."],
    ["MS-4560: व्हेनेशियन काचेची सजावटीची फुलदाणी / डिकॅंटर", "अपारदर्शक कोबाल्ट निळ्या काचेच्या या फुलदाणीवर ओरोप्लास्टिक तंत्राने सोन्याची उठावदार सजावट केली आहे. मोठ्या सोन्याने मढवलेल्या पट्ट्यांवर योद्धे आणि पौराणिक दृश्ये असून, त्यांना भूमितीय ग्रीक-की नमुन्याने चौकट दिली आहे."],
    ["LVIII-136: बोहेमियन किंवा व्हेनेशियन फ्रॉस्टेड ग्लास ईवर / पिचर", "सर्पाकृती हँडल असलेली ही प्राचीन फ्रॉस्टेड काचेची पिचर अपारदर्शक पांढऱ्या किंवा रंगहीन काचेची आहे. अंबर किंवा माणिक लाल रंगाची काचेची पट्टी शरीर आणि मानेभोवती गुंडाळून सजावटीचे हँडल तयार केले आहे."],
    ["MS-2943: डिकॅंटर", "रुबी लाल रंगाचा थर असलेल्या या काचेच्या डिकॅंटरवर कापकाम करून सजावटीची पॅनेल तयार केली आहेत. सोन्याची मढवण, इनॅमलमधील फुलांचे व भूमितीय नमुने, फुगलेले शरीर, लांब वलयांकित मान आणि टोकदार झाकण ही त्यांची वैशिष्ट्ये आहेत."],
    ["LVIII-387: सजावटीची फुलदाणी", "या फुलदाणीवर वरच्या आणि खालच्या भागाभोवती विस्तृत सोन्याची सजावट तसेच द्राक्षवेलीचा नमुना आहे. तिचा चौकोनी, फॅसेटेड आकार वैशिष्ट्यपूर्ण असून, हाताने सजवलेली अशी काच बोहेमियन किंवा चेक कलेची खासियत मानली जाते."],
    ["LVIII-371: झाकणासह बोहेमियन क्रिस्टल डिकॅंटर", "पारदर्शक क्रिस्टल काचेच्या या फुलदाणीवर आणि झाकणावर फुले व पानांच्या शैलीबद्ध उठावदार सोन्याच्या सजावटी आहेत. अंडाकृती माणिक लाल काचेची पॅनेल प्रकाश परावर्तित करतात आणि नाजूक सोन्याच्या अलंकरणाला उठाव देतात."],
    ["MS-1698: झाकणासह बोहेमियन अंबर रंगाचा गोबलेट", "या झाकण असलेल्या काचेच्या पात्रावर अर्धपारदर्शक अंबर रंगाचा थर आहे. पांढऱ्या इनॅमलने आणि सोन्याच्या सजावटीने नैसर्गिक दृश्ये किंवा पानांचे नमुने दाखवले असून, वर घुमटाकार झाकण आहे."],
    ["LVIII-224: फुलदाणी", "पन्ना किंवा गडद हिरव्या काचेची ही उंच फुलदाणी हाताने केलेल्या सोन्याच्या मढवणीने आणि इनॅमल कामाने सजवली आहे. अंडाकृती मेडलियनमध्ये महिलेचे चित्र आहे; या शैलीला कधीकधी फ्लॉरेन्टाइन आर्ट कॅमिओ ग्लास म्हणतात." ]
  ];

  var audioFiles = [
    "Acc. No MS-2969, Title Vase, Material Glass.wav",
    "Acc. No LVIII-378, Title Bowl, Material Glass.wav",
    "Acc. No MS-2204, Title Bowl, Material  Bohemian Glass.wav",
    "Acc. No LVIII-422, Title cobalt blue cut crystal decanter, Material   Glass.wav",
    "Acc. No MS- 1686, MS-2068, Title tea set, Material Glass.wav",
    "Acc. No LVIII-221, Title Venetian glass ewer decanter, Material Glass.wav",
    "Acc. No MS-4560, Title Venetian glass decorative vasedecanter.wav",
    "Acc. No LVIII-136, Title Bohemian or Venetian frosted glass ewerpitcher.wav",
    "Acc. No MS-2943,  Title Decanters, Material Venetian glass.wav",
    "Acc. No LVIII-387, Title  Decorative vase, Material Venetian glass.wav",
    "Acc. No LVIII-371, Title Bohemian crystal decanter with Lid.wav",
    "Acc. No MS-1698, Title Bohemian amber-stained goblet with lid.wav",
    "Acc. No LVIII-224, Title vase, Material Glass.wav"
  ];

  function path(value) {
    return value.split("/").map(encodeURIComponent).join("/");
  }

  function addOption() {
    var selector = document.getElementById("languageSelector");
    if (selector && !selector.querySelector('option[value="marathi"]')) {
      selector.insertAdjacentHTML("beforeend", '<option value="marathi">मराठी (Marathi)</option>');
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
      element.src = "Audio/Marathi/" + path(audioFiles[index]);
      element.load();
    });
    selector.value = "marathi";
  }

  function itemPage(selector) {
    var number = Number((location.pathname.match(/item(\d+)\.html$/i) || [])[1]);
    if (!number) return;
    var data = items[number - 1];
    var section = document.getElementById("marathi");
    if (!section) {
      section = document.createElement("section");
      section.className = "bookContentDiv langCnt";
      section.id = "marathi";
      section.lang = "mr";
      section.innerHTML = '<h2 class="cntHdng"></h2><div class="booImgDiv"><img alt=""></div><div class="bookCntDiv"><p></p></div>';
      document.querySelector(".langCnt").parentNode.insertBefore(section, document.querySelector(".langCnt"));
    }
    section.querySelector(".cntHdng").textContent = data[0];
    section.querySelector("img").src = "Images/Glassgallery-item" + number + ".png";
    section.querySelector("img").alt = data[0];
    section.querySelector("p").textContent = data[1];
    document.querySelectorAll(".langCnt").forEach(function (element) {
      element.style.display = element.id === "marathi" ? "block" : "none";
    });
    var player = document.getElementById("languageAudio");
    if (player) {
      player.src = "Audio/Marathi/" + path(audioFiles[number - 1]);
      player.load();
    }
    selector.value = "marathi";
  }

  function apply(selector) {
    if (document.querySelector("[data-card-title]")) overview(selector);
    else itemPage(selector);
  }

  var selector = addOption();
  if (selector) selector.addEventListener("change", function () {
    if (selector.value === "marathi") apply(selector);
  });
})();
