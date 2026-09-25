import os
import sys
import docx
import re
import json
import urllib.parse

sys.stdout.reconfigure(encoding='utf-8')

museum_dir = r'C:\Users\009\Desktop\Anuvadini_Projects\museum\museum'
gallery_dir = os.path.join(museum_dir, 'ManuscriptGallery')
content_src_dir = r'C:\Users\009\Downloads\phase4-content\manuscript'

def encode_url(path_str):
    parts = path_str.split('/')
    return '/'.join(urllib.parse.quote(p) for p in parts)

files = {
    'bengali': 'Bengali_Manuscript Gallery Need  922 words.docx',
    'english': 'Manuscript Gallery Need  922 words.docx',
    'malayalam': 'Malayalam_Manuscript Gallery Need  922 words.ml-IN.docx',
    'urdu': 'Urdu_Manuscript Gallery Need  922 words.ur-IN.docx',
    'tamil': 'Tamil_Manuscript Gallery Need  922 words.ta-IN.docx',
    'gujarati': 'Gujarati_Manuscript Gallery Need 922 words.docx',
    'odia': '14. Manuscript Gallery Need  922 words.or-IN.docx',
    'kannada': 'Kannada_Manuscript Gallery Need  922 words.kn-IN.docx',
    'telugu': 'Telugu_Manuscript Gallery_Validated.docx',
    'hindi': 'Hindi-Manuscript Gallery.docx',
    'marathi': 'Marathi_Manuscript Gallery Need  922 words.mr-IN.docx'
}

word_count_patterns = [
    r'words\s*[-–:]\s*\d+',
    r'শব্দ\s*[-–:]\s*[\d১২৩৪৫৬৭৮৯০]+',
    r'വാക്കുകൾ\s*[-–:]\s*\d+',
    r'الفاظ\s*[-–:]\s*\d+',
    r'પદો\s*[-–:]\s*\d+',
    r'શબ્દ\s*[-–:]\s*\d+',
    r'પદ\s*[-–:]\s*\d+',
    r'પદઓ\s*[-–:]\s*\d+',
    r'પદಗಳು\s*[-–:]\s*\d+',
    r'ಶಬ್ದ\s*[-–:]\s*\d+',
    r'ଶବ୍ଦ\s*[-–:]\s*\d+',
    r'పదాలు\s*[-–:]\s*\d+',
    r'शब्द\s*[-–:]\s*\d+'
]

header_patterns = [
    r'LIST OF 09.*',
    r'অডিও-ভিজ্যুয়ালের জন্য ৯টি পাণ্ডুলিপির তালিকা',
    r'ഓഡിയോ വിഷ്വലുകൾക്കായുള്ള 09 മാന്യുസ്ക്രിപ്റ്റുകളുടെ പട്ടിക',
    r'آڈیو ویژول کے لیے 09 مخطوطات کی فہرست',
    r'ஒலி-ஒளி காட்சி அமைப்பிற்கான 9.*',
    r'ઓડિયો વિઝ્યુઅલ્સ માટેની ૦૯.*',
    r'ଅଡିଓ ଭିଜୁଆଲ୍ ପାଇଁ 09ଟି.*',
    r'ಆಡಿಯೊ ದೃಶ್ಯಗಳಿಗಾಗಿ 09.*',
    r'ఆడియో విజువల్స్ కోసం 09.*',
    r'दृश्य-श्रव्य.*09.*',
    r'ऑडिओ व्हिज्युअल्ससाठी 09.*'
]

content_data = {}

for lang, fname in files.items():
    doc_path = os.path.join(content_src_dir, fname)
    doc = docx.Document(doc_path)
    paras = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    
    if lang in ['bengali', 'english', 'malayalam', 'urdu']:
        items = []
        curr = []
        for p in paras:
            is_hdr = any(re.search(hp, p, re.IGNORECASE) for hp in header_patterns)
            if is_hdr:
                continue
            is_wc = any(re.search(pat, p, re.IGNORECASE) for pat in word_count_patterns)
            if is_wc:
                if curr:
                    txt = ' '.join(curr)
                    txt = re.sub(r'^[1-9]\s*[\.\-\)]?\s+', '', txt).strip()
                    items.append(txt)
                    curr = []
            else:
                curr.append(p)
        if curr:
            txt = ' '.join(curr)
            txt = re.sub(r'^[1-9]\s*[\.\-\)]?\s+', '', txt).strip()
            items.append(txt)
        content_data[lang] = items
    elif lang == 'tamil':
        items = []
        for p_idx in range(2, 19, 2):
            txt = paras[p_idx]
            txt = re.sub(r'^[1-9]\s*[\.\-\)]?\s+', '', txt).strip()
            items.append(txt)
        content_data[lang] = items
    elif lang == 'gujarati':
        guj_indices = [1, 3, 5, 7, 9, 11, 14, 17, 20]
        items = []
        for idx in guj_indices:
            txt = paras[idx]
            txt = re.sub(r'^[1-9]\s*[\.\-\)]?\s+', '', txt).strip()
            items.append(txt)
        content_data[lang] = items
    elif lang in ['odia', 'kannada', 'telugu', 'marathi']:
        items = []
        for p_idx in range(1, 18, 2):
            txt = paras[p_idx]
            txt = re.sub(r'^[1-9]\s*[\.\-\)]?\s+', '', txt).strip()
            items.append(txt)
        content_data[lang] = items
    elif lang == 'hindi':
        items = []
        for p_idx in range(1, 10):
            txt = paras[p_idx]
            txt = re.sub(r'^[1-9]\s*[\.\-\)]?\s+', '', txt).strip()
            items.append(txt)
        content_data[lang] = items

for lang, items in content_data.items():
    print(f"Extracted {len(items)} items for {lang}")

# Write content.js
content_js_path = os.path.join(gallery_dir, 'content.js')
js_str = "window.manuscriptContent = " + json.dumps(content_data, ensure_ascii=False, indent=4) + ";"
with open(content_js_path, 'w', encoding='utf-8') as f:
    f.write(js_str)
print("Successfully generated content.js")

