const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'Arms Gallery');
const contentJsPath = path.join(galleryDir, 'content.js');

// Load content.js
const contentJs = fs.readFileSync(contentJsPath, 'utf8');
const window = {};
eval(contentJs);
const armsGalleryContent = window.armsGalleryContent;

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
  { key: 'chain-mail', img: 'images/armsgallery_item1.png', acc: 'LVI-245', defaultTitle: 'Chain Mail' },
  { key: 'arm-guard', img: 'images/armsgallery_item2.png', acc: 'LVI-94', defaultTitle: 'Arm-Guard' },
  { key: 'tabar', img: 'images/armsgallery_item3.png', acc: 'LVI-173', defaultTitle: 'Tabar (Battle Axe)' },
  { key: 'shield-shahjahan', img: 'images/armsgallery_item4.png', acc: 'LVI-125', defaultTitle: 'Shield' },
  { key: 'kindjal', img: 'images/armsgallery_item5.png', acc: 'LIV-377', defaultTitle: 'Kindjal / Katar' },
  { key: 'khanda', img: 'images/armsgallery_item6.png', acc: 'LIII-59', defaultTitle: 'Khanda Sword' },
  { key: 'chair-aina', img: 'images/armsgallery_item7.png', acc: 'LVI-93', defaultTitle: 'Chair-Aina' },
  { key: 'firangi', img: 'images/armsgallery_item8.png', acc: 'LIV-160', defaultTitle: 'Firangi' },
  { key: 'jamadhar', img: 'images/armsgallery_item9.png', acc: 'LV-36', defaultTitle: 'Jamadhar' },
  { key: 'shield-serpent', img: 'images/armsgallery_item10.png', acc: 'LVI-175', defaultTitle: 'Shield with Serpent Motif' }
];

