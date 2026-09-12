const fs = require('fs');
const path = require('path');
const galleryDir = path.join(__dirname, 'MetalWareGallery');
const contentJsPath = path.join(galleryDir, 'content.js');

// Load content.js
const contentJs = fs.readFileSync(contentJsPath, 'utf8');
const window = {};
eval(contentJs);
const metalWareContent = window.metalWareContent;

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
  { key: 'conch', img: 'images/ACQ-86-19.png', acc: 'ACQ-86-19', defaultTitle: 'Temple Conch' },
  { key: 'bedpost', img: 'images/ACQ-86-12.png', acc: 'ACQ-86-12', defaultTitle: 'Bedstead Leg' },
  { key: 'tray', img: 'images/XLIV-461.png', acc: 'XLIV-461', defaultTitle: 'Tray' },
  { key: 'vase', img: 'images/XLIV-198.png', acc: 'XXV-198', defaultTitle: 'Vase' },
  { key: 'mirror', img: 'images/XXVIII-138.png', acc: 'XXVIII-138', defaultTitle: 'Mirror with Stand' },
  { key: 'plate', img: 'images/ACQ-86-3.png', acc: 'ACQ-86-3', defaultTitle: 'Plate' },
  { key: 'box', img: 'images/XLIV-216.png', acc: 'XLIV-216', defaultTitle: 'Box' },
  { key: 'nata-kumbha', img: 'images/XLII-104.png', acc: 'XLII-104', defaultTitle: 'Nata Kumbha' },
  { key: 'sprinkler', img: 'images/XLIV-439.png', acc: 'XLIV-439', defaultTitle: 'Sprinkler' },
  { key: 'tong', img: 'images/XLIV-146-1.png', acc: 'XLIV-146-1', defaultTitle: 'Tong' }
];