items_meta = [
    {
        "key": "item1",
        "img": "images/manuscript-item1.png",
        "audio": {
            "english": encode_url("Audios/English/1. LIST OF 09 MANUSCRIPTS FOR AUDIO VISUALS.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-1.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 1.ml.wav"),
            "urdu": encode_url("Audios/Urdu/1.wav"),
            "gujarati": encode_url("Audios/Gujarati/1.wav"),
            "tamil": encode_url("Audios/Tamil/1. Sirr-e-Akbar by Prince Dara Shikohs.wav"),
            "kannada": encode_url("Audios/Kannada/1.Sirr-e-Akbar.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_1.Sirr-e-Akbar_Female.wav"),
            "odia": encode_url("Audios/Odia/1.wav"),
            "hindi": encode_url("Audios/Hindi/1. दारा शिकोह द्वारा रचित सर्र ए अकबर की प्रति.wav"),
            "marathi": encode_url("Audios/Marathi/1.wav.wav")
        },
        "labels": {
            "english": ["Sirr-e-Akbar by Prince Dara Shikoh", "Catalogue No. 3474"],
            "bengali": ["সির্-র-ই-আকবর - যুবরাজ দারা শিকোহ", "ক্যাটালগ নম্বর ৩৪৭৪"],
            "malayalam": ["സിർ-ഇ-അക്ബർ - പ്രിൻസ് ദാരാ ഷികോഹ്", "കാറ്റലോഗ് നമ്പർ 3474"],
            "urdu": ["سرِّ اکبر - شہزادہ دارا شکوہ", "اندراج نمبر 3474"],
            "gujarati": ["સિર્લ-એ-અકબર - રાજકુમાર દારા શિકોહ", "સૂચિ ક્રમાંક 3474"],
            "tamil": ["“சிர்ர்-இ-அக்பர்” – இளவரசர் தாரா ஷிகோ", "பட்டியல் எண் 3474"],
            "kannada": ["ಸಿರ್ರ್-ಎ-ಅಕ್ಬರ್ - ರಾಜಕುಮಾರ ದಾರಾ ಶಿಕೋ", "ಕ್ಯಾಟಲಾಗ್ ಸಂಖ್ಯೆ 3474"],
            "telugu": ["సిర్ర్-ఇ-అక్బర్ - రాకుమారుడు దారా షికో", "కేటలాగ్ సంఖ్య 3474"],
            "odia": ["ସିର-ଏ-ଅକବର - ରାଜକୁମାର ଦାରା ଶିକୋହ", "କାଟାଲଗ୍ ନମ୍ବର 3474"],
            "hindi": ["सर्र-ए-अकबर - शहज़ादा दारा शिकोह", "कैटलॉग संख्या 3474"],
            "marathi": ["सिर-ए-अकबर - राजकुमार दारा शिकोह", "कॅटलॉग क्रमांक 3474"]
        }
    },
    {
        "key": "item2",
        "img": "images/manuscript-item2.png",
        "audio": {
            "english": encode_url("Audios/English/2.A Persian paraphrase of Shrimad Bhagwat Geeta.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-2.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 2.ml.wav"),
            "urdu": encode_url("Audios/Urdu/2.wav"),
            "gujarati": encode_url("Audios/Gujarati/2.wav"),
            "tamil": encode_url("Audios/Tamil/2. Shrimad Bhagwat Geeta translated from Sanskrit.wav"),
            "kannada": encode_url("Audios/Kannada/2.A Persian paraphrase of Shrimad Bhagwat Geeta .wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_2,A Persian paraphrase of Shrimad Bhagwat Geeta_Female.wav"),
            "odia": encode_url("Audios/Odia/2.wav"),
            "hindi": encode_url("Audios/Hindi/2. श्रीमद्भगवद्गीता का एक फ़ारसी भावानुवाद.wav"),
            "marathi": encode_url("Audios/Marathi/2. wav.wav")
        },
        "labels": {
            "english": ["A Persian Paraphrase of Shrimad Bhagwat Geeta", "Catalogue No. 2193"],
            "bengali": ["শ্রীমদ্ভগবদ্গীতার ফারসি ভাবানুবাদ", "ক্যাটালগ নম্বর ২১৯৩"],
            "malayalam": ["ശ്രീമദ് ഭഗവദ്ഗീതയുടെ പേർഷ്യൻ പരിഭാഷ", "കാറ്റലോഗ് നമ്പർ 2193"],
            "urdu": ["شریمد بھاگوت گیتا کی فارسی تمثیل", "اندراج نمبر 2193"],
            "gujarati": ["શ્રીમદ્ ભગવદ્ ગીતાનો ફારસી પદ્યાનુવાદ", "સૂચિ ક્રમાંક 2193"],
            "tamil": ["ஸ்ரீமத் பகவத் கீதையின் பாரசீக மொழிபெயர்ப்பு", "பட்டியல் எண் 2193"],
            "kannada": ["ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತೆಯ ಪರ್ಷಿಯನ್ ಅನುವಾದ", "ಕ್ಯಾಟಲಾಗ್ ಸಂಖ್ಯೆ 2193"],
            "telugu": ["శ్రీమద్ భగవద్గీత యొక్క పర్షియన్ అనువాదం", "కేటలాగ్ సంఖ్య 2193"],
            "odia": ["ଶ୍ରୀମଦ ଭାଗବତ ଗୀତାର ପାର୍ସୀ ବ୍ୟାଖ୍ୟା", "କାଟାଲଗ୍ ନମ୍ବର 2193"],
            "hindi": ["श्रीमद्भगवद्गीता का फ़ारसी भावानुवाद", "कैटलॉग संख्या 2193"],
            "marathi": ["श्रीमद्भगवद्गीतेचे पर्शियन भाषांतर", "कॅटलॉग क्रमांक 2193"]
        }
    },
    {
        "key": "item3",
        "img": "images/manuscript-item3.png",
        "audio": {
            "english": encode_url("Audios/English/3. A treatise on weights and measures,.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-3.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 3.ml.wav"),
            "urdu": encode_url("Audios/Urdu/3.wav"),
            "gujarati": encode_url("Audios/Gujarati/3.wav"),
            "tamil": encode_url("Audios/Tamil/3. A treatise on weights and measures.wav"),
            "kannada": encode_url("Audios/Kannada/3.A treatise on weights and measures.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_3.A treatise on weights_Female.wav"),
            "odia": encode_url("Audios/Odia/3.wav"),
            "hindi": encode_url("Audios/Hindi/3. वजन और माप संबंधी एक ग्रंथ.wav"),
            "marathi": encode_url("Audios/Marathi/3. wav.wav")
        },
        "labels": {
            "english": ["A Treatise on Weights and Measures", "Catalogue No. 1032"],
            "bengali": ["ওজন ও পরিমাপ সংক্রান্ত গ্রন্থ", "ক্যাটালগ নম্বর ১০৩২"],
            "malayalam": ["അളവുകളെയും തൂക്കങ്ങളെയും കുറിച്ചുള്ള ഗ്രന്ഥം", "കാറ്റലോഗ് നമ്പർ 3888"],
            "urdu": ["وزن اور پیمائش پر مقالہ", "اندراج نمبر 1032"],
            "gujarati": ["વજન અને માપ અંગેનો ગ્રંથ", "સૂચિ ક્રમાંક 3888"],
            "tamil": ["எடைகள் மற்றும் அளவைகள் குறித்த நூல்", "பட்டியல் எண் 3888"],
            "kannada": ["ತೂಕ ಮತ್ತು ಅಳತೆಗಳ ಕುರಿತಾದ ಪ್ರಬಂಧ", "ಕ್ಯಾಟಲಾಗ್ ಸಂಖ್ಯೆ 3888"],
            "telugu": ["బరువులు మరియు కొలతలపై గ్రంథం", "కేటలాగ్ సంఖ్య 3888"],
            "odia": ["ଓଜନ ଏବଂ ମାପ ସମ୍ୱନ୍ଧୀୟ ଗ୍ରନ୍ଥ", "କାଟାଲଗ୍ ନମ୍ବର 3888"],
            "hindi": ["वज़न और माप से संबंधित ग्रंथ", "कैटलॉग संख्या 3888"],
            "marathi": ["वजन आणि मापांवरील ग्रंथ", "कॅटलॉग क्रमांक 3888"]
        }
    },
    {
        "key": "item4",
        "img": "images/manuscript-item4.png",
        "audio": {
            "english": encode_url("Audios/English/4. Poems of Sultan Muhammad Qutb.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-4.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 4.ml.wav"),
            "urdu": encode_url("Audios/Urdu/4.wav"),
            "gujarati": encode_url("Audios/Gujarati/4.wav"),
            "tamil": encode_url("Audios/Tamil/4. Poems of Sultan Muhammad Qutb Shah of Golconda.wav"),
            "kannada": encode_url("Audios/Kannada/4.Poems of Sultan Muhammad Qutb Shah of Golconda.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_4.Poems of Sultan Muhammad_Female.wav"),
            "odia": encode_url("Audios/Odia/4.wav"),
            "hindi": encode_url("Audios/Hindi/4. पांडुलिपि.wav"),
            "marathi": encode_url("Audios/Marathi/4. wav.wav")
        },
        "labels": {
            "english": ["Poems of Sultan Muhammad Qutb Shah", "Catalogue No. 1845"],
            "bengali": ["সুলতান মুহাম্মদ কুতুব শাহের কবিতা", "ক্যাটালগ নম্বর ১৮৪৫"],
            "malayalam": ["സുൽത്താൻ മുഹമ്മദ് കുത്ബ് ഷായുടെ കവിതകൾ", "കാറ്റലോഗ് നമ്പർ 1845"],
            "urdu": ["سلطان محمد قطب شاہ کی نظمیں", "اندراج نمبر 1845"],
            "gujarati": ["સુલ્તાન મુહમ્મદ કુતુબ શાહની કવિતાઓ", "સૂચિ ક્રમાંક 1845"],
            "tamil": ["சுல்தான் முகம்மது குதுப் ஷாவின் கவிதைகள்", "பட்டியல் எண் 1845"],
            "kannada": ["ಸುಲ್ತಾನ್ ಮುಹಮ್ಮದ್ ಕುತುಬ್‌ ಷಾ ಅವರ ಕವಿತೆಗಳು", "ಕ್ಯಾಟಲಾಗ್ ಸಂಖ್ಯೆ 1845"],
            "telugu": ["సుల్తాన్ ముహమ్మద్ కుతుబ్ షా కవితలు", "కేటలాగ్ సంఖ్య 1845"],
            "odia": ["ସୁଲତାନ୍ ମୁହମ୍ମଦ କୁତୁବ୍ ଶାହଙ୍କ କବିତାବଳୀ", "କାଟାଲଗ୍ ନମ୍ବର 1845"],
            "hindi": ["सुल्तान मुहम्मद क़ुतुब शाह की कविताएँ", "कैटलॉग संख्या 1845"],
            "marathi": ["सुलतान मुहम्मद कुतुब शाह यांच्या कविता", "कॅटलॉग क्रमांक 1845"]
        }
    },
    {
        "key": "item5",
        "img": "images/manuscript-item5.png",
        "audio": {
            "english": encode_url("Audios/English/5. “Fars Nama” is an important.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-5.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 5.ml.wav"),
            "urdu": encode_url("Audios/Urdu/5.wav"),
            "gujarati": encode_url("Audios/Gujarati/5.wav"),
            "tamil": encode_url("Audios/Tamil/5. FARS NAMA.wav"),
            "kannada": encode_url("Audios/Kannada/5.Fars Nama.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_5.“Fars Nama”_Female.wav"),
            "odia": encode_url("Audios/Odia/5.wav"),
            "hindi": encode_url("Audios/Hindi/5. फ़ारस नामा काव्यात्मक पांडुलिपि.wav"),
            "marathi": encode_url("Audios/Marathi/5.wav.wav")
        },
        "labels": {
            "english": ["Fars Nama", "Nastaliq Poetic Manuscript"],
            "bengali": ["ফার্স নামা", "নস্তালিক লিপিতে রচিত কাব্যধর্মী পাণ্ডুলিপি"],
            "malayalam": ["ഫാർസ് നാമ", "നസ്താലിക് ലിപിയിലുള്ള കാവ്യ കൈയെഴുത്തുപ്രതി"],
            "urdu": ["فارس نامہ", "نستعلیق رسم الخط میں تحریر شدہ منظوم مخطوطہ"],
            "gujarati": ["ફારસ નામા", "નાસ્તલીક લિપિમાં કાવ્યાત્મક હસ્તપ્રત"],
            "tamil": ["ஃபார்ஸ் நாமா", "நஸ்தஅலீக் எழுத்துமுறை கவிதை வடிவம்"],
            "kannada": ["ಫಾರ್ಸ್ ನಾಮಾ", "ನಸ್ತಲಿಕ್ ಲಿಪಿಯ ಕಾವ್ಯಾತ್ಮಕ ಹಸ್ತಪ್ರತಿ"],
            "telugu": ["ఫరస్ నామా", "నస్తలీఖ్ లిపిలోని పద్య ప్రతి"],
            "odia": ["ଫାର୍ସ୍ ନାମା", "ନସ୍ତାଲିକ ଲିପିରେ କାବ୍ୟ ପାଣ୍ଡୁଲିପି"],
            "hindi": ["फ़ारस नामा", "नस्तालीक़ लिपि में काव्यात्मक पांडुलिपि"],
            "marathi": ["फारस नामा", "नस्तालिक लिपीतील काव्यात्मक हस्तलिखित"]
        }
    },
    {
        "key": "item6",
        "img": "images/manuscript-item6.png",
        "audio": {
            "english": encode_url("Audios/English/6. Kitab al-Qanun fi al-Tibb.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-6.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 6.ml.wav"),
            "urdu": encode_url("Audios/Urdu/6.wav"),
            "gujarati": encode_url("Audios/Gujarati/6.wav"),
            "tamil": encode_url("Audios/Tamil/6. Kitab al-Qanun fi al-Tibb (the canon of medicine).wav"),
            "kannada": encode_url("Audios/Kannada/6.Kitab al-Qanun fi al-Tibb.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_6.Kitab al-Qanun fi al-Tibb_Female.wav"),
            "odia": encode_url("Audios/Odia/6.wav"),
            "hindi": encode_url("Audios/Hindi/6. अरबी भाषा में लिखित एक व्यापक चिकित्सा विश्वकोश.wav"),
            "marathi": encode_url("Audios/Marathi/6. wav.wav")
        },
        "labels": {
            "english": ["Kitab al-Qanun fi al-Tibb", "The Canon of Medicine by Avicenna"],
            "bengali": ["কিতাব আল-কানুন ফি আল-তিব্ব", "ইবনে সিনার চিকিৎসাবিজ্ঞানের কানুন"],
            "malayalam": ["കിതാബ് അൽ-ഖാനൂൻ ഫി അൽ-തിബ്ബ്", "ഇബ്നെ സിനയുടെ മെഡിക്കൽ വിജ്ഞാനകോശം"],
            "urdu": ["کتاب القانون فی الطب", "ابن سینا کی جامع طبی تصنیف"],
            "gujarati": ["કિતાબ અલ-કાનૂન ફિ અલ-તિબ્બ", "ઇબ્ને સિનાનો તબીબી વિશ્વકોશ"],
            "tamil": ["கிதாப் அல்-கானூன் ஃபி அல்-திப்", "இப்னு சீனா எழுதிய மருத்துவக் கானோன்"],
            "kannada": ["ಕಿತಾಬ್ ಅಲ್-ಖಾನೂನ್ ಫಿ ಅಲ್-ತಿಬ್", "ಇಬ್ನೆ ಸೀನಾ ಅವರ ವೈದ್ಯಕೀಯ ವಿಶ್ವಕೋಶ"],
            "telugu": ["కితాబ్ అల్-ఖానున్ ఫి అల్-టిబ్", "ఇబ్నే సినా యొక్క వైద్య విజ్ఞానకోశం"],
            "odia": ["କିତାବ୍ ଅଲ୍-କାନୁନ୍ ଫି ଅଲ୍-ତିବ୍", "ଇବ୍ନେ ସିନାଙ୍କ ଚିକିତ୍ସାଶାସ୍ତ୍ରର ନୀୟମାବଳୀ"],
            "hindi": ["किताब अल-क़ानून फ़ी अल-तिब्बी", "इब्न सीना का चिकित्सा का क़ानून"],
            "marathi": ["किताब अल-कानून फि अल-तिब्ब", "इब्न सिनाचा वैद्यकीय विश्वकोश"]
        }
    },
    {
        "key": "item7",
        "img": "images/manuscript-item7.png",
        "audio": {
            "english": encode_url("Audios/English/7. Ihaya al-Uloom al-Deen, meaning.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-7.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 7.ml.wav"),
            "urdu": encode_url("Audios/Urdu/7.wav"),
            "gujarati": encode_url("Audios/Gujarati/7.wav"),
            "tamil": encode_url("Audios/Tamil/7. Ihaya al-Uloom al-Deen.wav"),
            "kannada": encode_url("Audios/Kannada/7.Ihaya al-Uloom al-Deen,.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_7.Ihaya al-Uloom al-Deen_Female.wav"),
            "odia": encode_url("Audios/Odia/7.wav"),
            "hindi": encode_url("Audios/Hindi/7. अरबी भाषा में रचित यह विशाल विश्वकोशीय ग्रंथ.wav"),
            "marathi": encode_url("Audios/Marathi/7. wav.wav")
        },
        "labels": {
            "english": ["Ihaya al-Uloom al-Deen", "The Revival of the Religious Sciences"],
            "bengali": ["ইদুইয়া উলূম আল-দীন", "ধর্মীয় জ্ঞানের পুনর্জাগরণ (ইমাম আল-গাজ্জালি)"],
            "malayalam": ["ഇഹ്യാ ഉലൂം അദ്-ദീൻ", "മതവിജ്ഞാനങ്ങളുടെ പുനരുജ്ജീവനം (ഇമാം അൽ-ഗസാലി)"],
            "urdu": ["احیاء علوم الدین", "مذہبی علوم کی تجدید (امام الغزالی)"],
            "gujarati": ["અહ્યા ઉલ-ઉલૂમ અલ-દીન", "ધાર્મિક વિજ્ઞાનનું પુનરુજીવન (ઇમામ અલ-ગઝાલી)"],
            "tamil": ["இஹ்யா அல்-உலூம் அல்-தீன்", "சமய அறிவியல்களின் மறுமலர்ச்சி (இமாம் அல்-கஸாலி)"],
            "kannada": ["ಇಹಾಯಾ ಅಲ್-ಉಲೂಮ್ ಅಲ್-ದೀನ್", "ಧಾರ್ಮಿಕ ವಿಜ್ಞಾನಗಳ ಪುನರುಜ್ಜೀವನ (ಇಮಾಮ್ ಅಲ್-ಘಝಾಲಿ)"],
            "telugu": ["ఇహాయా అల్-ఉలూమ్ అల్-దీన్", "మత శాస్త్రాల పునరుజ్జీవనం (ఇమామ్ అల్-గజాలీ)"],
            "odia": ["ଇହାୟା ଅଲ୍-ଉଲୁମ୍ ଅଲ୍-ଦୀନ୍", "ଧାର୍ମିକ ବିଜ୍ଞାନର ପୁନରୁଦ୍ଧାର (ଇମାମ ଅଲ୍-ଗାଜଲି)"],
            "hindi": ["इह्या अल-उलूम अल-दीन", "धार्मिक विज्ञानों का पुनरुद्धार (इमाम अल-ग़ज़ाली)"],
            "marathi": ["इहाया अल-उलूम अल-दीन", "धार्मिक विज्ञानांचे पुनरुज्जीवन (इमाम अल-गजाली)"]
        }
    },
    {
        "key": "item8",
        "img": "images/manuscript-item8.png",
        "audio": {
            "english": encode_url("Audios/English/8. Holy Quran.wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-8.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 8.ml.wav"),
            "urdu": encode_url("Audios/Urdu/8.wav"),
            "gujarati": encode_url("Audios/Gujarati/8.wav"),
            "tamil": encode_url("Audios/Tamil/8. Holy Quran written in Kufic scripts.wav"),
            "kannada": encode_url("Audios/Kannada/8.manuscript copy of the Holy Quran.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_8.This manuscript is a copy of the Holy Quran_Female.wav"),
            "odia": encode_url("Audios/Odia/8.wav"),
            "hindi": encode_url("Audios/Hindi/8. क़ुरआन की एक प्रति.wav"),
            "marathi": encode_url("Audios/Marathi/8. wav.wav")
        },
        "labels": {
            "english": ["Holy Quran (Kufic Script)", "3rd Century Hijri Parchment Codex"],
            "bengali": ["পবিত্র কোরআন (কুফিক লিপি)", "তৃতীয় হিজরি শতকের পার্চমেন্ট পাণ্ডুলিপি"],
            "malayalam": ["വിശുദ്ധ ഖുർആൻ (കൂഫിക് ലിപി)", "മൂന്നാം ഹിജ്റ നൂറ്റാണ്ടിലെ ചർമ്മപേപ്പർ കോഡെക്സ്"],
            "urdu": ["قرآن مجید (کوفی رسم الخط)", "تیسری صدی ہجری کا چمڑے کے ورق پر مخطوطہ"],
            "gujarati": ["પવિત્ર કુરાન શરીફ (કુફી લિપિ)", "૩જી સદી હિજરી ચામડા પરની હસ્તપ્રત"],
            "tamil": ["புனித குர்ஆன் (கூஃபிக் எழுத்துமுறை)", "3ஆம் நூற்றாண்டு ஹிஜ்ரி தோல் ஏட்டுப் பிரதி"],
            "kannada": ["ಪರಿಶುದ್ಧ ಕುರಾನ್ (ಕುಫಿಕ್ ಲಿಪಿ)", "3 ನೇ ಹಿಜ್ರಿ ಶತಮಾನದ ಚರ್ಮದ ಕಾಗದದ ಪ್ರತಿ"],
            "telugu": ["పవిత్ర ఖురాన్ (కూఫీ లిపి)", "3వ శతాబ్దం హిజ్రీ చర్మపత్ర ప్రతి"],
            "odia": ["ପବିତ୍ର କୋରାନ (କୁଫିକ୍ ଲିପି)", "୩ୟ ହିଜରୀ ଶତାବ୍ଦୀର ଚର୍ମପଟ୍ଟ ପାଣ୍ଡୁଲିପି"],
            "hindi": ["पवित्र क़ुरआन (कूफ़ी लिपि)", "तीसरी हिजरी शताब्दी की चर्मपत्र पांडुलिपि"],
            "marathi": ["पवित्र कुराण (कुफिक लिपी)", "३ ऱ्या हिजरी शतकातील चर्मपत्र प्रत"]
        }
    },
    {
        "key": "item9",
        "img": "images/manuscript-item9.png",
        "audio": {
            "english": encode_url("Audios/English/9. (Book of Kings).wav"),
            "bengali": encode_url("Audios/Bengali/Manuscript-9.wav"),
            "malayalam": encode_url("Audios/Malayalam/manuscript 9.ml.wav"),
            "urdu": encode_url("Audios/Urdu/9.wav"),
            "gujarati": encode_url("Audios/Gujarati/9.wav"),
            "tamil": encode_url("Audios/Tamil/9. Shah Nama-e-Firdausi (Book of Kings).wav"),
            "kannada": encode_url("Audios/Kannada/9.Shah Nama-e-Firdausi.wav"),
            "telugu": encode_url("Audios/Telugu/Telugu_9.Shah Nama-e-Firdausi_Female.wav"),
            "odia": encode_url("Audios/Odia/9.wav"),
            "hindi": encode_url("Audios/Hindi/9. फ़ारसी महाकाव्य.wav"),
            "marathi": encode_url("Audios/Marathi/9.wav.wav")
        },
        "labels": {
            "english": ["Shah Nama-e-Firdausi (Book of Kings)", "Epic Persian Poem with 37 Mughal Paintings"],
            "bengali": ["শাহনামা-এ-ফিরদৌসি", "৩৭টি মুঘল চিত্রকর্মসহ ফারসি মহাকাব্য"],
            "malayalam": ["ഷാ നാമ-ഇ-ഫിർദൗസി", "37 മുഗൾ ചിത്രങ്ങളടങ്ങിയ പേർഷ്യൻ ഇതിഹാസ കാവ്യം"],
            "urdu": ["شاہ نامہ فردوسی", "37 مغلیہ پینٹنگز کے ساتھ فارسی رزمیہ تصنیف"],
            "gujarati": ["શાહનામા-એ-ફિરદૌસી (રાજાઓની ચોપડી)", "૩૭ મુઘલ ચિત્રો સાથે ફારસી મહાકાવ્ય"],
            "tamil": ["ஷா நாமா-ஏ-ஃபிர்தௌசி (அரசர்களின் நூல்)", "37 முகலாய ஓவியங்களுடன் பாரசீகக் காவியம்"],
            "kannada": ["ಷಹನಾಮ-ಎ-ಫಿರ್ದೌಸಿ (ರಾಜರ ಗ್ರಂಥ)", "37 ಮೊಘಲ್ ವರ್ಣಚಿತ್ರಗಳಿರುವ ಪರ್ಷಿಯನ್ ಮಹಾಕಾವ್ಯ"],
            "telugu": ["షాహనామా-ఎ-ఫిర్దౌసీ (రాజుల గ్రంథం)", "37 మొఘల్ చిత్రాలతో పర్షియన్ ఇతిహాసం"],
            "odia": ["ଶାହନାମା (ରାଜାମାନଙ୍କ ଆଲେଖ୍ୟ)", "୩୭ଟି ମୁଗଲ ଚିତ୍ର ସହ ଫାର୍ସୀ ମହାକାବ୍ୟ"],
            "hindi": ["शाहनामा-ए-फ़िरदौसी (राजाओं की पुस्तक)", "37 मुग़ल चित्रों के साथ फ़ारसी महाकाव्य"],
            "marathi": ["शाहनामा-ए-फिरदौसी (बुक ऑफ किंग्स)", "37 मोगल चित्रांसह पर्शियन महाकाव्य"]
        }
    }
]