const labels = {
  english: {
    'chain-mail': ['LVI-245: Chain Mail', 'Mughal Chain Mail Armor with Inscribed Pentad (Panjtan)'],
    'arm-guard': ['LVI-94: Arm-Guard (Dastana)', '17th Century Mughal Arm-Guard with Zardozi Velvet'],
    'tabar': ['LVI-173: Tabar (Battle Axe)', 'Damascus Steel Battle-Axe with Gold Inlaid Persian Verses'],
    'shield-shahjahan': ['LVI-125: Shield', 'Mid 17th Century Shah Jahan Era Steel Shield with Zarbuland Gold Inlay'],
    'kindjal': ['LIV-377: Kindjal / Katar', '16th Century Indo-Turkish Steel Dagger with Quranic Verses'],
    'khanda': ['LIII-59: Khanda Sword', '17th Century Deccani Broadsword with Arabic Inscriptions'],
    'chair-aina': ['LVI-93: Chair-Aina (Char-Aina)', 'Mughal Four-Mirror Plate Cuirass Armor'],
    'firangi': ['LIV-160: Firangi Sword', '18th Century Deccani Straight Sword with Basket Hilt'],
    'jamadhar': ['LV-36: Jamadhar (Push Dagger)', '18th Century Rajasthani Push Dagger with Cypress Tree Motif'],
    'shield-serpent': ['LVI-175: Shield with Serpent Motif', '18th Century South Indian Steel Shield with Coiled Serpent Relief']
  },
  hindi: {
    'chain-mail': ['LVI-245: चेन मेल', 'पंजतन नाम उत्कीर्णित मुगल चेन मेल सुरक्षात्मक कवच'],
    'arm-guard': ['LVI-94: भुजा कवच (आर्म-गार्ड)', '17वीं शताब्दी का मुगल भुजा कवच (दस्तिया)'],
    'tabar': ['LVI-173: तबर (युद्ध-कुल्हाड़ी)', 'स्वर्ण जड़ाऊ फारसी पंक्तियों से युक्त दमिश्क इस्पाती तबर'],
    'shield-shahjahan': ['LVI-125: ढाल (शाहजहाँ काल)', '17वीं शताब्दी मध्य (शाहजहाँ काल) की ज़रबुलंद स्वर्ण जड़ित इस्पाती ढाल'],
    'kindjal': ['LIV-377: किंजल (कटार)', '16वीं शताब्दी इंडो-तुर्की कटार (कुरान आयतों युक्त)'],
    'khanda': ['LIII-59: खंडा', '17वीं शताब्दी दक्कनी खंडा (अरबी अभिलेख युक्त सीधी तलवार)'],
    'chair-aina': ['LVI-93: चेयर-आइना (चार-आइना)', 'उत्तर भारतीय मुगल चार-आइना इस्पाती कवच'],
    'firangi': ['LIV-160: फिरंगी', '18वीं शताब्दी दक्कन शैली की सीधी धार वाली फिरंगी तलवार'],
    'jamadhar': ['LV-36: जमाधर (कटार)', 'लगभग 1710 ई. राजस्थान शैली का साइप्रस वृक्ष आकृति युक्त जमाधर'],
    'shield-serpent': ['LVI-175: ढाल (सर्प नक्काशी)', '18वीं शताब्दी दक्षिण भारत की सर्प आकृति उत्कीर्णित इस्पाती ढाल']
  },
  tamil: {
    'chain-mail': ['LVI-245: சங்கிலிக் கவசம்', 'பஞ்சதன் திருப்பெயர்கள் பொறிக்கப்பட்ட முகலாய சங்கிலிக் கவசம்'],
    'arm-guard': ['LVI-94: கை-கவசம்', '17ஆம் நூற்றாண்டு முகலாய கை-கவசம் (ஜரிகை வேலைப்பாடு)'],
    'tabar': ['LVI-173: தபார் (போர்க் கோடாரி)', 'பாரசீகக் கவிதைகள் பொறிக்கப்பட்ட டமாஸ்கஸ் எஃகு கோடாரி'],
    'shield-shahjahan': ['LVI-125: கேடயம் (ஷாஹாஜகான் காலம்)', '17ஆம் நூற்றாண்டு நடுப்பகுதி ஷாஜகான் காலத்து தங்க ஜர்புலந்த் கேடயம்'],
    'kindjal': ['LIV-377: கிஞ்சால் / கத்தார்', '16ஆம் நூற்றாண்டு இந்தோ-துருக்கிய எஃகு வாள் (குர்ஆன் வசனங்கள்)'],
    'khanda': ['LIII-59: கந்தா வாள்', '17ஆம் நூற்றாண்டு தக்காணப் பாணி கந்தா நேர் வாள்'],
    'chair-aina': ['LVI-93: சேர்-ஐனா (நான்கு கண்ணாடிகள் கவசம்)', 'முகலாய நான்கு-கண்ணாடி எஃகு மார்புக் கவசம்'],
    'firangi': ['LIV-160: பிரங்கி வாள்', '18ஆம் நூற்றாண்டு பிற்பகுதி தக்காண பிரங்கி நேர் வாள்'],
    'jamadhar': ['LV-36: ஜமாதார் (கத்தார்)', '1710 ஆம் ஆண்டு ராஜஸ்தானி பாணி ஜமாதார் கத்தார்'],
    'shield-serpent': ['LVI-175: கேடயம் (பாம்பு வடிவம்)', '18ஆம் நூற்றாண்டு தென்னிந்திய பாம்பு வடிவ எஃகு கேடயம்']
  },
  malayalam: {
    'chain-mail': ['LVI-245: ചെയിൻ മെയിൽ', 'പഞ്ചതൻ നാമങ്ങൾ ആലേഖനം ചെയ്ത മുഗൾ ചെയിൻ മെയിൽ കവചം'],
    'arm-guard': ['LVI-94: കൈ-കവചം', '17-ാം നൂറ്റാണ്ടിലെ മുഗൾ കൈ-കവചം (സരി വർക്ക്)'],
    'tabar': ['LVI-173: തബാർ (യുദ്ധക്കോടാലി)', 'പേർഷ്യൻ വരികൾ ആലേഖനം ചെയ്ത ഡമാസ്കസ് സ്റ്റീൽ കോടാലി'],
    'shield-shahjahan': ['LVI-125: കേടയം (ഷാജഹാൻ കാലഘട്ടം)', '17-ാം നൂറ്റാണ്ടിലെ ഷാജഹാൻ കാലഘട്ടത്തിലെ സ്വർണ്ണ ജർബുലന്ദ് കേടയം'],
    'kindjal': ['LIV-377: കിൻജാൽ / കട്ടാരി', '16-ാം നൂറ്റാണ്ടിലെ ഇൻഡോ-തുർക്കിഷ് സ്റ്റീൽ വാൾ'],
    'khanda': ['LIII-59: ഖണ്ഡ വാൾ', '17-ാം നൂറ്റാണ്ടിലെ ഡെക്കാനി ഖണ്ഡ നേർ വാൾ'],
    'chair-aina': ['LVI-93: ചെയർ ഐന കവചം', 'മുഗൾ നാല്-കണ്ണാടി സ്റ്റീൽ മார்ப് കവചം'],
    'firangi': ['LIV-160: ഫിരംഗി വാൾ', '18-ാം നൂറ്റാണ്ടിലെ ഡെക്കാനി ഫിരംഗി വാൾ'],
    'jamadhar': ['LV-36: ജമാധാർ കട്ടാരി', '1710 കാലഘട്ടത്തിലെ രാജസ്ഥാനി ജമാധാർ കട്ടാരി'],
    'shield-serpent': ['LVI-175: കേടയം (സർപ്പ കൊത്തുപണി)', '18-ാം നൂറ്റാണ്ടിലെ തെന്നിന്ത്യൻ സർപ്പ കേടയം']
  },
  bengali: {
    'chain-mail': ['LVI-245: চেইন মেইল', 'পাঞ্জতন পবিত্র নাম খোদিত মুঘল চেইন মেইল বর্ম'],
    'arm-guard': ['LVI-94: বাহু-রক্ষী', '১৭শ শতাব্দীর মুঘল বাহুরক্ষী (জরির কাজ)'],
    'tabar': ['LVI-173: তবার (যুদ্ধকুঠার)', 'ফারসি কবিতা উৎকীর্ণ দামেস্ক ইস্পাতের যুদ্ধকুঠার'],
    'shield-shahjahan': ['LVI-125: ঢাল (শাহজাহানের আমল)', '১৭শ শতাব্দীর মধ্যভাগের শাহজাহানি স্বর্ণ জরবুলন্দ ঢাল'],
    'kindjal': ['LIV-377: কিনজল / কাটার', '১৬শ শতাব্দীর ইন্দো-তুর্কি ইস্পাতের তলোয়ার'],
    'khanda': ['LIII-59: খান্ডা', '১৭শ শতাব্দীর দাক্ষিণাত্য প্রণালীর প্রাচীন খান্ডা তলোয়ার'],
    'chair-aina': ['LVI-93: চেয়ার আইনা', 'উত্তর ভারতীয় মুঘল চার-আইনা ইস্পাতের বর্ম'],
    'firangi': ['LIV-160: ফিরঙ্গি', '১৮শ শতাব্দীর শেষভাগের দাক্ষিণাত্য ফিরঙ্গি সোজা তলোয়ার'],
    'jamadhar': ['LV-36: জামধার', '১৭১০ খ্রিষ্টাব্দের রাজস্থানি জামধার কাটার'],
    'shield-serpent': ['LVI-175: ঢাল (সর্প নকশা)', '১৮শ শতাব্দীর দক্ষিণ ভারতীয় সর্প খোদাইকৃত ইস্পাতের ঢাল']
  },
  gujarati: {
    'chain-mail': ['LVI-245: ચેઇન મેઇલ', 'પંજતન પવિત્ર નામો કંડારેલું મુઘલ ચેઇન મેઇલ બખ્તર'],
    'arm-guard': ['LVI-94: હાથનું રક્ષક બખ્તર (આર્મ-ગાર્ડ)', '૧૭મી સદીનું મુઘલ હાથનું રક્ષક બખ્તર'],
    'tabar': ['LVI-173: તબર (યુદ્ધ કુહાડી)', 'પર્શિયન શિલાલેખ ધરાવતી દમાસ્કસ સ્ટીલની યુદ્ધ કુહાડી'],
    'shield-shahjahan': ['LVI-125: ઢાલ (શાહજહાં કાળ)', '૧૭મી સદીના મધ્યની શાહજહાં કાળની ઝરબુલંદ સોનેરી ઢાલ'],
    'kindjal': ['LIV-377: કિંડજલ / કટાર', '૧૬મી સદીની ઇન્ડો-તુર્કી સ્ટીલ કટાર'],
    'khanda': ['LIII-59: ખંડા', '૧૭મી સદીની દક્કની શૈલીની ખંડા તલવાર'],
    'chair-aina': ['LVI-93: ચેર-આઇના (ચાર આઇના બખ્તર)', 'મુઘલ ચાર-આઇના સ્ટીલનું બખ્તર'],
    'firangi': ['LIV-160: ફિરંગી', '૧૮મી સદીના ઉત્તરાધની દક્કની ફિરંગી સીધી તલવાર'],
    'jamadhar': ['LV-36: જમાધર (કટાર)', 'આશરે ૧૭૧૦ ઇ.સ. ની રાજસ્થાની જમાધર કટાર'],
    'shield-serpent': ['LVI-175: ઢાલ (સર્પ કંડારણ)', '૧૮મી સદીની દક્ષિણ ભારતની સર્પ આકૃતિ ધરાવતી સ્ટીલ ઢાલ']
  },
  telugu: {
    'chain-mail': ['LVI-245: గొలుసు కవచము (చైన్ మెయిల్)', 'పంచతన్ పవిత్ర నామాలు చెక్కబడిన మొఘల్ చైన్ మెయిల్ కవచము'],
    'arm-guard': ['LVI-94: భుజ కవచము (ఆర్మ్-గార్డ్)', '17వ శతాబ్దపు మొఘల్ భుజ కవచము (దస్తానా)'],
    'tabar': ['LVI-173: తబార్ (యుద్ధ గొడ్డలి)', 'పారశీక కవితలు చెక్కబడిన డమాస్కస్ ఉక్కు గొడ్డలి'],
    'shield-shahjahan': ['LVI-125: కేడెం / డాలు (షాజహాన్ కాలం)', '17వ శతాబ్దపు షాజహాన్ కాలంనాటి బంగారు జర్పులంద్ డాలు'],
    'kindjal': ['LIV-377: కింజల్ / కటారము', '16వ శతాబ్దపు ఇండో-టర్కిష్ ఉక్కు కటారము'],
    'khanda': ['LIII-59: ఖడ్గము / ఖండా', '17వ శతాబ్దపు దక్కన్ శైలి ఖండా ఖడ్గము'],
    'chair-aina': ['LVI-93: చార్-ఐనా (నాలుగు అద్దాల కవచము)', 'మొఘల్ నాలుగు అద్దాల ఉక్కు కవచము'],
    'firangi': ['LIV-160: ఫిరంగీ (నేరు తలవారు)', '18వ శతాబ్దపు దక్కన్ శైలి ఫిరంగీ నేరు తలవారు'],
    'jamadhar': ['LV-36: జమాధార్ (కటారము)', '1710 నాటి రాజస్థానీ శైలి జమాధార్ కటారము'],
    'shield-serpent': ['LVI-175: డాలు (సర్ప చెక్కడము)', '18వ శతాబ్దపు దక్షిణ భారత సర్ప చెక్కడపు డాలు']
  },
  marathi: {
    'chain-mail': ['LVI-245: चेन मेल (साखळी कवच)', 'पंजतन पवित्र नावे कोरलेले मुघल साखळी कवच'],
    'arm-guard': ['LVI-94: भुजा कवच (आर्म-गार्ड)', '१७ व्या शतकातील मुघल भुजा कवच'],
    'tabar': ['LVI-173: तबर (युद्ध-कुऱ्हाड)', 'फारसी काव्य कोरलेली दमास्कस पोलादी युद्ध कुऱ्हाड'],
    'shield-shahjahan': ['LVI-125: ढाल (शहाजहान काळ)', '१७ व्या शतकातील शहाजहान काळातील सोन्याचे जरबुलंद काम असलेली ढाल'],
    'kindjal': ['LIV-377: किंजाल / कटार', '१६ व्या शतकातील इंडो-तुर्की पोलादी कटार'],
    'khanda': ['LIII-59: खंडा (तलवार)', '१७ व्या शतकातील दख्खनी खंडा सरळ तलवार'],
    'chair-aina': ['LVI-93: चार-ऐना कवच', 'मुघल चार-ऐना पोलादी छातीचे कवच'],
    'firangi': ['LIV-160: फिरंगी (सरळ तलवार)', '१८ व्या शतकातील दख्खनी फिरंगी सरळ तलवार'],
    'jamadhar': ['LV-36: जमाधर (कटार)', '१७१० काळातील राजस्थानी जमाधर कटार'],
    'shield-serpent': ['LVI-175: ढाल (नाग कोरीव काम)', '१८ व्या शतकातील दक्षिण भारतीय नाग कोरीव कामाची ढाल']
  },
  kannada: {
    'chain-mail': ['LVI-245: ಚೈನ್ ಮೇಲ್', 'ಪಂಚತನ್ ಹೆಸರುಗಳನ್ನು ಕೆತ್ತಲಾದ ಮೊಘಲ್ ಚೈನ್ ಮೇಲ್ ಕವಚ'],
    'arm-guard': ['LVI-94: ಬಾಹು ಕವಚ', '17 ನೇ ಶತಮಾನದ ಮೊಘಲ್ ಬಾಹು ಕವಚ'],
    'tabar': ['LVI-173: ತಬಾರ್ (ಯುದ್ಧ ಕೊಡಲಿ)', 'ಪರ್ಷಿಯನ್ ಸಾಲುಗಳನ್ನು ಕೆತ್ತಲಾದ ಡಮಾಸ್ಕಸ್ ಉಕ್ಕಿನ ಕೊಡಲಿ'],
    'shield-shahjahan': ['LVI-125: ಗುರಾಣಿ (ಷಹಜಹಾನ್ ಕಾಲ)', '17 ನೇ ಶತಮಾನದ ಷಹಜಹಾನ್ ಕಾಲದ ಚಿನ್ನದ ಜರ್ಬುಲಂದ್ ಗುರಾಣಿ'],
    'kindjal': ['LIV-377: ಕಿಂಜಾಲ್ / ಕಟಾರಿ', '16 ನೇ ಶತಮಾನದ ಇಂಡೋ-ಟರ್ಕಿಶ್ ಉಕ್ಕಿನ ಕಟಾರಿ'],
    'khanda': ['LIII-59: ಖಂಡ (ಖಡ್ಗ)', '17 ನೇ ಶತಮಾನದ ದಖ್ಖನಿ ಖಂಡ ನೇರ ಖಡ್ಗ'],
    'chair-aina': ['LVI-93: ಚಾರ್-ಐನಾ ಕವಚ', 'ಮೊಘಲ್ ನಾಲ್ಕು ಕನ್ನಡಿಗಳ ಉಕ್ಕಿನ ಕವಚ'],
    'firangi': ['LIV-160: ಫಿರಂಗಿ (ನೇರ ಖಡ್ಗ)', '18 ನೇ ಶತಮಾನದ ದಖ್ಖನಿ ಫಿರಂಗಿ ನೇರ ಖಡ್ಗ'],
    'jamadhar': ['LV-36: ಜಮಾಧಾರ್ ಕಟಾರಿ', '1710 ರ ರಾಜಸ್ಥಾನಿ ಜಮಾಧಾರ್ ಕಟಾರಿ'],
    'shield-serpent': ['LVI-175: ಗುರಾಣಿ (ಸರ್ಪ ಕೆತ್ತನೆ)', '18 ನೇ ಶತಮಾನದ ದಕ್ಷಿಣ ಭಾರತದ ಸರ್ಪ ಕೆತ್ತನೆಯ ಗುರಾಣಿ']
  },
  odia: {
    'chain-mail': ['LVI-245: ଚେନ୍ ମେଲ୍', 'ପଞ୍ଜତନ ନାମ ଖୋଦିତ ମୋଗଲ ଚେନ୍ ମେଲ୍ କବଚ'],
    'arm-guard': ['LVI-94: ବାହୁ କବଚ', '୧୭ଶ ଶତାବ୍ଦୀର ମୋଗଲ ବାହୁ କବଚ'],
    'tabar': ['LVI-173: ତବାର (ଯୁଦ୍ଧ କୁରାଢ଼ି)', 'ପାରସ୍ୟ କବିତା ଖୋଦିତ ଦମେସ୍କସ ଇସ୍ପାତ କୁରାଢ଼ି'],
    'shield-shahjahan': ['LVI-125: ଢାଲ (ଶାହଜାହାନ କାଳ)', '୧୭ଶ ଶତାବ୍ଦୀର ଶାହଜାହାନ କାଳର ସୁନା ଜରବୁଲନ୍ଦ ଢାଲ'],
    'kindjal': ['LIV-377: କିଞ୍ଜାଲ / କଟାର', '୧୬ଶ ଶତାବ୍ଦୀର ଇଣ୍ଡୋ-ତୁର୍କୀ ଇସ୍ପାତ କଟାର'],
    'khanda': ['LIII-59: ଖଣ୍ଡା', '୧୭ଶ ଶତାବ୍ଦୀର ଦାକ୍ଷିଣାତ୍ୟ ଶୈଳୀର ଖଣ୍ଡା'],
    'chair-aina': ['LVI-93: ଚେୟାର-ଆଇନା', 'ମୋଗଲ ଚାରି-ଆଇନା ଇସ୍ପାତ କବଚ'],
    'firangi': ['LIV-160: ଫିରଙ୍ଗୀ', '୧୮ଶ ଶତାବ୍ଦୀର ଦାକ୍ଷିଣାତ୍ୟ ଫିରଙ୍ଗୀ ଖଣ୍ଡା'],
    'jamadhar': ['LV-36: ଜମାଧର (କଟାର)', '୧୭୧୦ ଖ୍ରୀଷ୍ଟାବ୍ଦର ରାଜସ୍ଥାନୀ ଜମାଧର କଟାର'],
    'shield-serpent': ['LVI-175: ଢାଲ (ସର୍ପ ନକ୍ସା)', '୧୮ଶ ଶତାବ୍ଦୀର ଦକ୍ଷିଣ ଭାରତୀୟ ସର୍ପ ନକ୍ସା ଢାଲ']
  },
  urdu: {
    'chain-mail': ['LVI-245: چین میل', 'پنجتن کے ناموں سے مزین مغلیہ چین میل بکتر'],
    'arm-guard': ['LVI-94: بازو بند (آرم گارڈ)', '17ویں صدی کا مغلیہ بازو بند'],
    'tabar': ['LVI-173: تبر (جنگی کلہاڑی)', 'فارسی اشعار سے مزین دمشقی اسٹیل کا تبر'],
    'shield-shahjahan': ['LVI-125: ڈھال (شاہجہانی عہد)', '17ویں صدی کے درمیانی عہد شاہجہانی کی زربلند زریں ڈھال'],
    'kindjal': ['LIV-377: کنجال / خنجر', '16ویں صدی کا ہندو-ترکی اسٹیل خنجر'],
    'khanda': ['LIII-59: کھانڈہ (تلوار)', '17ویں صدی کی دکنی کھانڈہ تلوار'],
    'chair-aina': ['LVI-93: چار آئینہ (بکتر)', 'مغلیہ چار آئینہ اسٹیل کا بکتر'],
    'firangi': ['LIV-160: فرنگی (سیدھی تلوار)', '18ویں صدی کی دکنی فرنگی سیدھی تلوار'],
    'jamadhar': ['LV-36: جمادھر (خنجر)', '1710ء کا راجستھانی جمادھر خنجر'],
    'shield-serpent': ['LVI-175: ڈھال (سانپ کی نقش نگاری)', '18ویں صدی کی جنوبی ہندی سانپ کی نقش نگاری والی اسٹیل ڈھال']
  }
};