const labels = {
  english: {
    conch: ['ACQ-86-19: Temple Conch', 'Shaivite Temple Conch'],
    bedpost: ['ACQ-86-12: Bedstead Leg', 'Ornate Copper & Brass Bed Post'],
    tray: ['XLIV-461: Tray', 'Ganga-Jamuni Filigree Leaf Tray'],
    vase: ['XXV-198: Vase', 'Silver Fluted Vase'],
    mirror: ['XXVIII-138: Mirror with Stand', 'Metallic Mirror Stand from Persia'],
    plate: ['ACQ-86-3: Plate', 'Shallow Metal Plate from Punjab'],
    box: ['XLIV-216: Box', 'Rectangular Silver Box with Goddess Lakshmi'],
    'nata-kumbha': ['XLII-104: Nata Kumbha', 'Temple Oil Lamp (Sukunda) from Nepal'],
    sprinkler: ['XLIV-439: Sprinkler', 'Ganga-Jamuni Filigree Rose Water Sprinkler'],
    tong: ['XLIV-146-1: Tong', 'Enamelled Silver Sugar Tong from Russia']
  },
  hindi: {
    conch: ['ACQ-86-19: मंदिर शंख', 'शैव मंदिर का शंख'],
    bedpost: ['ACQ-86-12: पलंग का पायदान', 'ताँबे और पीतल से बना पलंग का पायदान'],
    tray: ['XLIV-461: ट्रे', 'गंगा-जमुनी शैली की सपाट ट्रे'],
    vase: ['XXV-198: कलश', 'चाँदी से निर्मित कलश'],
    mirror: ['XXVIII-138: स्टैंड सहित दर्पण', 'फ़ारस का धातु का दर्पण-स्टैंड'],
    plate: ['ACQ-86-3: प्लेट', 'तांबे तथा सोने से निर्मित थाली'],
    box: ['XLIV-216: डिब्बा (बॉक्स)', 'चाँदी से निर्मित आयताकार डिब्बा'],
    'nata-kumbha': ['XLII-104: नाटा कुंभ', 'नेपाल का मंदिर का दीपक (सुकुंडा)'],
    sprinkler: ['XLIV-439: स्प्रिंकलर (छिड़काव यंत्र)', 'गंगा-जमुनी फिलिग्री गुलाब जल छिड़काव पात्र'],
    tong: ['XLIV-146-1: चिमटी (टॉन्ग)', 'रूस की एनामेलयुक्त शक्कर की चिमटी']
  },
  tamil: {
    conch: ['ACQ-86-19: கோயில் சங்கு', 'சைவக் கோவில் சங்கு'],
    bedpost: ['ACQ-86-12: கட்டில் கால்', 'செம்பு மற்றும் பித்தளையால் செய்யப்பட்ட கட்டில் கால்'],
    tray: ['XLIV-461: தட்டு', 'கங்கா-ஜம்னா இலையின் வடிவத்திலான தட்டு'],
    vase: ['XXV-198: குவளை', 'வெள்ளியால் செய்யப்பட்ட பூக்குவளை'],
    mirror: ['XXVIII-138: தாங்கியுடன் கூடிய கண்ணாடி', 'பாரசீகத்தின் உலோகக் கண்ணாடித் தாங்கி'],
    plate: ['ACQ-86-3: தட்டு', 'செம்பு மற்றும் தங்கக் கலவை தட்டு'],
    box: ['XLIV-216: பெட்டி', 'வெள்ளியால் செய்யப்பட்ட செவ்வகப் பெட்டி'],
    'nata-kumbha': ['XLII-104: நட கும்பம்', 'நேபாளத்தின் கோயில் விளக்கு (சுகுந்தா)'],
    sprinkler: ['XLIV-439: தெளிப்பான்', 'கங்கா-ஜம்னி பன்னீர் தெளிப்பான்'],
    tong: ['XLIV-146-1: இடுக்க்கி', 'ரஷ்ய நாட்டுச் சர்க்கரை இடுக்கி']
  },
  malayalam: {
    conch: ['ACQ-86-19: ക്ഷേത്ര ശംഖ്', 'ശൈവ ക്ഷേത്ര ശംഖ്'],
    bedpost: ['ACQ-86-12: കട്ടിൽ കാൽ', 'ചെമ്പും പിച്ചളയും ഉപയോഗിച്ചുള്ള കട്ടിൽ കാൽ'],
    tray: ['XLIV-461: തളിക', 'ഗംഗ-ജംനി പരന്ന തളിക (ഫിലിഗ്രി)'],
    vase: ['XXV-198: പൂച്ചട്ടി', 'വെള്ളിയിൽ നിർമ്മിച്ച പൂച്ചട്ടി'],
    mirror: ['XXVIII-138: സ്റ്റാൻഡോടു കൂടിയ കണ്ണാടി', 'പേർഷ്യയിലെ ലോഹ കണ്ണാടിയും സ്റ്റാൻഡും'],
    plate: ['ACQ-86-3: പ്ലേറ്റ്', 'ചെമ്പും സ്വർണ്ണവും ഉപയോഗിച്ച പ്ലേറ്റ്'],
    box: ['XLIV-216: പെട്ടി', 'വെള്ളിയിൽ നിർമ്മിച്ച ദീർഘചതുരാകൃതിയിലുള്ള പെട്ടി'],
    'nata-kumbha': ['XLII-104: നാട കുംഭ', 'നേപ്പാളിലെ ക്ഷേത്ര വിളക്ക് (സുകുന്ദ)'],
    sprinkler: ['XLIV-439: സ്പ്രിങ്ക്ലർ', 'റോസ് വാട്ടർ സ്പ്രിങ്ക്ലർ'],
    tong: ['XLIV-146-1: ടോംഗ്', 'റഷ്യൻ പഞ്ചസാര ടോങ്']
  },
  odia: {
    conch: ['ACQ-86-19: ମନ୍ଦିର ଶଙ୍ଖ', 'ଶୈବ ମନ୍ଦିର ଶଙ୍ଖ'],
    bedpost: ['ACQ-86-12: ଖଟଖୁରା ବା ଖଟଖମ୍ବ', 'କାଂସ୍ୟ ଓ ପିତ୍ତଳ ନିର୍ମିତ ଖଟଖୁରା'],
    tray: ['XLIV-461: ଥାଳି', 'ଗଙ୍ଗା-ଜମୁନୀ ଶୈଳୀର ତାରକସି ଥାଳି'],
    vase: ['XXV-198: ଫୁଲଦାନୀ', 'ଭାରତୀୟ ରୂପା ଫୁଲଦାନୀ'],
    mirror: ['XXVIII-138: ଷ୍ଟାଣ୍ଡ ଥିବା ଦର୍ପଣ', 'ପାରସ୍ୟର ଧାତବ ଦର୍ପଣ ଷ୍ଟାଣ୍ଡ'],
    plate: ['ACQ-86-3: ଥାଳି', 'ତମ୍ବା ଓ ସୁନାର ମିଶ୍ରଣର ଥାଳି'],
    box: ['XLIV-216: ବାକ୍ସ', 'ଆୟତାକାର ରୂପା ବାକ୍ସ'],
    'nata-kumbha': ['XLII-104: ନଟ କୁମ୍ଭ', 'ନେପାଳର ମନ୍ଦିର ଦୀପ (ସୁକୁନ୍ଦା)'],
    sprinkler: ['XLIV-439: ଜଳ ସିଞ୍ચନକାରୀ ପାତ୍ର', 'ଗୋଲାପ ଜଳ ସିଞ୍ચନକାରୀ ପାତ୍ର'],
    tong: ['XLIV-146-1: ଚିମୁଟା', 'ରୁଷିଆର ଚିନି ଧରା ଚିମୁଟା']
  },
  bengali: {
    conch: ['ACQ-86-19: মন্দির-শঙ্খ', 'শৈব মন্দির-শঙ্খ'],
    bedpost: ['ACQ-86-12: খাটের পায়া', 'তামা ও পিতলের তৈরি খাটের পা'],
    tray: ['XLIV-461: ট্রে', 'গঙ্গা-যমুনা ফিলিগরি কাজ করা ট্রে'],
    vase: ['XXV-198: ফুলদানি', 'রুপা দিয়ে তৈরি ফুলদানি'],
    mirror: ['XXVIII-138: স্ট্যান্ডসহ আয়না', 'পারস্যের ধাতব আয়নার স্ট্যান্ড'],
    plate: ['ACQ-86-3: থালা', 'তামা এবং সোনার ধাতব থালা'],
    box: ['XLIV-216: বক্স', 'রুপো দিয়ে তৈরি আয়তক্ষেত্রাকার বাক্স'],
    'nata-kumbha': ['XLII-104: নাটা কুম্ভ', 'নেপালের মন্দির প্রদীপ (সুকুন্দা)'],
    sprinkler: ['XLIV-439: গোলাপ জল ছিটানোর পাত্র', 'গঙ্গা-যমুনা ফিলিগরি কাজের পাত্র'],
    tong: ['XLIV-146-1: চিমটে', 'রুশ এনামেল করা চিনির চিমটে']
  },
  telugu: {
    conch: ['ACQ-86-19: గుడి శంఖం', 'శైవ గుడి శంఖం'],
    bedpost: ['ACQ-86-12: మంచం కోళ్ళు', 'రాగి మరియు ఇత్తడి మంచం కోళ్ళు'],
    tray: ['XLIV-461: పళ్ళెం', 'గంగా-జమునా శైలి పళ్ళెం'],
    vase: ['XXV-198: పువ్వుల కుండీ', 'వెండి పూల కుండీ'],
    mirror: ['XXVIII-138: అద్దం స్టాండు', 'పారశీక లోహ అద్దం స్టాండు'],
    plate: ['ACQ-86-3: పళ్ళెం', 'రాగి మరియు బంగారు పూత పళ్ళెం'],
    box: ['XLIV-216: పెట్టె', 'లక్ష్మీ దేవి బొమ్మ గల వెండి పెట్టె'],
    'nata-kumbha': ['XLII-104: నటా కుంభ', 'నేపాల్ గుడి దీపం (సుకుందా)'],
    sprinkler: ['XLIV-439: పన్నీరు చిలకరించే పాత్ర', 'గంగా-జమునా పన్నీరు పాత్ర'],
    tong: ['XLIV-146-1: పట్టుకారు', 'రష్యా చక్కెర పట్టుకారు']
  },
  marathi: {
    conch: ['ACQ-86-19: मंदिराचा शंख', 'शैव मंदिराचा शंख'],
    bedpost: ['ACQ-86-12: पलंगाचा पाया', 'तांबे आणि पितळेचा पलंगाचा पाया'],
    tray: ['XLIV-461: ट्रे', 'गंगा-जमुना शैलीतील ट्रे'],
    vase: ['XXV-198: कलश', 'चांदीचा कलश'],
    mirror: ['XXVIII-138: आरशाचा स्टैंड', 'इराणचा धातूचा आरशाचा स्टैंड'],
    plate: ['ACQ-86-3: थाळी', 'तांबे आणि सोन्याची थाळी'],
    box: ['XLIV-216: डबा', 'आयताकृती चांदीचा डबा'],
    'nata-kumbha': ['XLII-104: नाटा कुंभ', 'नेपाळचा मंदिर दिवा (सुकुंडा)'],
    sprinkler: ['XLIV-439: स्प्रिंकलर', 'गुलाब पाणी शिंपडणारे पात्र'],
    tong: ['XLIV-146-1: चिमटा', 'रशियाचा साखरेचा चिमटा']
  },
  kannada: {
    conch: ['ACQ-86-19: ಶಂಖ', 'ಶೈವ ದೇವಾಲಯದ ಶಂಖ'],
    bedpost: ['ACQ-86-12: ಮಂಚದ ಕಾಲು', 'ತಾಮ್ರ ಮತ್ತು ಹಿತ್ತಾಳೆಯ ಮಂಚದ ಕಾಲು'],
    tray: ['XLIV-461: ತಟ್ಟೆ', 'ಗಂಗಾ-ಜಮುನಾ ಶೈಲಿಯ ತಟ್ಟೆ'],
    vase: ['XXV-198: ಹೂದಾನಿ', 'ಬೆಳ್ಳಿಯ ಹೂದಾನಿ'],
    mirror: ['XXVIII-138: ಕನ್ನಡಿ ಸ್ಟ್ಯಾಂಡ್', 'ಪರ್ಷಿಯನ್ ಲೋಹದ ಕನ್ನಡಿ ಸ್ಟ್ಯಾಂಡ್'],
    plate: ['ACQ-86-3: ತಟ್ಟೆ', 'ತಾಮ್ರ ಮತ್ತು ಚಿನ್ನದ ತಟ್ಟೆ'],
    box: ['XLIV-216: ಪೆಟ್ಟಿಗೆ', 'ಬೆಳ್ಳಿಯ ಆಯತಾಕಾರದ ಪೆಟ್ಟಿಗೆ'],
    'nata-kumbha': ['XLII-104: ನಾಟ ಕುಂಭ', 'ನೇಪಾಳದ ದೇವಾಲಯದ ದೀಪ (ಸುಕುಂದ)'],
    sprinkler: ['XLIV-439: ಸ್ಪ್ರಿಂಕ್ಲರ್', 'ಪನ್ನೀರು ಚಿಮುಕಿಸುವ ಪಾತ್ರೆ'],
    tong: ['XLIV-146-1: ಇಕ್ಕುಳ', 'ರಷ್ಯಾದ ಸಕ್ಕರೆ ಇಕ್ಕುಳ']
  },
  gujarati: {
    conch: ['ACQ-86-19: શંખ', 'શૈવ મંદિરનો શંખ'],
    bedpost: ['ACQ-86-12: પલંગનો પાયો', 'તાંબા અને પીતળનો પાયો'],
    tray: ['XLIV-461: ટ્રે', 'ગંગા-જમુના શૈલીની ટ્રે'],
    vase: ['XXV-198: ફુલદાની', 'ચાંદીની ફુલદાની'],
    mirror: ['XXVIII-138: અરીસાનું સ્ટેન્ડ', 'પર્શિયન ધાતુનું સ્ટેન્ડ'],
    plate: ['ACQ-86-3: થાળી', 'તાંબા અને સોનાની થાળી'],
    box: ['XLIV-216: બોક્સ', 'ચાંદીનું લંબચોરસ બોક્સ'],
    'nata-kumbha': ['XLII-104: નાટા કુંભ', 'નેપાળનો મંદિરનો દીવો (સુકુંડા)'],
    sprinkler: ['XLIV-439: સ્પ્રિંકલર', 'ગુલાબજળ છાંટવાનું પાત્ર'],
    tong: ['XLIV-146-1: ચીપિયો', 'રશિયન સાકરનો ચીપિયો']
  },
  urdu: {
    conch: ['ACQ-86-19: مندر کا شنکھ', 'شیو مندر کا شنکھ'],
    bedpost: ['ACQ-86-12: پلنگ کا پایا', 'تانبے اور پیتل کا پایا'],
    tray: ['XLIV-461: ٹرے', 'گنگا جمنی طرز کی ٹرے'],
    vase: ['XXV-198: گلدان', 'چاندی کا گلدان'],
    mirror: ['XXVIII-138: آئینے کا اسٹینڈ', 'ایرانی دھاتی اسٹینڈ'],
    plate: ['ACQ-86-3: پلیٹ', 'تانبے اور سونے کی تھالی'],
    box: ['XLIV-216: ڈبہ', 'چاندی کا مستطیل ڈبہ'],
    'nata-kumbha': ['XLII-104: ناٹا کنبھ', 'نیپال کا مندر کا چراغ (سوکونڈا)'],
    sprinkler: ['XLIV-439: گلاب پاش', 'چاندی کا گلاب پاش'],
    tong: ['XLIV-146-1: چمٹا', 'روسی شکر کا چمٹا']
  }
};

