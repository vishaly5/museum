const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'MetalWareGallery');
const indexPath = path.join(galleryDir, 'index.html');

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

const intros = {
  english: { title: 'Metal Ware Gallery', desc: 'A selection of metalware objects from the Salar Jung Museum, including temple conches, bedstead legs, trays, vases, mirror stands, plates, boxes, ritual oil lamps, rose water sprinklers and sugar tongs.' },
  hindi: { title: 'धातु शिल्प दीर्घा', desc: 'सालार जंग संग्रहालय की धातु शिल्प दीर्घा से चयनित वस्तुओं में मंदिर के शंख, पलंग के पायदान, ट्रे, कलश, दर्पण-स्टैंड, थाली, डिब्बे, अनुष्ठानिक दीपक, गुलाब जल छिड़काव यंत्र और चिमटी शामिल हैं।' },
  tamil: { title: 'உலோகப் பாண்டக் காட்சியகம்', desc: 'சாலார் ஜங் அருங்காட்சியகத்தின் உலோகப் பாண்டக் காட்சியகத்திலிருந்து தேர்ந்தெடுக்கப்பட்ட சில பொருட்கள்: கோயில் சங்கு, கட்டில் கால், தட்டு, பூக்குவளை, கண்ணாடித் தாங்கி, தட்டு, பெட்டி, நட கும்பம், தெளிப்பான் மற்றும் இடுக்கி.' },
  malayalam: { title: 'മെറ്റൽ വെയർ ഗാലറി', desc: 'സലാർ ജംഗ് മ്യൂസിയത്തിലെ മെറ്റൽ വെയർ ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുത്ത ലോഹസാമഗ്രികളിൽ ക്ഷേത്ര ശംഖ്, കട്ടിൽ കാൽ, തളിക, പൂച്ചട്ടി, കണ്ണാടി സ്റ്റാൻഡ്, പ്ലേറ്റ്, പെട്ടി, നാട കുംഭ വിളക്ക്, സ്പ്രിങ്ക്ലർ, ടോംഗ് എന്നിവ ഉൾപ്പെടുന്നു.' },
  odia: { title: 'ମେଟାଲ ୱେୟାର ଗ୍ୟାଲେରୀ', desc: 'ସାଲାର୍ ଜଙ୍ଗ୍ ସଂଗ୍ରହାଳୟର ମେଟାଲ ୱେୟାର ଗ୍ୟାଲେରୀରୁ ନିମ୍ନଲିଖିତ ବଛା ଯାଇଥିବା ଧାତୁ ସାମଗ୍ରୀଗୁଡ଼ିକରେ ମନ୍ଦିର ଶଙ୍ଖ, ଖଟଖୁରା, ଥାଳି, ଫୁଲଦାନୀ, ଦର୍ପଣ ଷ୍ଟାଣ୍ଡ, ବାକ୍ସ, ନଟ କୁମ୍ଭ, ଜଳ ସିଞ୍ચନକାରୀ ପାତ୍ର ଏବଂ ଚିମୁଟା ସାମିଲ ରହିଛି।' },
  bengali: { title: 'মেটাল ওয়্যার গ্যালারি', desc: 'সালার জং মিউজিয়ামের মেটাল ওয়্যার গ্যালারি থেকে নির্বাচিত ধাতব সামগ্রীর মধ্যে মন্দির-শঙ্খ, খাটের পায়া, ট্রে, ফুলদানি, স্ট্যান্ডসহ আয়না, থালা, বক্স, নাটা কুম্ভ প্রদীপ, স্প্রিংকলার এবং চিমটে অন্তর্ভুক্ত রয়েছে।' },
  telugu: { title: 'లోహ సామాగ్రి గ్యాలరీ', desc: 'సాలార్ జంగ్ మ్యూజియంలోని లోహ సామాగ్రి గ్యాలరీ నుండి ఎంపిక చేసిన లోహ వస్తువులలో గుడి శంఖం, మంచం కోళ్ళు, పళ్ళెం, పువ్వుల కుండీ, అద్దం స్టాండు, పెట్టె, నటా కుంభ దీపం, పన్నీరు చిలకరించే పాత్ర మరియు పట్టుకారు ఉన్నాయి.' },
  marathi: { title: 'मेटल वेअर गॅलरी', desc: 'सालार जंग संग्रहालयाच्या मेटल वेअर गॅलरीमधील निवडक धातूच्या वस्तूंमध्ये मंदिराचा शंख, पलंगाचा पाया, ट्रे, कलश, आरशाचा स्टैंड, ताट, डबा, मंदिर दिवा, गुलाब पाणी शिंपડणारे पात्र आणि चिमटा समाविष्ट आहे.' },
  kannada: { title: 'ಲೋಹದ ವಸ್ತುಗಳ ಗ್ಯಾಲರಿ', desc: 'ಸಾಲಾರ್ ಜಂಗ್ ವಸ್ತುಸಂಗ್ರಹಾಲಯದ ಲೋಹದ ವಸ್ತುಗಳ ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ದ ಶಂಖ, ಮಂಚದ ಕಾಲು, ತಟ್ಟೆ, ಹೂದಾನಿ, ಕನ್ನಡಿ ಸ್ಟ್ಯಾಂಡ್, ಪೆಟ್ಟಿಗೆ, ದೀಪ, ರೋಸ್ ವಾಟರ್ ಸ್ಪ್ರಿಂಕ್ಲರ್ ಮತ್ತು ಇಕ್ಕುಳಗಳು ಇಲ್ಲಿವೆ.' },
  gujarati: { title: 'મેટલ વેર ગેલેરી', desc: 'સાલાર જંગ મ્યુઝિયમની મેટલ વેર ગેલેરીમાંથી પસંદ કરાયેલી ધાતુની વસ્તુઓમાં મંદિરનો શંખ, પલંગનો પાયો, ટ્રે, ફુલદાની, અરીસાનું સ્ટેન્ડ, થાળી, બોક્સ, નાટા કુંભ દીવો, સ્પ્રિંકલર અને ચીપિયો સામેલ છે.' },
  urdu: { title: 'میٹل ویئر گیلری', desc: 'سالار جنگ میوزیم کی میٹل ویئر گیلری سے منتخب کردہ دھاتی اشیاء میں مندر کا شنکھ، پلنگ کا پایا، ٹرے، گلدان، آئینے کا اسٹینڈ، پلیٹ، ڈبہ، ناٹا کنبھ، گلاب پاش اور چمٹا شامل ہیں۔' }
};