function getAudioPath(lang, index) {
  let audioRel = '';
  if (lang === 'bengali') {
    const map = [
      'Audios/bengali/LVI-245_ Chain mail.wav',
      'Audios/bengali/LVI-94_ARM-GUARD.wav',
      'Audios/bengali/LVI-173_ TABAR.wav',
      'Audios/bengali/LVI-125_SHIELD.wav',
      'Audios/bengali/LIV-377_ KINDJAL.wav',
      'Audios/bengali/LIII-59- KHANDA.wav',
      'Audios/bengali/LVI-93_CHAIR AINA.wav',
      'Audios/bengali/LIV-160_FIRANGI.wav',
      'Audios/bengali/LV-36_ JAMADHAR.wav',
      'Audios/bengali/LVI-175_SHIELD.wav'
    ];
    audioRel = map[index];
  } else if (lang === 'malayalam') {
    const map = [
      'Audios/malayalam/Chain Mail.wav',
      'Audios/malayalam/ARM-GUARD.wav',
      'Audios/malayalam/TABAR.wav',
      'Audios/malayalam/1)_SHIELD   LVI-125.wav',
      'Audios/malayalam/KINDJAL.wav',
      'Audios/malayalam/KHANDA.wav',
      'Audios/malayalam/CHAIR AINA.wav',
      'Audios/malayalam/FIRANGI.wav',
      'Audios/malayalam/JAMADHAR.wav',
      'Audios/malayalam/SHIELD LVI-175.wav'
    ];
    audioRel = map[index];
  } else if (lang === 'tamil') {
    const map = [
      'Audios/tamil/1. Chain Mail.wav',
      'Audios/tamil/2. ARM-GUARD.wav',
      'Audios/tamil/3. TABAR.wav',
      'Audios/tamil/4. SHIELD.wav',
      'Audios/tamil/5. KINDJAL.wav',
      'Audios/tamil/6. KHANDA.wav',
      'Audios/tamil/7. CHAIR AINA.wav',
      'Audios/tamil/8. FIRANGI.wav',
      'Audios/tamil/9. JAMADHAR.wav',
      'Audios/tamil/10. SHIELD.wav'
    ];
    audioRel = map[index];
  } else {
    const map = [
      'Audios/hindi/1. चेन मेल.wav',
      'Audios/hindi/2. भुजा कवच (आर्म-गार्ड).wav',
      'Audios/hindi/3. तबर.wav',
      'Audios/hindi/4. ढाल.wav',
      'Audios/hindi/5. कटार.wav',
      'Audios/hindi/6. खंडा.wav',
      'Audios/hindi/7. चेयर-आइना.wav',
      'Audios/hindi/8. फिरंगी.wav',
      'Audios/hindi/9. जमाधर (कतार).wav',
      'Audios/hindi/10. ढाल.wav'
    ];
    audioRel = map[index];
  }

  if (audioRel && fs.existsSync(path.join(galleryDir, audioRel))) {
    return audioRel;
  }
  
  const fallbackHindi = `Audios/hindi/${['1. चेन मेल.wav', '2. भुजा कवच (आर्म-गार्ड).wav', '3. तबर.wav', '4. ढाल.wav', '5. कटार.wav', '6. खंडा.wav', '7. चेयर-आइना.wav', '8. फिरंगी.wav', '9. जमाधर (कतार).wav', '10. ढाल.wav'][index]}`;
  if (fs.existsSync(path.join(galleryDir, fallbackHindi))) {
    return fallbackHindi;
  }
  return '';
}

