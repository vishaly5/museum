const fs = require('fs');
const path = require('path');

const galleryDir = 'd:/validation/museum/WesternFurnitureGallery';
const contentJsPath = path.join(galleryDir, 'content.js');

const contentJs = fs.readFileSync(contentJsPath, 'utf8');
const window = {};
eval(contentJs);
const westernFurnitureContent = window.westernFurnitureContent;

const languages = [
  { id: 'hindi', label: 'हिन्दी (Hindi)' },
  { id: 'english', label: 'English' },
  { id: 'telugu', label: 'తెలుగు (Telugu)' },
  { id: 'tamil', label: 'தமிழ் (Tamil)' },
  { id: 'marathi', label: 'मराठी (Marathi)' },
  { id: 'malayalam', label: 'മലയാളം (Malayalam)' },
  { id: 'kannada', label: 'ಕನ್ನಡ (Kannada)' },
  { id: 'odia', label: 'ଓଡ଼ିଆ (Odia)' },
  { id: 'bengali', label: 'বাংলা (Bengali)' },
  { id: 'urdu', label: 'اردو (Urdu)' },
  { id: 'gujarati', label: 'ગુજરાતી (Gujarati)' }
];

const langOptionsHtml = languages.map(l => 
  `<option value="${l.id}"${l.id === 'hindi' ? ' selected' : ''}>${l.label}</option>`
).join('\n              ');

const itemsMeta = [
  { key: 'box', img: 'images/western-furniture-image3.jpg', baseAudio: 'Box.wav' },
  { key: 'container', img: 'images/western-furniture-image4.jpg', baseAudio: 'Container.wav' },
  { key: 'sofa-344', img: 'images/western-furniture-image8.jpg', baseAudio: 'Sofa-IIVL-344.wav' },
  { key: 'chair', img: 'images/western-furniture-image7.jpg', baseAudio: 'Chair.wav' },
  { key: 'sofa-351', img: 'images/western-furniture-image9.jpg', baseAudio: 'Sofa-IIVL-351.wav' },
  { key: 'manicure-box', img: 'images/western-furniture-image2.jpg', baseAudio: 'Manicure-Box.wav' },
  { key: 'table', img: 'images/western-furniture-image1.jpg', baseAudio: 'Table.wav' },
  { key: 'nizam', img: 'images/western-furniture-image6.jpg', baseAudio: 'Nizam-Ali-Khan.wav' },
  { key: 'palanquin', img: 'images/western-furniture-image5.jpg', baseAudio: 'Palanquin.wav' }
];