let introsHtml = '';
languages.forEach(l => {
  const intro = intros[l.id] || intros.hindi;
  const display = l.id === 'hindi' ? 'block' : 'none';
  const rtl = l.id === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
  introsHtml += `<section class="gallery-intro langCnt" id="${l.id}" style="display:${display}"><h1 ${rtl}>${intro.title}</h1><p ${rtl}>${intro.desc}</p></section>\n`;
});

const itemsMeta = [
  { key: 'conch', img: 'images/ACQ-86-19.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-19 TEMPLE CONCH.wav' },
  { key: 'bedpost', img: 'images/ACQ-86-12.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-12 Bed Post.wav' },
  { key: 'tray', img: 'images/XLIV-461.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-461 Tray.wav' },
  { key: 'vase', img: 'images/XLIV-198.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XXV-198 Vase.wav' },
  { key: 'mirror', img: 'images/XXVIII-138.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XXVIII-138 MIRROR WITH STAND.wav' },
  { key: 'plate', img: 'images/ACQ-86-3.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-3 Plate.wav' },
  { key: 'box', img: 'images/XLIV-216.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-216 Box.wav' },
  { key: 'nata-kumbha', img: 'images/XLII-104.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XLII-104 NATA KUMBHA.wav' },
  { key: 'sprinkler', img: 'images/XLIV-439.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-439 SPRINKLER.wav' },
  { key: 'tong', img: 'images/XLIV-146-1.png', defaultAudio: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-146-1 Tong.wav' }
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

let cardsHtml = '';
itemsMeta.forEach((meta, idx) => {
  const itemNum = idx + 1;
  const initialTitle = labels.hindi[meta.key][0];
  const initialSubtitle = labels.hindi[meta.key][1];
  const audioSrc = meta.defaultAudio;

  cardsHtml += `<article class="item-card" data-audio-key="${meta.key}" onclick="if(!event.target.closest('audio')){location.href='item${itemNum}.html'}">
  <img src="${meta.img}" alt="${initialTitle}">
  <h2 data-card-label="${meta.key}-title">${initialTitle}</h2>
  <p data-card-label="${meta.key}-subtitle">${initialSubtitle}</p>
  <p class="card-content" data-card-content="${meta.key}"></p>
  <audio controls preload="metadata" src="${encodeURI(audioSrc)}"></audio>
</article>`;
});

const audioMapAll = {
  bengali: {
    conch: 'Audios/Bengali/1. Metal Ware Gallery/ACQ-86-19 TEMPLE CONCH.wav',
    bedpost: 'Audios/Bengali/1. Metal Ware Gallery/ACQ-86-12 Bed Post.wav',
    tray: 'Audios/Bengali/1. Metal Ware Gallery/XLIV-461 Tray.wav',
    vase: 'Audios/Bengali/1. Metal Ware Gallery/XXV-198 Vase.wav',
    mirror: 'Audios/Bengali/1. Metal Ware Gallery/XXVIII-138 MIRROR WITH STAND Metallic mirror stand with a round_.wav',
    plate: 'Audios/Bengali/1. Metal Ware Gallery/ACQ-86-3 Plate.wav',
    box: 'Audios/Bengali/1. Metal Ware Gallery/XLIV-216 Box.wav',
    'nata-kumbha': 'Audios/Bengali/1. Metal Ware Gallery/XLII-104 NATA KUMBHA.wav',
    sprinkler: 'Audios/Bengali/1. Metal Ware Gallery/XLIV-439 SPRINKLER.wav',
    tong: 'Audios/Bengali/1. Metal Ware Gallery/XLIV-146-1 Tong_.wav'
  },
  malayalam: {
    conch: 'Audios/Malayalam/Metal Ware Gallery/TEMPLE CONCH.wav',
    bedpost: 'Audios/Malayalam/Metal Ware Gallery/Bed Post.wav',
    tray: 'Audios/Malayalam/Metal Ware Gallery/Tray.wav',
    vase: 'Audios/Malayalam/Metal Ware Gallery/Vase.wav',
    mirror: 'Audios/Malayalam/Metal Ware Gallery/MIRROR WITH STAND.wav',
    plate: 'Audios/Malayalam/Metal Ware Gallery/Plate.wav',
    box: 'Audios/Malayalam/Metal Ware Gallery/Box.wav',
    'nata-kumbha': 'Audios/Malayalam/Metal Ware Gallery/NATA KUMBHA.wav',
    sprinkler: 'Audios/Malayalam/Metal Ware Gallery/SPRINKLER.wav',
    tong: 'Audios/Malayalam/Metal Ware Gallery/Tong.wav'
  },
  odia: {
    conch: 'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-19 TEMPLE CONCH.wav',
    bedpost: 'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-12 Bed Post.wav',
    tray: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-461 Tray.wav',
    vase: 'Audios/Odia/1. Metal Ware Gallery.or/XXV-198 Vase.wav',
    mirror: 'Audios/Odia/1. Metal Ware Gallery.or/XXVIII-138 MIRROR WITH STAND.wav',
    plate: 'Audios/Odia/1. Metal Ware Gallery.or/ACQ-86-3 Plate.wav',
    box: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-216 Box.wav',
    'nata-kumbha': 'Audios/Odia/1. Metal Ware Gallery.or/XLII-104 NATA KUMBHA.wav',
    sprinkler: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-439 SPRINKLER.wav',
    tong: 'Audios/Odia/1. Metal Ware Gallery.or/XLIV-146-1 Tong.wav'
  },
  tamil: {
    conch: 'Audios/TAMIL/1. Metal Ware Gallery/1. TEMPLE CONCH_TAMIL.wav',
    bedpost: 'Audios/TAMIL/1. Metal Ware Gallery/2. BED POST_TAMIL.wav',
    tray: 'Audios/TAMIL/1. Metal Ware Gallery/3. TRAY_TAMIL.wav',
    vase: 'Audios/TAMIL/1. Metal Ware Gallery/4. VASE _TAMIL.wav',
    mirror: 'Audios/TAMIL/1. Metal Ware Gallery/5. MIRROR WITH STAND_ TAMIL.wav',
    plate: 'Audios/TAMIL/1. Metal Ware Gallery/6. PLATE_TAMIL.wav',
    box: 'Audios/TAMIL/1. Metal Ware Gallery/7. BOX _TAMIL.wav',
    'nata-kumbha': 'Audios/TAMIL/1. Metal Ware Gallery/8. NATA KUMBHA _TAMIL.wav',
    sprinkler: 'Audios/TAMIL/1. Metal Ware Gallery/9. SPRINKLER_ TAMIL.wav',
    tong: 'Audios/TAMIL/1. Metal Ware Gallery/10.TONG_TAMIL.wav'
  }
};

const fullHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Metal Ware Gallery | Salar Jung Museum</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
<style>
.gallery-intro{padding:28px 6%;background:#fff;color:#2e2e2e}
.gallery-intro h1{font-size:42px;margin:0 0 12px}
.gallery-intro p{font-size:20px;max-width:1100px}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:28px 6%;background:#a50309}
.item-card{background:#fff;padding:14px;color:#2e2e2e;cursor:pointer;display:flex;flex-direction:column;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);transition:transform 0.2s}
.item-card:hover{transform:translateY(-4px)}
.item-card img{width:100%;height:270px;object-fit:contain;background:#ffffff;border-radius:6px;order:1}
.item-card h2{font-size:18px;margin:14px 0 4px;order:2;color:#a50309;font-weight:700}
.item-card p[data-card-label$="-subtitle"]{font-size:14px;color:#666;margin-bottom:8px;order:3;display:none}
.item-card audio{width:100%;order:3;margin:10px 0}
.item-card p.card-content{order:4;margin-top:10px;line-height:1.55;font-size:15px;color:#333}
.audioBar{padding:18px 6%;background:#2e2e2e;color:#fff}
.audioBar audio{width:100%}
.audioBar p{margin:0 0 8px}
@media(max-width:992px){.gallery-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:767px){.gallery-intro h1{font-size:30px}.gallery-intro p{font-size:17px}.gallery-grid{grid-template-columns:1fr;padding:18px 4%}.item-card img{height:240px}}
</style>
</head>
<body>
<div class="sliderHeaderDiv">
  <div class="container">
    <header>
      <div class="logoLft">
        <a href="#" class="logo logoTwo">
          <img src="images/logo-moc.png" onerror="this.onerror=null; this.src='images/logo.png';" alt="Ministry of Culture">
        </a>
      </div>
      <div class="logoRgt">
        <div class="langDiv">
          <span class="anuIcn">
            <img src="images/logo-anu.png" alt="Anuvadini">
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
${introsHtml}
<section class="gallery-grid">
${cardsHtml}
</section>
</main>
<footer>
  <p>© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a></p>
</footer>

<script>
const selector = document.getElementById('languageSelector');
const labels = ${JSON.stringify(labels, null, 2)};
const audioMapAll = ${JSON.stringify(audioMapAll, null, 2)};

function selectLanguage(language) {
  document.querySelectorAll('.langCnt').forEach(content => {
    content.style.display = (content.id === language) ? 'block' : 'none';
  });

  const currentLabels = labels[language] || labels.english;
  const currentAudioMap = audioMapAll[language] || audioMapAll.odia;

  document.querySelectorAll('.item-card').forEach(card => {
    const key = card.dataset.audioKey;
    const audio = card.querySelector('audio');
    const labelPair = currentLabels[key] || labels.english[key];
    
    card.querySelector('[data-card-label="' + key + '-title"]').textContent = labelPair[0];
    card.querySelector('[data-card-label="' + key + '-subtitle"]').textContent = labelPair[1];
    
    let audioSrc = currentAudioMap ? currentAudioMap[key] : null;
    if (!audioSrc) {
      audioSrc = audioMapAll.odia[key] || audioMapAll.tamil[key];
    }
    
    if (audioSrc) {
      const encodedSrc = encodeURI(audioSrc);
      if (audio.src !== encodedSrc) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = encodedSrc;
        audio.load();
      }
    }
  });
}

selector.addEventListener('change', () => selectLanguage(selector.value));
</script>
<script src="content.js"></script>
<script>
function renderFullContent() {
  const language = selector.value;
  const sections = (window.metalWareContent && window.metalWareContent[language]) 
    ? window.metalWareContent[language] 
    : (window.metalWareContent ? window.metalWareContent.hindi : []);
    
  document.querySelectorAll('.item-card').forEach((card, index) => {
    const content = card.querySelector('[data-card-content]');
    if (content && sections && sections[index]) {
      content.textContent = sections[index];
    }
  });
}

selector.addEventListener('change', renderFullContent);

// Initialize on page load
selectLanguage(selector.value);
renderFullContent();
</script>
</body>
</html>`;

fs.writeFileSync(indexPath, fullHtml, 'utf8');
console.log('Successfully generated MetalWareGallery/index.html!');