languages_list = [
    {"id": "bengali", "label": "বাংলা (Bengali)"},
    {"id": "english", "label": "English"},
    {"id": "malayalam", "label": "മലയാളം (Malayalam)"},
    {"id": "urdu", "label": "اردو (Urdu)"},
    {"id": "gujarati", "label": "ગુજરાતી (Gujarati)"},
    {"id": "tamil", "label": "தமிழ் (Tamil)"},
    {"id": "kannada", "label": "ಕನ್ನಡ (Kannada)"},
    {"id": "telugu", "label": "తెలుగు (Telugu)"},
    {"id": "odia", "label": "ଓଡ଼ିଆ (Odia)"},
    {"id": "hindi", "label": "हिन्दी (Hindi)"},
    {"id": "marathi", "label": "मराठी (Marathi)"}
]

all_lang_ids = [l["id"] for l in languages_list]

def generate_index_html():
    intros = {
        "bengali": ("পাণ্ডুলিপি গ্যালারি", "সালার জং মিউজিয়ামের পাণ্ডুলিপি গ্যালারি থেকে নির্বাচিত বিরল পাণ্ডুলিপির মধ্যে যুবরাজ দারা শিকোহের সির্-র-ই-আকবর, ফারসি ভাষায় শ্রীমদ্ভগবদ্গীতা, ওজন ও পরিমাপ সংক্রান্ত গ্রন্থ, সুলতান মুহাম্মদ কুতুব শাহের কবিতা, ফার্স নামা, কিতাব আল-কানুন ফি আল-তিব্ব, ইদুইয়া উলূম আল-দীন, কুফিক লিপিতে পবিত্র কোরআন এবং শাহনামা-এ-ফিরদৌসি অন্তর্ভুক্ত রয়েছে।"),
        "english": ("Manuscript Gallery", "A selection of rare manuscripts from the Salar Jung Museum, including Sirr-e-Akbar by Prince Dara Shikoh, Shrimad Bhagwat Geeta in Persian, a treatise on weights and measures, poems of Sultan Muhammad Qutb Shah, Fars Nama, Kitab al-Qanun fi al-Tibb, Ihaya al-Uloom al-Deen, Holy Quran in Kufic script, and Shah Nama-e-Firdausi."),
        "malayalam": ("മാന്യുസ്ക്രിപ്റ്റ് ഗാലറി", "സലാർ ജംഗ് മ്യൂസിയത്തിലെ മാന്യുസ്ക്രിപ്റ്റ് ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുത്ത അപൂർവ്വ കൈയെഴുത്തുപ്രതികളിൽ പ്രിൻസ് ദാരാ ഷികോഹിന്‍റെ സിർ-ഇ-അക്ബർ, പേർഷ്യൻ ഭാഷയിലുള്ള ശ്രീമദ് ഭഗവദ്ഗീത, അളവുകളെയും തൂക്കങ്ങളെയും കുറിച്ചുള്ള ഗ്രന്ഥം, സുൽത്താൻ മുഹമ്മദ് കുത്ബ് ഷായുടെ കവിതകൾ, ഫാർസ് നാമ, കിതാബ് അൽ-ഖാനൂൻ ഫി അൽ-തിബ്ബ്, ഇഹ്യാ ഉലൂം അദ്-ദീൻ, കൂഫിക് ലിപിയിലുള്ള വിശുദ്ധ ഖുർആൻ, ഷാ നാമ-ഇ-ഫിർദൗസി എന്നിവ ഉൾപ്പെടുന്നു."),
        "urdu": ("مخطوطات گیلری", "سالار جنگ میوزیم کی مخطوطات گیلری سے منتخب کردہ نادر مخطوطات میں شہزادہ دارا شکوہ کی تصنیف سرِّ اکبر، فارسی میں شریمد بھاگوت گیتا، وزن اور پیمائش پر مقالہ، سلطان محمد قطب شاہ کی نظمیں، فارس نامہ، کتاب القانون فی الطب، احیاء علوم الدین، کوفی رسم الخط میں قرآن مجید اور شاہ نامہ فردوسی شامل ہیں۔"),
        "gujarati": ("હસ્તપ્રત ગેલેરી", "સાલાર જંગ મ્યુઝિયમની હસ્તપ્રત ગેલેરીમાંથી પસંદ કરાયેલી દુર્લભ હસ્તપ્રતોમાં રાજકુમાર દારા શિકોહનું સિર્લ-એ-અકબર, ફારસીમાં શ્રીમદ્ ભગવદ્ ગીતા, વજન અને માપ અંગેનો ગ્રંથ, સુલ્તાન મુહમ્મદ કુતુબ શાહની કવિતાઓ, ફારસ નામા, કિતાબ અલ-કાનૂન ફિ અલ-તિબ્બ, અહ્યા ઉલ-ઉલૂમ અલ-દીન, કુફી લિપિમાં પવિત્ર કુરાન અને શાહનામા-એ-ફિરદૌસીનો સમાવેશ થાય છે."),
        "tamil": ("கையெழுத்துப் பிரதி கேலரி", "சலார் ஜங் அருங்காட்சியகத்தின் கையெழுத்துப் பிரதி கேலரியிலிருந்து தேர்ந்தெடுக்கப்பட்ட அரிய கையெழுத்துப் பிரதிகளில் இளவரசர் தாரா ஷிகோவின் சிர்ர்-இ-அக்பர், பாரசீக மொழியில் ஸ்ரீமத் பகவத் கீதை, எடைகள் மற்றும் அளவைகள் குறித்த நூல், சுல்தான் முகம்மது குதுப் ஷாவின் கவிதைகள், ஃபார்ஸ் நாமா, கிதாப் அல்-கானூன் ஃபி அல்-திப், இஹ்யா அல்-உலூம் அல்-தீன், கூஃபிக் எழுத்துமுறையில் புனித குர்ஆன் மற்றும் ஷா நாமா-ஏ-ஃபிர்தௌசி ஆகியவை அடங்கும்."),
        "kannada": ("ಹಸ್ತಪ್ರತಿ ಗ್ಯಾಲರಿ", "ಸಲಾರ್ ಜಂಗ್ ಸಂಗ್ರಹಾಲಯದ ಹಸ್ತಪ್ರತಿ ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಲಾದ ಅಪರೂಪದ ಹಸ್ತಪ್ರತಿಗಳಲ್ಲಿ ರಾಜಕುಮಾರ ದಾರಾ ಶಿಕೋ ಅವರ ಸಿರ್ರ್-ಎ-ಅಕ್ಬರ್, ಪರ್ಷಿಯನ್ ಭಾಷೆಯಲ್ಲಿ ಶ್ರೀಮದ್ ಭಗವದ್ಗೀತೆ, ತೂಕ ಮತ್ತು ಅಳತೆಗಳ ಕುರಿತಾದ ಪ್ರಬಂಧ, ಸುಲ್ತಾನ್ ಮುಹಮ್ಮದ್ ಕುತುಬ್‌ ಷಾ ಅವರ ಕವಿತೆಗಳು, ಫಾರ್ಸ್ ನಾಮಾ, ಕಿತಾಬ್ ಅಲ್-ಖಾನೂನ್ ಫಿ ಅಲ್-ತಿಬ್, ಇಹಾಯಾ ಅಲ್-ಉಲೂಮ್ ಅಲ್-ದೀನ್, ಕುಫಿಕ್ ಲಿಪಿಯಲ್ಲಿ ಪರಿಶುದ್ಧ ಕುರಾನ್ ಮತ್ತು ಷಹನಾಮ-ಎ-ಫಿರ್ದೌಸಿ ಸೇರಿವೆ."),
        "telugu": ("తాళపత్ర గ్రంథాల గ్యాలరీ", "సాలార్ జంగ్ మ్యూజియం యొక్క తాళపత్ర గ్రంథాల గ్యాలరీ నుండి ఎంపిక చేసిన అరుదైన ప్రతులలో రాకుమారుడు దారా షికో యొక్క సిర్ర్-ఇ-అక్బర్, పర్షియన్ భాషలో శ్రీమద్ భగవద్గీత, బరువులు మరియు కొలతలపై గ్రంథం, సుల్తాన్ ముహమ్మద్ కుతుబ్ షా కవితలు, ఫరస్ నామా, కితాబ్ అల్-ఖానున్ ఫి అల్-టిబ్, ఇహాయా అల్-ఉలూమ్ అల్-దీన్, కూఫీ లిపిలో పవిత్ర ఖురాన్ మరియు షాహనామా-ఎ-ఫిర్దౌసీ ఉన్నాయి."),
        "odia": ("ପାଣ୍ଡୁଲିପି ଗ୍ୟାଲେରୀ", "ସାଲାର ଜଙ୍ଗ ମ୍ୟୁଜିୟମର ପାଣ୍ଡୁଲିପି ଗ୍ୟାଲେରୀରୁ ମନୋନୀତ ଦୁର୍ଲଭ ପାଣ୍ଡୁଲିପିଗୁଡ଼ିକ ମଧ୍ୟରେ ରାଜକୁମାର ଦାରା ଶିକୋହଙ୍କ ସିର-ଏ-ଅକବର, ଫାର୍ସୀ ଭାଷାରେ ଶ୍ରୀମଦ ଭାଗବତ ଗୀତା, ଓଜନ ଏବଂ ମାପ ସମ୍ୱନ୍ଧୀୟ ଗ୍ରନ୍ଥ, ସୁଲତାନ୍ ମୁହମ୍ମଦ କୁତୁବ୍ ଶାହଙ୍କ କବିତାବଳୀ, ଫାର୍ସ୍ ନାମା, କିତାବ୍ ଅଲ୍-କାନୁନ୍ ଫି ଅଲ୍-ତିବ୍, ଇହାୟା ଅଲ୍-ଉଲୁମ୍ ଅଲ୍-ଦୀନ୍, କୁଫିକ୍ ଲିପିରେ ପବିତ୍ର କୋରାନ ଏବଂ ଶାହନାମା ଅନ୍ତର୍ଭୁକ୍ତ।"),
        "hindi": ("पांडुलिपि गैलरी", "सालार जंग संग्रहालय की पांडुलिपि गैलरी से चयनित दुर्लभ पांडुलिपियों में शहज़ादा दारा शिकोह की सर्र-ए-अकबर, फ़ारसी में श्रीमद्भगवद्गीता, वज़न और माप से संबंधित ग्रंथ, सुल्तान मुहम्मद क़ुतुब शाह की कविताएँ, फ़ारस नामा, किताब अल-क़ानून फ़ी अल-तिब्बी, इह्या अल-उलूम अल-दीन, कूफ़ी लिपि में पवित्र क़ुरआन और शाहनामा-ए-फ़िरदौसी शामिल हैं।"),
        "marathi": ("हस्तलिखित दालन", "सालार जंग संग्रहालयाच्या हस्तलिखित दालनातून निवडलेल्या दुर्मीळ हस्तलिखितांमध्ये राजकुमार दारा शिकोह यांचे सिर-ए-अकबर, पर्शियन भाषेतील श्रीमद्भगवद्गीता, वजन आणि मापांवरील ग्रंथ, सुलतान मुहम्मद कुतुब शाह यांच्या कविता, फारस नामा, किताब अल-कानून फि अल-तिब्ब, इहाया अल-उलूम अल-दीन, कुफिक लिपीतील पवित्र कुराण आणि शाहनामा-ए-फिरदौसी यांचा समावेश आहे.")
    }

    intro_sections = []
    for lang in all_lang_ids:
        title, p_text = intros[lang]
        is_disp = "block" if lang == "bengali" else "none"
        rtl = 'dir="rtl" style="text-align:right;"' if lang == "urdu" else ''
        sec = f'<section class="gallery-intro langCnt" id="{lang}" style="display:{is_disp}"><h1 {rtl}>{title}</h1><p {rtl}>{p_text}</p></section>'
        intro_sections.append(sec)
    
    cards_html = []
    for idx, item in enumerate(items_meta):
        item_num = idx + 1
        item_key = item["key"]
        img_src = item["img"]
        default_title = item["labels"]["bengali"][0]
        default_badge = item["labels"]["bengali"][1]
        default_audio = item["audio"]["bengali"]

        card = f'''<article class="item-card" data-audio-key="{item_key}" onclick="if(!event.target.closest('audio')){{location.href='item{item_num}.html'}}">
  <img src="{img_src}" alt="{default_title}">
  <h2 data-card-label="{item_key}-title">{default_title}</h2>
  <p data-card-label="{item_key}-subtitle">{default_badge}</p>
  <p class="card-content" data-card-content="{item_key}"></p>
  <audio controls preload="metadata" src="{default_audio}"></audio>
</article>'''
        cards_html.append(card)

    items_meta_json = json.dumps(items_meta, ensure_ascii=False, indent=2)

    options_html = []
    for l in languages_list:
        sel = ' selected' if l["id"] == "bengali" else ''
        options_html.append(f'<option value="{l["id"]}"{sel}>{l["label"]}</option>')

    html = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Manuscript Gallery | Salar Jung Museum</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="css/styles.css">