const labels = {
  english:{
    box:['LII-193: Enamel Box','A Fortune Hunter / A Buxom Widow'],
    container:['LII-105: Cylindrical Enamel Box','Cylindrical enamel container'],
    'sofa-344':['LVII-344: Tapestry-covered Sofa','French sofa with violin-shaped back'],
    chair:['LVII-350: Chair','French high-back chair with embroidered upholstery'],
    'sofa-351':['LVII-351: Sofa','High-back sofa with painted upholstery'],
    'manicure-box':['XLIX-553: Manicure Box','Gold-plated manicure box with seven instruments'],
    table:['XLV-101: Table','Rectangular inlaid table from England'],
    nizam:["XXXV-6: Nizam Ali Khan's Hunting Expedition",'Deccani-style painting from Hyderabad'],
    palanquin:['ACQ-62-99: Palanquin','Enamelled palanquin from India']
  },
  hindi:{
    box:['LII-193: डिब्बा','भाग्य का खोजी / सुंदर विधवा'],
    container:['LII-105: बेलनाकार तामचीनी का डिब्बा','बेलनाकार तामचीनी का डिब्बा'],
    'sofa-344':['LVII-344: टेपेस्ट्री से मढ़ा सोफा','वायलिन आकार की पीठ वाला फ्रांसीसी सोफा'],
    chair:['LVII-350: कुर्सी','कशीदाकारी कपड़े वाली ऊँची पीठ की कुर्सी'],
    'sofa-351':['LVII-351: सोफा','चित्रांकित कपड़े की गद्दी वाला सोफा'],
    'manicure-box':['XLIX-553: मैनिक्योर बॉक्स','सोने की परत चढ़ा बॉक्स और सात उपकरण'],
    table:['XLV-101: मेज़','जड़ाई वाली आयताकार मेज़'],
    nizam:['XXXV-6: निज़ाम अली ख़ान का शिकार अभियान','दक्कनी शैली का चित्र'],
    palanquin:['ACQ-62-99: पालकी','भारत की मीना पालकी']
  },
  bengali:{
    box:['LII-193: বাক্স','ভাগ্য অন্বেষণকারী / সুন্দরী বিধবা'],
    container:['LII-105: বেলনাকার এনামেল পাত্র','বেলনাকার এনামেল পাত্র'],
    'sofa-344':['LVII-344: টেপেস্ট্রি সোফা','ভায়োলিন-আকৃতির পিঠের ফরাসি সোফা'],
    chair:['LVII-350: চেয়ার','সূচিকর্ম করা কাপড়ের উচ্চ পিঠের চেয়ার'],
    'sofa-351':['LVII-351: সোফা','চিত্রিত কাপড়ের গদি সহ সোফা'],
    'manicure-box':['XLIX-553: ম্যানিকিউর বাক্স','সোনার প্রলেপ দেওয়া বাক্স ও সাতটি যন্ত্র'],
    table:['XLV-101: টেবিল','জড়ির কাজ করা আয়তাকার টেবিল'],
    nizam:['XXXV-6: নবাব নিজাম আলী খানের শিকার অভিযান','দাক্ষিণাত্য শৈলীর চিত্র'],
    palanquin:['ACQ-62-99: পালকি','ভারতের মীনা পালকি']
  },
  gujarati:{
    box:['LII-193: બૉક્સ','ભાગ્ય શોધનાર / સુંદર વિધવા'],
    container:['LII-105: નળાકાર દામકામવાળું પાત્ર','નળાકાર ઇનેમલ પાત્ર'],
    'sofa-344':['LVII-344: ટેપેસ્ટ્રી સોફા','વાયોલિન આકારની પીઠવાળો ફ્રેન્ચ સોફા'],
    chair:['LVII-350: ખુરશી','ભરતકામવાળા કાપડની ઊંચી પીઠવાળી ખુરશી'],
    'sofa-351':['LVII-351: સોફા','ચિત્રિત કાપડની ગાદીવાળો સોફા'],
    'manicure-box':['XLIX-553: મેનિક્યોર બૉક્સ','સોનાનો ઢોળ ચડાવેલું બૉક્સ અને સાત સાધનો'],
    table:['XLV-101: ટેબલ','જડતરકામવાળું લંબચોરસ ટેબલ'],
    nizam:['XXXV-6: નિઝામ અલી ખાનનું શિકાર અભિયાન','દક્કની શૈલીનું ચિત્ર'],
    palanquin:['ACQ-62-99: પાલખી','ભારતની મીના પાલખી']
  },
  kannada:{
    box:['LII-193: ಪೆಟ್ಟಿಗೆ','ಎ ಫಾರ್ಚೂನ್ ಹಂಟರ್ / ಎ ಬಕ್ಸಮ್ ವಿಡೋ'],
    container:['LII-105: ಸಿಲಿಂಡರ್ ಎನಾಮೆಲ್ ಪೆಟ್ಟಿಗೆ','ಸಿಲಿಂಡರ್ ಎನಾಮೆಲ್ ಪಾತ್ರೆ'],
    'sofa-344':['LVII-344: ಟೇಪೆಸ್ಟ್ರಿ ಸೋಫಾ','ವಯಲಿನ್ ಆಕಾರದ ಬೆನ್ನಿನ ಫ್ರೆಂಚ್ ಸೋಫಾ'],
    chair:['LVII-350: ಕುರ್ಚಿ','ಕಸೂತಿ ಬಟ್ಟೆಯ ಎತ್ತರದ ಬೆನ್ನಿನ ಕುರ್ಚಿ'],
    'sofa-351':['LVII-351: ಸೋಫಾ','ಚಿತ್ರಿತ ಬಟ್ಟೆಯ ಮೆತ್ತನೆಯ ಸೋಫಾ'],
    'manicure-box':['XLIX-553: ಮ್ಯಾನಿಕ್ಯೂರ್ ಪೆಟ್ಟಿಗೆ','ಚಿನ್ನದ ಲೇಪಿತ ಪೆಟ್ಟಿಗೆ ಮತ್ತು ಏಳು ಉಪಕರಣಗಳು'],
    table:['XLV-101: ಮೇಜು','ಜಡಿತ ಕೆಲಸದ ಆಯತಾಕಾರದ ಮೇಜು'],
    nizam:['XXXV-6: ನಿಜಾಮ್ ಅಲಿ ಖಾನ್ ಅವರ ಬೇಟೆಯ ದಂಡಯಾತ್ರೆ','ಡೆಕ್ಕನಿ ಶೈಲಿಯ ಚಿತ್ರ'],
    palanquin:['ACQ-62-99: ಪಲ್ಲಕ್ಕಿ','ಭಾರತದ ಮೀನಾ ಪಲ್ಲಕ್ಕಿ']
  },
  malayalam:{
    box:['LII-193: എനാമൽ പെട്ടി','എ ഫോ‍ർച്യൂൺ ഹണ്ടർ / എ ബക്സം വിഡോ'],
    container:['LII-105: എനാമൽ പാത്രം','സിലിണ്ടർ ആകൃതിയിലുള്ള പാത്രം'],
    'sofa-344':['LVII-344: ടേപ്പസ്ട്രി സോഫ','വയലിൻ ആകൃതിയിലുള്ള പുറംചട്ടയുള്ള ഫ്രഞ്ച് സോഫ'],
    chair:['LVII-350: കസേര','എംബ്രോയ്ഡറി ചെയ്ത തുണിയുള്ള ഉയർന്ന പുറകുള്ള കസേര'],
    'sofa-351':['LVII-351: സോഫ','ചിത്രം പതിച്ച തുണിയുള്ള സോഫ'],
    'manicure-box':['XLIX-553: മാനിക്യൂർ പെട്ടി','സ്വർണ്ണം പൂശിയ പെട്ടിയും ഏഴ് ഉപകരണങ്ങളും'],
    table:['XLV-101: മേശ','ജഡിത പണിയുള്ള ചതുരാകൃതിയിലുള്ള മേശ'],
    nizam:['XXXV-6: നിസാം അലി ഖാന്റെ വേട്ടയാത്ര','ഡെക്കനി ശൈലിയിലുള്ള ചിത്രം'],
    palanquin:['ACQ-62-99: പല്ലക്ക്','ഇന്ത്യൻ മീനാ പല്ലക്ക്']
  },
  marathi:{
    box:['LII-193: पेटी','ए फॉर्च्युन हंटर / अ बक्सम विडो'],
    container:['LII-105: दंडगोलाकार मीनाकाम केलेली पेटी','दंडगोलाकार मीनाकाम केलेली पेटी'],
    'sofa-344':['LVII-344: टेपेस्ट्री सोफा','व्हायोलिन आकाराच्या पाठीचा फ्रेंच सोफा'],
    chair:['LVII-350: खुर्ची','भरतकाम केलेल्या कापडाची उंच पाठीची खुर्ची'],
    'sofa-351':['LVII-351: सोफा','चित्रांकित कापडाची गादी असलेला सोफा'],
    'manicure-box':['XLIX-553: मॅनिक्युअर पेटी','सोन्याचा मुलामा दिलेली पेटी आणि सात साधने'],
    table:['XLV-101: टेबल','जडावकाम केलेले आयताकृती टेबल'],
    nizam:['XXXV-6: निजाम अली खान यांची शिकारीची मोहीम','दख्खनी शैलीतील चित्र'],
    palanquin:['ACQ-62-99: पालखी','भारताची मीना पालखी']
  },
  odia:{
    box:['LII-193: ବାକ୍ସ','ଭାଗ୍ୟ ଅନ୍ୱେଷଣକାରୀ / ସୁନ୍ଦର ବିଧବା'],
    container:['LII-105: ବେଲନାକାର ଏନାମେଲ୍ ପାତ୍ର','ବେଲନାକାର ଏନାମେଲ୍ ପାତ୍ର'],
    'sofa-344':['LVII-344: ଟେପେଷ୍ଟ୍ରି ସୋଫା','ଭାୟୋଲିନ୍ ଆକାରର ପିଠି ଥିବା ଫ୍ରେଞ୍ଚ ସୋଫା'],
    chair:['LVII-350: ଚେୟାର୍','କାଢ଼ାକାମ ହୋଇଥିବା କପଡ଼ାର ଉଚ୍ଚ ପିଠି ଚେୟାର୍'],
    'sofa-351':['LVII-351: ସୋଫା','ଚିତ୍ରିତ କପଡ଼ାର ଗଦି ଥିବା ସୋଫା'],'manicure-box':['XLIX-553: ମେନିକ୍ୟୁଅର୍ ବାକ୍ସ','ସୁନା ଲେପ ଥିବା ବାକ୍ସ ଓ ସାତଟି ଉପକରଣ'],
    table:['XLV-101: ଟେବୁଲ୍','ଜଡ଼ାଇ କାମ ହୋଇଥିବା ଆୟତାକାର ଟେବୁଲ୍'],
    nizam:['XXXV-6: ନିଜାମ୍ ଅଲ୍ଲୀ ଖାନ୍‌ଙ୍କ ଶିକାର ଅଭିଯାନ','ଦକ୍ଷିଣାତ୍ୟ ଶୈଳୀର ଚିତ୍ର'],
    palanquin:['ACQ-62-99: ପାଲିଙ୍କି','ଭାରତର ମୀନା ପାଲିଙ୍କି']
  },
  telugu:{
    box:['LII-193: పెట్టె','ఎ ఫార్చూన్ హంటర్ / ఎ బక్సమ్ విడో'],
    container:['LII-105: స్థూపాకార ఎనామెల్ పెట్టె','స్థూపాకార ఎనామెల్ పాత్ర'],
    'sofa-344':['LVII-344: టేపెస్ట్రీ సోఫా','వయోలిన్ ఆకారపు వెనుక భాగం గల ఫ్రెంచ్ సోఫా'],
    chair:['LVII-350: కుర్చీ','ఎంబ్రాయిడరీ వస్త్రంతో కూడిన ఎత్తైన వెనుక కుర్చీ'],'sofa-351':['LVII-351: సోఫా','చిత్రించిన వస్త్రపు మెత్తతో కూడిన సోఫా'],
    'manicure-box':['XLIX-553: మానిక్యూర్ పెట్టె','బంగారు పూత పెట్టె మరియు ఏడు పరికరాలు'],
    table:['XLV-101: బల్ల','ఇన్‌లే పనితో కూడిన దీర్ఘచతురస్రాకార బల్ల'],
    nizam:['XXXV-6: నిజాం అలీ ఖాన్ వేట యాత్ర','డెక్కన్ శైలి చిత్రం'],
    palanquin:['ACQ-62-99: పల్లకి','భారతదేశపు మీనా పల్లకి']
  },
  tamil:{
    box:['LII-193: பெட்டி','அதிர்ஷ்ட வேட்டைக்காரர் / அழகிய விதவை'],
    container:['LII-105: உருளை எனாமல் பெட்டி','உருளை வடிவ எனாமல் பெட்டி'],
    'sofa-344':['LVII-344: திரைச்சீலை சோபா','வயலின் வடிவ முதுகுப்புறம் கொண்ட பிரெஞ்சு சோபா'],
    chair:['LVII-350: நாற்காலி','எம்பிராய்டரி துணியுடன் கூடிய உயரமான நாற்காலி'],'sofa-351':['LVII-351: சோபா','வரையப்பட்ட துணி மெத்தை கொண்ட சோபா'],
    'manicure-box':['XLIX-553: கைப்பெட்டி','தங்க முலாம் பூசப்பட்ட பெட்டி மற்றும் ஏழு கருவிகள்'],
    table:['XLV-101: மேசை','உள்ளீட்டு வேலைப்பாடுள்ள செவ்வக மேசை'],
    nizam:['XXXV-6: நிஜாம் அலி கானின் வேட்டை பயணம்','தக்காணி பாணி ஓவியம்'],
    palanquin:['ACQ-62-99: பல்லக்கு','இந்திய மீனா பல்லக்கு']
  },
  urdu:{
    box:['LII-193: باکس','اے فارچیون ہنٹر / ایک خوبصورت بیوہ'],
    container:['LII-105: بیضوی مینا کاری والا ڈبہ','بیلناکار مینا کاری کا برتن'],
    'sofa-344':['LVII-344: ٹیپسٹری صوفہ','وائلن نما پشت والا فرانسیسی صوفہ'],
    chair:['LVII-350: کرسی','کڑھائی والے کپڑے کی اونچی پشت والی کرسی'],'sofa-351':['LVII-351: صوفہ','مصور کپڑے کی گدی والا صوفہ'],
    'manicure-box':['XLIX-553: مینیکیور باکس','سونے کا ملمع شدہ باکس اور سات آلات'],
    table:['XLV-101: میز','جڑاؤ کام والی مستطیل میز'],
    nizam:['XXXV-6: نظام علی خان کی شکار مہم','دکنی طرز کی پینٹنگ'],
    palanquin:['ACQ-62-99: پالکی','ہندوستانی مینا پالکی']
  }
};