// Helper for exact audio relative paths
function getAudioPath(lang, index) {
  const meta = itemsMeta[index];
  let audioRel = '';
  
  if (lang === 'bengali') {
    const map = [
      'Audios/Bengali/1. Metal Ware Gallery/ACQ-86-19 TEMPLE CONCH.wav',
      'Audios/Bengali/1. Metal Ware Gallery/ACQ-86-12 Bed Post.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XLIV-461 Tray.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XXV-198 Vase.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XXVIII-138 MIRROR WITH STAND Metallic mirror stand with a round_.wav',
      'Audios/Bengali/1. Metal Ware Gallery/ACQ-86-3 Plate.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XLIV-216 Box.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XLII-104 NATA KUMBHA.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XLIV-439 SPRINKLER.wav',
      'Audios/Bengali/1. Metal Ware Gallery/XLIV-146-1 Tong_.wav'
    ];
    audioRel = map[index];
  } else if (lang === 'malayalam') {
    const map = [
      'Audios/Malayalam/Metal Ware Gallery/TEMPLE CONCH.wav',
      'Audios/Malayalam/Metal Ware Gallery/Bed Post.wav',
      'Audios/Malayalam/Metal Ware Gallery/Tray.wav',
      'Audios/Malayalam/Metal Ware Gallery/Vase.wav',
      'Audios/Malayalam/Metal Ware Gallery/MIRROR WITH STAND.wav',
      'Audios/Malayalam/Metal Ware Gallery/Plate.wav',
      'Audios/Malayalam/Metal Ware Gallery/Box.wav',
      'Audios/Malayalam/Metal Ware Gallery/NATA KUMBHA.wav',
      'Audios/Malayalam/Metal Ware Gallery/SPRINKLER.wav',
      'Audios/Malayalam/Metal Ware Gallery/Tong.wav'
    ];
    audioRel = map[index];
  } else if (lang === 'odia') {
    const map = [
      'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-19 TEMPLE CONCH.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-12 Bed Post.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XLIV-461 Tray.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XXV-198 Vase.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XXVIII-138 MIRROR WITH STAND.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-3 Plate.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XLIV-216 Box.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XLII-104 NATA KUMBHA.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XLIV-439 SPRINKLER.wav',
      'Audios/Odia/1. Metal Ware Gallery.or/XLIV-146-1 Tong.wav'
    ];
    audioRel = map[index];
  } else if (lang === 'tamil') {
    const map = [
      'Audios/TAMIL/1. Metal Ware Gallery/1. TEMPLE CONCH_TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/2. BED POST_TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/3. TRAY_TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/4. VASE _TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/5. MIRROR WITH STAND_ TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/6. PLATE_TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/7. BOX _TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/8. NATA KUMBHA _TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/9. SPRINKLER_ TAMIL.wav',
      'Audios/TAMIL/1. Metal Ware Gallery/10.TONG_TAMIL.wav'
    ];
    audioRel = map[index];
  }

  // Check if file exists, else return default audio
  if (audioRel && fs.existsSync(path.join(galleryDir, audioRel))) {
    return audioRel;
  }
  
  // Fallback to Tamil or Malayalam or Odia if available
  const fallbackOdia = `Audios/Odia/1. Metal Ware Gallery.or/${['ACQ-86-19 TEMPLE CONCH.wav', 'ACQ-86-12 Bed Post.wav', 'XLIV-461 Tray.wav', 'XXV-198 Vase.wav', 'XXVIII-138 MIRROR WITH STAND.wav', 'ACQ-86-3 Plate.wav', 'XLIV-216 Box.wav', 'XLII-104 NATA KUMBHA.wav', 'XLIV-439 SPRINKLER.wav', 'XLIV-146-1 Tong.wav'][index]}`;
  if (fs.existsSync(path.join(galleryDir, fallbackOdia))) {
    return fallbackOdia;
  }
  return '';
}