<style>
.gallery-intro{{padding:28px 6%;background:#fff;color:#2e2e2e}}
.gallery-intro h1{{font-size:42px;margin:0 0 12px}}
.gallery-intro p{{font-size:20px;max-width:1100px}}
.gallery-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;padding:28px 6%;background:#a50309}}
.item-card{{background:#fff;padding:14px;color:#2e2e2e;cursor:pointer;display:flex;flex-direction:column;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);transition:transform 0.2s}}
.item-card:hover{{transform:translateY(-4px)}}
.item-card img{{width:100%;height:270px;object-fit:contain;background:#ffffff;border-radius:6px;order:1}}
.item-card h2{{font-size:18px;margin:14px 0 4px;order:2;color:#a50309;font-weight:700}}
.item-card p[data-card-label$="-subtitle"]{{font-size:14px;color:#666;margin-bottom:8px;order:3}}
.item-card audio{{width:100%;order:4;margin:10px 0}}
.item-card p.card-content{{order:5;margin-top:10px;line-height:1.7;font-size:15px;color:#333;white-space:pre-line}}
.audioBar{{padding:18px 6%;background:#2e2e2e;color:#fff}}
.audioBar audio{{width:100%}}
.audioBar p{{margin:0 0 8px}}
@media(max-width:992px){{.gallery-grid{{grid-template-columns:repeat(2,1fr)}}}}
@media(max-width:767px){{.gallery-intro h1{{font-size:30px}}.gallery-intro p{{font-size:17px}}.gallery-grid{{grid-template-columns:1fr;padding:18px 4%}}.item-card img{{height:240px}}}}
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
            {"\n            ".join(options_html)}
          </select>
        </div>
      </div>
    </header>
  </div>
</div>
<main>
{"".join(intro_sections)}

<section class="gallery-grid">
{"".join(cards_html)}
</section>
</main>

<footer>
  <p>© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a></p>
</footer>

<script src="content.js"></script>
<script>
const itemsMeta = {items_meta_json};

function applyLanguage(lang) {{
  document.querySelectorAll('.langCnt').forEach(el => {{
    el.style.display = (el.id === lang) ? 'block' : 'none';
  }});

  itemsMeta.forEach((meta, idx) => {{
    const card = document.querySelector(`[data-audio-key="${{meta.key}}"]`);
    if (!card) return;

    const titleEl = card.querySelector(`[data-card-label="${{meta.key}}-title"]`);
    const badgeEl = card.querySelector(`[data-card-label="${{meta.key}}-subtitle"]`);
    const contentEl = card.querySelector(`[data-card-content="${{meta.key}}"]`);
    const audioEl = card.querySelector('audio');

    const labelPair = meta.labels[lang] || meta.labels.bengali;
    if (titleEl) {{
      titleEl.textContent = labelPair[0];
      if (lang === 'urdu') {{
        titleEl.setAttribute('dir', 'rtl');
        titleEl.style.textAlign = 'right';
      }} else {{
        titleEl.removeAttribute('dir');
        titleEl.style.textAlign = 'left';
      }}
    }}
    if (badgeEl) {{
      badgeEl.textContent = labelPair[1];
      if (lang === 'urdu') {{
        badgeEl.setAttribute('dir', 'rtl');
        badgeEl.style.textAlign = 'right';
      }} else {{
        badgeEl.removeAttribute('dir');
        badgeEl.style.textAlign = 'left';
      }}
    }}

    if (contentEl && window.manuscriptContent && window.manuscriptContent[lang]) {{
      const text = window.manuscriptContent[lang][idx] || '';
      contentEl.textContent = text;
      if (lang === 'urdu') {{
        contentEl.setAttribute('dir', 'rtl');
        contentEl.style.textAlign = 'right';
      }} else {{
        contentEl.removeAttribute('dir');
        contentEl.style.textAlign = 'left';
      }}
    }}

    if (audioEl) {{
      const audioSrc = meta.audio[lang] || meta.audio.bengali;
      audioEl.src = audioSrc;
    }}
  }});
}}

const selector = document.getElementById('languageSelector');
selector.addEventListener('change', function() {{
  applyLanguage(this.value);
}});

applyLanguage(selector.value);
</script>
</body>
</html>
'''
    with open(os.path.join(gallery_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    print("Successfully generated index.html")

generate_index_html()

def generate_item_html(item_idx):
    item_num = item_idx + 1
    item_meta = items_meta[item_idx]
    item_key = item_meta["key"]
    img_src = item_meta["img"]
    
    prev_link = f'item{item_num - 1}.html' if item_num > 1 else ''
    next_link = f'item{item_num + 1}.html' if item_num < 9 else ''

    lang_divs = []
    audio_map = {}

    for lang in all_lang_ids:
        desc_arr = content_data.get(lang, [])
        desc_text = desc_arr[item_idx] if item_idx < len(desc_arr) else ''
        
        labels_pair = item_meta["labels"].get(lang, item_meta["labels"]["bengali"])
        title = labels_pair[0]
        badge = labels_pair[1]

        is_disp = "block" if lang == "bengali" else "none"
        is_rtl = 'dir="rtl" style="text-align:right;"' if lang == "urdu" else ''
        
        audio_rel = item_meta["audio"].get(lang, item_meta["audio"]["bengali"])
        audio_map[lang] = audio_rel

        formatted_desc = desc_text.replace('\n\n', '<br><br>')

        div_html = f'''    <div class="bookContentDiv langCnt" id="{lang}" style="display: {is_disp};">
      <h2 class="cntHdng" {is_rtl}>{title}</h2>
      <div class="booImgDiv">
        <img src="./{img_src}" alt="{title}" onerror="this.onerror=null; this.src='./{img_src}';">
      </div>
      <div class="bookCntDiv">
        <p style="margin-bottom: 8px; font-weight: bold; color: #a50309;" {is_rtl}>{badge}</p>
        <div {is_rtl} style="font-size: 16px; line-height: 1.8; color: #333333;">{formatted_desc}</div>
      </div>
    </div>'''
        lang_divs.append(div_html)

    audio_map_json = json.dumps(audio_map, ensure_ascii=False, indent=2)

    prev_button_html = f'<a href="./{prev_link}" class="navBtn">← Previous Item</a>' if prev_link else '<span></span>'
    next_button_html = f'<a href="./{next_link}" class="navBtn">Next Item →</a>' if next_link else '<span></span>'

    default_audio_src = audio_map["bengali"]

    options_html = []
    for l in languages_list:
        sel = ' selected' if l["id"] == "bengali" else ''
        options_html.append(f'<option value="{l["id"]}"{sel}>{l["label"]}</option>')

    html = f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Manuscript Gallery - Item {item_num} | Salar Jung Museum</title>
  <link href="./css/bootstrap.min.css" rel="stylesheet" onerror="this.remove()">
  <link rel="stylesheet" href="./css/styles.css">
  <style>
    .audioPlayerDiv {{
      max-width: 900px;
      margin: 20px auto 0 auto;
      padding: 0 15px;
    }}
    .bookContentDiv {{
      max-width: 900px;
      margin: 20px auto 40px auto;
      padding: 25px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      box-sizing: border-box;
    }}
    .cntHdng {{
      font-size: 26px;
      font-weight: 700;
      color: #a50309;
      margin: 0 0 16px 0;
      line-height: 1.3;
    }}
    .booImgDiv {{
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
    }}
    .booImgDiv img {{
      max-height: 460px;
      width: auto;
      max-width: 100%;
      object-fit: contain;
      border-radius: 6px;
    }}
    .bookCntDiv {{
      font-size: 16px;
      line-height: 1.8;
      color: #333;
    }}
    .navBtnDiv {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 900px;
      margin: 30px auto;
      padding: 0 15px;
    }}
    .navBtn {{
      background-color: #a50309;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s;
    }}
    .navBtn:hover {{
      background-color: #7a0206;
      color: white;
    }}
  </style>
</head>
<body>
  <div class="sliderHeaderDiv">
    <div class="container">
      <header>
        <div class="logoLft">
          <a href="./index.html" class="logo logoTwo">
            <img src="./images/logo-moc.png" onerror="this.onerror=null; this.src='./images/logo.png';" alt="Ministry of Culture">
          </a>
        </div>
        <div class="logoRgt">
          <div class="langDiv">
            <span class="anuIcn">
              <img src="./images/logo-anu.png" alt="Anuvadini">
            </span>
            <select class="form formLang" id="languageSelector" aria-label="Select language">
              {"\n              ".join(options_html)}
            </select>
          </div>
        </div>
      </header>
    </div>
  </div>

  <main>
    <div class="audioPlayerDiv">
      <div style="background: #2e2e2e; color: #fff; padding: 15px 20px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 500; color: #ddd;">Audio Explanation:</p>
        <audio id="languageAudio" controls preload="metadata" style="width: 100%; outline: none;" src="./{default_audio_src}"></audio>
        <p id="audioMissingNote" style="margin: 6px 0 0 0; font-size: 12px; color: #ffca28; display: none;">Audio for selected language is not available.</p>
      </div>
    </div>

{"\n".join(lang_divs)}

    <div class="navBtnDiv">
      {prev_button_html}
      <a href="./index.html" class="navBtn">Back to Gallery Overview</a>
      {next_button_html}
    </div>
  </main>

  <footer>
    <p>© 2024 All rights reserved, By <a href="https://anuvadini.aicte-india.org/" target="_blank" rel="noreferrer">Anuvadini AI</a></p>
  </footer>

  <script src="./content.js"></script>
  <script>
    const itemIndex = {item_idx};
    const selector = document.getElementById('languageSelector');
    const audioPlayer = document.getElementById('languageAudio');
    const missingNote = document.getElementById('audioMissingNote');
    const audioMap = {audio_map_json};
    const baseAudioSrc = "./{default_audio_src}";

    function changeLanguage(lang) {{
      document.querySelectorAll('.langCnt').forEach(el => {{
        el.style.display = (el.id === lang) ? 'block' : 'none';
      }});

      const audioRel = audioMap[lang] || audioMap.bengali;
      const audioSrc = "./" + audioRel;
      if (audioPlayer) {{
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        audioPlayer.onerror = function() {{
          audioPlayer.onerror = null;
          audioPlayer.src = baseAudioSrc;
          audioPlayer.load();
          if (missingNote) missingNote.style.display = 'block';
        }};
        audioPlayer.src = audioSrc;
        audioPlayer.load();
        if (missingNote) missingNote.style.display = 'none';
      }}
    }}

    selector.addEventListener('change', function() {{
      changeLanguage(this.value);
    }});

    changeLanguage(selector.value);
  </script>
</body>
</html>
'''
    out_path = os.path.join(gallery_dir, f'item{item_num}.html')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Successfully generated item{item_num}.html")

for i in range(9):
    generate_item_html(i)

print("ALL FILES GENERATED SUCCESSFULLY FOR MANUSCRIPT GALLERY!")