function generatePage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const meta = itemsMeta[itemIndex];
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const descArr = westernFurnitureContent[lang] || westernFurnitureContent.english || [];
    const descText = descArr[itemIndex] || descArr[0] || '';

    const labelPair = (labels[lang] && labels[lang][meta.key]) ? labels[lang][meta.key] : labels.english[meta.key];
    const title = labelPair[0];
    const badge = labelPair[1];

    const isDisplay = lang === 'hindi' ? 'block' : 'none';
    const isRtl = lang === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
    const imgPath = `${relPath}${meta.img}`;

    // Audio path check
    const langAudioFile = `${lang}-${meta.key}.wav`;
    const fullLangAudioPath = path.join(galleryDir, 'audio', langAudioFile);
    let audioFile = meta.baseAudio;
    if (fs.existsSync(fullLangAudioPath)) {
      audioFile = langAudioFile;
    }
    const audioPath = `${relPath}audio/${audioFile}`;
    audioMap[lang] = audioPath;

    const formattedDesc = descText.split('\n\n').join('<br><br>');

    langDivsHtml += `
    <div class="bookContentDiv langCnt" id="${lang}" style="display: ${isDisplay};">
      <h2 class="cntHdng" ${isRtl}>${title}</h2>
      <div class="booImgDiv">
        <img src="${imgPath}" alt="${title}">
      </div>
      <div class="bookCntDiv">
        <p style="margin-bottom: 8px; font-weight: bold; color: #a50309;">${badge}</p>
        <div ${isRtl} style="font-size: 16px; line-height: 1.8; color: #333333;">${formattedDesc}</div>
      </div>
    </div>`;
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Western Furniture Gallery - Item ${itemNum} | Salar Jung Museum</title>
  <link href="${relPath}css/bootstrap.min.css" rel="stylesheet" onerror="this.remove()">
  <link rel="stylesheet" href="${relPath}css/styles.css">
  <style>
    .audioPlayerDiv {
      max-width: 900px;
      margin: 20px auto 0 auto;
      padding: 0 15px;
    }
    .bookContentDiv {
      max-width: 900px;
      margin: 20px auto 40px auto;
      padding: 25px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      box-sizing: border-box;
    }
    .cntHdng {
      font-size: 26px;
      font-weight: 700;
      color: #a50309;
      margin: 0 0 16px 0;
      line-height: 1.3;
    }
    .booImgDiv {
      width: 100%;
      max-height: 480px;
      overflow: hidden;
      border-radius: 10px;
      background: #ffffff;
      border: 1px solid #eee;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .booImgDiv img {
      max-height: 460px;
      width: auto;
      max-width: 100%;
      object-fit: contain;
      border-radius: 6px;
    }
    .bookCntDiv {
      font-size: 16px;
      line-height: 1.8;
      color: #333;
    }
    .navBtnDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 900px;
      margin: 30px auto;
      padding: 0 15px;
    }
    .navBtn {
      background-color: #a50309;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
    }
    .navBtn:hover {
      background-color: #7a0206;
      color: white;
    }
  </style>