function generateItemPage(itemIndex, relPath) {
  const itemNum = itemIndex + 1;
  const meta = itemsMeta[itemIndex];
  const audioMap = {};
  let langDivsHtml = '';

  languages.forEach((langObj) => {
    const lang = langObj.id;
    const descArr = armsGalleryContent[lang] || armsGalleryContent.hindi || armsGalleryContent.english || [];
    const descText = descArr[itemIndex] || descArr[0] || '';

    const labelPair = (labels[lang] && labels[lang][meta.key]) ? labels[lang][meta.key] : labels.english[meta.key];
    const title = labelPair[0];
    const badge = labelPair[1];

    const isDisplay = lang === 'hindi' ? 'block' : 'none';
    const isRtl = lang === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
    const imgPath = `${relPath}${meta.img}`;

    const audioRel = getAudioPath(lang, itemIndex);
    const audioPath = audioRel ? `${relPath}${encodeURI(audioRel)}` : `${relPath}${encodeURI(getAudioPath('hindi', itemIndex))}`;
    audioMap[lang] = audioPath;

    const rawStr = Array.isArray(descText) ? descText.join('\n\n') : String(descText || '');
    const formattedDesc = rawStr.split('\n\n').join('<br><br>');

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
  <title>Arms Gallery - Item ${itemNum} | Salar Jung Museum</title>
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

      if (window.armsGalleryContent && window.armsGalleryContent[lang] && window.armsGalleryContent[lang][itemIndex]) {
        const langEl = document.querySelector('#' + lang + ' .bookCntDiv div');
        if (langEl) {
          langEl.innerHTML = window.armsGalleryContent[lang][itemIndex].replace(/\\n\\n/g, '<br><br>');
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

// Generate item HTML pages (both root level itemX.html and subfolder itemX/index.html)
for (let i = 0; i < itemsMeta.length; i++) {
  const itemNum = i + 1;
  const rootItemPath = path.join(galleryDir, `item${itemNum}.html`);
  const rootHtml = generateItemPage(i, './');
  fs.writeFileSync(rootItemPath, rootHtml, 'utf8');

  const folderName = `item${itemNum}`;
  const subFolderPath = path.join(galleryDir, folderName);
  if (!fs.existsSync(subFolderPath)) {
    fs.mkdirSync(subFolderPath, { recursive: true });
  }
  const subItemPath = path.join(subFolderPath, 'index.html');
  const subHtml = generateItemPage(i, '../');
  fs.writeFileSync(subItemPath, subHtml, 'utf8');
}

console.log('Generated all 10 item HTML files and item subfolder index HTML files!');

// Generate Main Index Page
const intros = {
  english: { title: 'Arms Gallery', desc: 'A historic collection of arms and armour from the Salar Jung Museum, including chain mail, arm-guards, tabar battle axes, Mughal steel shields, daggers, Khanda swords, Char-Aina cuirasses, Firangi swords, and Jamadhar push daggers.' },
  hindi: { title: 'शस्त्र दीर्घा', desc: 'सालार जंग संग्रहालय की शस्त्र दीर्घा से चयनित ऐतिहासिक शस्त्रों और सुरक्षात्मक कवचों में चेन मेल (लोह-जाल कवच), भुजा कवच, तबर (युद्ध-कुल्हाड़ी), मुगल इस्पाती ढाल, कटार, खंडा, चार-आइना कवच, फिरंगी तलवार और जमाधर शामिल हैं।' },
  tamil: { title: 'ஆயுதக் காட்சியகம்', desc: 'சாலார் ஜங் அருங்காட்சியகத்தின் ஆயுதக் காட்சியகத்திலிருந்து தேர்ந்தெடுக்கப்பட்ட சில வரலாற்றுச் சிறப்புமிக்க ஆயுதங்கள்: சங்கிலிக் கவசம், கை-கவசம், தபார் போர்க் கோடாரி, முகலாய எஃகு கேடயம், கிஞ்சால் கத்தார், கந்தா வாள், சேர்-ஐனா கவசம், பிரங்கி வாள் மற்றும் ஜமாதார்.' },
  malayalam: { title: 'ആംസ് ഗാലറി', desc: 'സലാർ ജംഗ് മ്യൂസിയത്തിലെ ആംസ് ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുത്ത ചരിത്രപരമായ ആയുധങ്ങളിൽ ചെയിൻ മെയിൽ കവചം, കൈ-കവചം, തബാർ യുദ്ധക്കോടാലി, മുഗൾ സ്റ്റീൽ കേടയം, കിൻജാൽ കട്ടാരി, ഖണ്ഡ വാൾ, ചെയർ ഐന കവചം, ഫിരംഗി വാൾ, ജമാധാർ എന്നിവ ഉൾപ്പെടുന്നു.' },
  bengali: { title: 'অস্ত্রাগার গ্যালারি', desc: 'সালার জং মিউজিয়ামের অস্ত্রাগার গ্যালারি থেকে নির্বাচিত ঐতিহাসিক অস্ত্রের মধ্যে চেইন মেইল বর্ম, বাহু-রক্ষী, তবার যুদ্ধকুঠার, মুঘল ইস্পাতের ঢাল, কিনজল কাটার, খান্ডা তলোয়ার, চেয়ার আইনা বর্ম, ফিরঙ্গি এবং জামধার অন্তর্ভুক্ত রয়েছে।' },
  telugu: { title: 'ఆయుధ శాల గ్యాలరీ', desc: 'సాలార్ జంగ్ మ్యూజియం లోని ఆయుధ శాల గ్యాలరీ నుండి ఎంపిక చేసిన చారిత్రక ఆయుధాలలో గొలుసు కవచము, భుజ కవచము, తబార్ యుద్ధ గొడ్డలి, మొఘల్ ఉక్కు డాలు, కింజల్ కటారము, ఖండా ఖడ్గము, చార్-ఐనా కవచము, ఫిరంగీ తలవారు మరియు జమాధార్ కటారము ఉన్నాయి.' },
  marathi: { title: 'शस्त्र गॅलरी', desc: 'सालार जंग संग्रहालयाच्या शस्त्र गॅलरीमधील ऐतिहासिक शस्त्रांमध्ये चेन मेल (साखळी कवच), भुजा कवच, तबर युद्ध-कुऱ्हाड, मुघल पोलादी ढाल, किंजाल कटार, खंडा तलवार, चार-ऐना कवच, फिरंगी तलवार आणि जमाधर समाविष्ट आहे.' },
  kannada: { title: 'ಆಯುಧಗಳ ಗ್ಯಾಲರಿ', desc: 'ಸಾಲಾರ್ ಜಂಗ್ ವಸ್ತುಸಂಗ್ರಹಾಲಯದ ಲೋಹದ ವಸ್ತುಗಳ ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ದ ಚೈನ್ ಮೇಲ್ ರಕ್ಷಾಕವಚ, ಬಾಹು ಕವಚ, ತಬಾರ್ ಯುದ್ಧ ಕೊಡಲಿ, ಮೊಘಲ್ ಉಕ್ಕಿನ ಗುರಾಣಿ, ಕಿಂಜಾಲ್ ಕಟಾರಿ, ಖಂಡ ಖಡ್ಗ, ಚಾರ್-ಐನಾ ಕವಚ, ಫಿರಂಗಿ ಖಡ್ಗ ಮತ್ತು ಜಮಾಧಾರ್ ಕಟಾರಿಗಳು ಇಲ್ಲಿವೆ.' },
  gujarati: { title: 'શસ્ત્ર ગેલેરી', desc: 'સાલાર જંગ મ્યુઝિયમની શસ્ત્ર ગેલેરીમાંથી પસંદ કરાયેલા ઐતિહાસિક શસ્ત્રોમાં ચેઇન મેઇલ બખ્તર, હાથનું રક્ષક બખ્તર, તબર યુદ્ધ કુહાડી, મુઘલ સ્ટીલની ઢાલ, કિંડજલ કટાર, ખંડા તલવાર, ચેર-આઇના બખ્તર, ફિરંગી તલવાર અને જમાધર સામેલ છે.' },
  urdu: { title: 'اسلحہ خانہ گیلری', desc: 'سالار جنگ میوزیم کی اسلحہ خانہ گیلری سے منتخب کردہ تاریخی ہتھیاروں میں زنجیری درع (چین میل)، بازو بند، تبر، مغلیہ اسٹیل کی ڈھال، کنجال، کھانڈہ، چار آئینہ بکتر، فرنگی اور جمادھر شامل ہیں۔' },
  odia: { title: 'ଅସ୍ତ୍ରଶସ୍ତ୍ର ଗ୍ୟାଲେରୀ', desc: 'ସାଲାର୍ ଜଙ୍ଗ୍ ସଂଗ୍ରହାଳୟର ଅସ୍ତ୍ରଶସ୍ତ୍ର ଗ୍ୟାଲେରୀରୁ ନିମ୍ନଲିଖିତ ବଛା ଯାଇଥିବା ଐତିହାସିକ ଅସ୍ତ୍ରଶସ୍ତ୍ର ମଧ୍ୟରେ ଚେନ୍ ମେଲ୍ କବଚ, ବାହୁ କବଚ, ତବାର ଯୁଦ୍ଧ କୁରାଢ଼ି, ମୋଗଲ ଇସ୍ପାତ ଢାଲ, କିଞ୍ଜାଲ କଟାର, ଖଣ୍ଡା, ଚେୟାର-ଆଇନା କବଚ, ଫିରଙ୍ଗୀ ଏବଂ ଜମାଧର ସାମିଲ ରହିଛି।' }
};

let introsHtml = '';
languages.forEach(l => {
  const intro = intros[l.id] || intros.hindi;
  const display = l.id === 'hindi' ? 'block' : 'none';
  const rtl = l.id === 'urdu' ? 'dir="rtl" style="text-align:right;"' : '';
  introsHtml += `<section class="gallery-intro langCnt" id="${l.id}" style="display:${display}"><h1 ${rtl}>${intro.title}</h1><p ${rtl}>${intro.desc}</p></section>\n`;
});

let cardsHtml = '';
itemsMeta.forEach((meta, idx) => {
  const itemNum = idx + 1;
  const initialTitle = labels.hindi[meta.key][0];
  const initialSubtitle = labels.hindi[meta.key][1];
  const audioSrc = getAudioPath('hindi', idx);

  cardsHtml += `<article class="item-card" data-audio-key="${meta.key}" onclick="if(!event.target.closest('audio')){location.href='item${itemNum}.html'}">
  <img src="${meta.img}" alt="${initialTitle}">
  <h2 data-card-label="${meta.key}-title">${initialTitle}</h2>
  <p data-card-label="${meta.key}-subtitle">${initialSubtitle}</p>
  <p class="card-content" data-card-content="${meta.key}"></p>
  <audio controls preload="metadata" src="${encodeURI(audioSrc)}"></audio>
</article>\n`;
});

const indexHtmlContent = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Arms Gallery | Salar Jung Museum</title>
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

<script src="content.js"></script>
<script>
const selector = document.getElementById('languageSelector');
const labels = ${JSON.stringify(labels, null, 2)};

function updateGalleryLanguage(lang) {
  document.querySelectorAll('.gallery-intro.langCnt').forEach(el => {
    el.style.display = (el.id === lang) ? 'block' : 'none';
  });

  const langLabels = labels[lang] || labels.english;
  
  Object.keys(langLabels).forEach(key => {
    const pair = langLabels[key];
    const titleEl = document.querySelector('[data-card-label="' + key + '-title"]');
    const subEl = document.querySelector('[data-card-label="' + key + '-subtitle"]');
    if (titleEl) titleEl.textContent = pair[0];
    if (subEl) subEl.textContent = pair[1];
  });

  if (window.armsGalleryContent && window.armsGalleryContent[lang]) {
    const items = ${JSON.stringify(itemsMeta.map(m => m.key))};
    items.forEach((key, idx) => {
      const contentEl = document.querySelector('[data-card-content="' + key + '"]');
      if (contentEl && window.armsGalleryContent[lang][idx]) {
        const txt = window.armsGalleryContent[lang][idx];
        contentEl.textContent = txt.length > 180 ? txt.substring(0, 180) + '...' : txt;
      }
    });
  }
}

selector.addEventListener('change', function() {
  updateGalleryLanguage(this.value);
});

updateGalleryLanguage(selector.value);
</script>
</body>
</html>`;

fs.writeFileSync(path.join(galleryDir, 'index.html'), indexHtmlContent, 'utf8');
console.log('Generated index.html successfully!');
