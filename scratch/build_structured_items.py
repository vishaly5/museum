import zipfile
import json
import os
import sys
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

# 1. Extract Tamil paragraphs from docx
def extract_docx_paragraphs(path):
    with zipfile.ZipFile(path) as z:
        xml_content = z.read('word/document.xml')
        root = ET.fromstring(xml_content)
        paragraphs = []
        for p in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = []
            for t in p.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                if t.text:
                    texts.append(t.text)
            full_text = "".join(texts).strip()
            if full_text:
                paragraphs.append(full_text)
        return paragraphs

tamil_docx_path = r"C:\Users\Kavya\Downloads\Tamil_remaining gallaries.ta-IN.docx"
tamil_paras = extract_docx_paragraphs(tamil_docx_path)

# Build Tamil items
tamil_items = [
    {
        "image": "images/logo.png",
        "badge": "ஊன்றுகோல் காட்சியகம்",
        "title": "1. ஊன்றுகோல் காட்சியகம்",
        "desc": "\n\n".join(tamil_paras[1:7]),
        "audioSrc": "Audios/tamil/WALKING STICKS GALLERY _ta.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "நாணயக் காட்சியகம்",
        "title": "2. நாணயக் காட்சியகம்",
        "desc": "\n\n".join(tamil_paras[9:18]),
        "audioSrc": "Audios/tamil/COINS GALLERY  _ta.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "தந்தக் காட்சியகம்",
        "title": "3. தந்தக் காட்சியகம்",
        "desc": "\n\n".join(tamil_paras[20:27]),
        "audioSrc": "Audios/tamil/IVORY GALLERY _ta.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "அணுகல் எண் XLIX-1028",
        "title": "4. தந்த நாற்காலி",
        "desc": "\n\n".join(tamil_paras[29:35]),
        "audioSrc": "Audios/tamil/IVORY CHAIR _ta.wav"
    }
]

# 2. Read zip artworksData.js for all other languages
zip_path = r"C:\Users\Kavya\Downloads\RemainingGalleries kada.zip"
with zipfile.ZipFile(zip_path, 'r') as z:
    content = z.read('RemainingGalleries/js/artworksData.js').decode('utf-8')
    clean_json = content.strip()[len('window.galleryItems ='):].strip()
    if clean_json.endswith(';'): clean_json = clean_json[:-1].strip()
    zip_items = json.loads(clean_json)

final_structured_items = {}

# Clean titles / badges in all languages
clean_titles = {
    "malayalam": [
        "1. വാക്കിംഗ് സ്റ്റിക്സ് ഗാലറി",
        "2. കോയിൻസ് ഗാലറി",
        "3. ഐവറി ഗാലറി",
        "4. ഐവറി ചെയർ"
    ],
    "odia": [
        "1. ୱାକିଂ ଷ୍ଟିକ୍‌ସ ଗ୍ୟାଲେରୀ (ଚାଲିବା ପାଇଁ ହାତ ବାଡ଼ିର ପ୍ରଦର୍ଶନୀ ଶାଳା)",
        "2. କଏନ୍‌ସ ଗ୍ୟାଲେରୀ (ମୁଦ୍ରା ପ୍ରଦର୍ଶନୀ ଶାଳା)",
        "3. ଆଇଭୋରୀ ଗ୍ୟାଲେରୀ (ଗଜଦାନ୍ତ କଳାକୃତି ପ୍ରଦର୍ଶନୀ ଶାଳା)",
        "4. ଆଇଭୋରୀ ଚେୟାର୍ (ଗଜଦନ୍ତ ଆସନ)"
    ]
}

lang_order = [
    'bengali', 'kannada', 'marathi', 'urdu',
    'gujarati', 'malayalam', 'odia', 'telugu', 'tamil'
]

for lang in lang_order:
    if lang == 'tamil':
        final_structured_items['tamil'] = tamil_items
    else:
        items = zip_items.get(lang, [])
        cleaned_list = []
        for idx, it in enumerate(items):
            item_copy = dict(it)
            if lang in clean_titles and idx < len(clean_titles[lang]):
                item_copy['title'] = clean_titles[lang][idx]
            # normalize slashes in audioSrc
            if 'audioSrc' in item_copy:
                item_copy['audioSrc'] = item_copy['audioSrc'].replace('\\', '/')
            cleaned_list.append(item_copy)
        final_structured_items[lang] = cleaned_list

out_json_path = r'c:\Users\Kavya\museum\scratch\remaining_gallery_items.json'
with open(out_json_path, 'w', encoding='utf-8') as f:
    json.dump(final_structured_items, f, ensure_ascii=False, indent=2)

print("Saved clean structured items for 9 languages to:", out_json_path)

for lang in lang_order:
    print(f"\n=== {lang} ===")
    for i, it in enumerate(final_structured_items[lang]):
        print(f"  [{i+1}] Title: {it['title']}")
        print(f"      Badge: {it['badge']}")
        print(f"      Audio: {it['audioSrc']}")