</head>
<body>
  <div class="sliderHeaderDiv">
    <div class="container">
      <header>
        <div class="logoLft">
          <a href="${relPath}index.html" class="logo logoTwo">
            <img src="${relPath}images/logo-moc.png" onerror="this.onerror=null; this.src='${relPath}images/logo.png';" alt="Ministry of Culture">
          </a>
        </div>
        <div class="logoRgt">
          <div class="langDiv">
            <span class="anuIcn">
              <img src="${relPath}images/logo-anu.png" alt="Anuvadini">
            </span>
            <select class="form formLang" id="languageSelector" aria-label="Select language">
              ${langOptionsHtml}
            </select>
          </div>
        </div>
      </header>
    </div>
  </div>

  <main>
    <div class="audioPlayerDiv">
      <div style="background: #2e2e2e; color: #fff; padding: 15px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500; color: #ddd;">Audio Explanation / ऑडियो विवरण:</p>
        <audio id="languageAudio" controls preload="metadata" style="width: 100%; outline: none;" src="${audioMap['hindi']}"></audio>
        <p id="audioMissingNote" style="margin: 6px 0 0 0; font-size: 12px; color: #ffca28; display: none;">Audio for selected language is not available. Playing default audio.</p>
      </div>
    </div>

    ${langDivsHtml}

    <div class="navBtnDiv">
      ${itemNum > 1 ? `<a href="${relPath}item${itemNum - 1}.html" class="navBtn">← Previous Item</a>` : `<span></span>`}
      <a href="${relPath}index.html" class="navBtn">Back to Gallery Overview</a>
      ${itemNum < itemsMeta.length ? `<a href="${relPath}item${itemNum + 1}.html" class="navBtn">Next Item →</a>` : `<span></span>`}
    </div>
  </main>

  <footer>
    <p>© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a></p>
  </footer>

  <script>
    const selector = document.getElementById('languageSelector');
    const audioPlayer = document.getElementById('languageAudio');
    const missingNote = document.getElementById('audioMissingNote');
    const audioMap = ${JSON.stringify(audioMap, null, 2)};
    const baseAudioSrc = "${audioMap['hindi']}";

    function changeLanguage(lang) {
      document.querySelectorAll('.langCnt').forEach(el => {
        el.style.display = (el.id === lang) ? 'block' : 'none';
      });

      const audioSrc = audioMap[lang] || baseAudioSrc;
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.onerror = function() {
          audioPlayer.onerror = null;
          audioPlayer.src = baseAudioSrc;
          audioPlayer.load();
          if (missingNote) missingNote.style.display = 'block';
        };
        audioPlayer.src = audioSrc;
        audioPlayer.load();
        if (missingNote) missingNote.style.display = 'none';
      }
    }

    selector.addEventListener('change', function() {
      changeLanguage(this.value);
    });

    changeLanguage(selector.value);
  </script>
</body>
</html>`;
}

for (let i = 0; i < itemsMeta.length; i++) {
  const itemNum = i + 1;
  const rootItemPath = path.join(galleryDir, `item${itemNum}.html`);
  const rootHtml = generatePage(i, './');
  fs.writeFileSync(rootItemPath, rootHtml, 'utf8');

  const folderName = `Item${itemNum}`;
  const subFolderPath = path.join(galleryDir, folderName);
  if (!fs.existsSync(subFolderPath)) {
    fs.mkdirSync(subFolderPath, { recursive: true });
  }
  const subItemPath = path.join(subFolderPath, 'index.html');
  const subHtml = generatePage(i, '../');
  fs.writeFileSync(subItemPath, subHtml, 'utf8');
}

console.log('Successfully regenerated Western Furniture Gallery pages!');