function generatePage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const meta = itemsMeta[itemIndex];
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const descArr = metalWareContent[lang] || metalWareContent.hindi || metalWareContent.english || [];
    const descText = descArr[itemIndex] || descArr[0] || '';

    const labelPair = (labels[lang] && labels[lang][meta.key]) ? labels[lang][meta.key] : labels.english[meta.key];
    const title = labelPair[0];
    const badge = labelPair[1];

    const isDisplay = lang === 'hindi' ? 'block' : 'none';
    const isRtl = lang === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
    const imgPath = `${relPath}${meta.img}`;

    const audioRel = getAudioPath(lang, itemIndex);
    const audioPath = audioRel ? `${relPath}${encodeURI(audioRel)}` : `${relPath}${encodeURI(getAudioPath('hindi', itemIndex) || getAudioPath('odia', itemIndex))}`;
    audioMap[lang] = audioPath;

    const formattedDesc = descText.split('\n\n').join('<br><br>');

    langDivsHtml += `
    <div class="bookContentDiv langCnt" id="${lang}" style="display: ${isDisplay};">
      <h2 class="cntHdng" ${isRtl}>${title}</h2>
      <div class="booImgDiv">
        <img src="${imgPath}" alt="${title}" onerror="this.onerror=null; this.src='${relPath}${meta.img}';">
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
  <title>Metal Ware Gallery - Item ${itemNum} | Salar Jung Museum</title>
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

  <script src="${relPath}content.js"></script>
  <script>
    const itemIndex = ${itemIndex};
    const selector = document.getElementById('languageSelector');
    const audioPlayer = document.getElementById('languageAudio');
    const missingNote = document.getElementById('audioMissingNote');
    const audioMap = ${JSON.stringify(audioMap, null, 2)};
    const baseAudioSrc = "${audioMap['hindi']}";

    const contentMap = {
      "hindi": "hindiContent",
      "english": "englishContent",
      "tamil": "tamilContent",
      "marathi": "marathiContent",
      "malayalam": "malayalamContent",
      "kannada": "kannadaContent",
      "odia": "odiaContent",
      "bengali": "bengaliContent",
      "gujarati": "gujaratiContent",
      "urdu": "urduContent",
      "telugu": "teluguContent"
    };

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

      if (window.metalWareContent && window.metalWareContent[lang] && window.metalWareContent[lang][itemIndex]) {
        const langEl = document.querySelector('#' + lang + ' .bookCntDiv div');
        if (langEl) {
          langEl.textContent = window.metalWareContent[lang][itemIndex];
        }
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

// Write item pages
for (let i = 0; i < itemsMeta.length; i++) {
  const itemNum = i + 1;
  const rootItemPath = path.join(galleryDir, `item${itemNum}.html`);
  const rootHtml = generatePage(i, './');
  fs.writeFileSync(rootItemPath, rootHtml, 'utf8');

  const folderName = `item${itemNum}`;
  const subFolderPath = path.join(galleryDir, folderName);
  if (!fs.existsSync(subFolderPath)) {
    fs.mkdirSync(subFolderPath, { recursive: true });
  }
  const subItemPath = path.join(subFolderPath, 'index.html');
  const subHtml = generatePage(i, '../');
  fs.writeFileSync(subItemPath, subHtml, 'utf8');
}

console.log('Generated all 10 item pages and subfolder index pages!');
