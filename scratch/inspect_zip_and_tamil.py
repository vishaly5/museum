import zipfile
import json
import os
import sys
import xml.etree.ElementTree as ET

sys.stdout.reconfigure(encoding='utf-8')

zip_path = r"C:\Users\Kavya\Downloads\RemainingGalleries kada.zip"
docx_path = r"C:\Users\Kavya\Downloads\Tamil_remaining gallaries.ta-IN.docx"

print("--- Inspecting Zip artworksData.js ---")
with zipfile.ZipFile(zip_path, 'r') as z:
    content = z.read('RemainingGalleries/js/artworksData.js').decode('utf-8')
    clean_json = content.strip()
    if clean_json.startswith('window.galleryItems ='):
        clean_json = clean_json[len('window.galleryItems ='):].strip()
    if clean_json.endswith(';'):
        clean_json = clean_json[:-1].strip()
    
    data = json.loads(clean_json)
    print("Languages in zip artworksData.js:", list(data.keys()))
    for lang, items in data.items():
        print(f"\nLanguage: {lang} ({len(items)} items)")
        for i, item in enumerate(items):
            print(f"  Item {i+1}: title={item.get('title')}, badge={item.get('badge')}, audioSrc={item.get('audioSrc')}")
            # print first 100 chars of desc
            desc = item.get('desc', '')
            print(f"    desc preview: {desc[:80]}...")

print("\n--- Inspecting Zip index.html and app.js ---")
with zipfile.ZipFile(zip_path, 'r') as z:
    if 'RemainingGalleries/index.html' in z.namelist():
        idx_html = z.read('RemainingGalleries/index.html').decode('utf-8')
        print(f"Zip index.html length: {len(idx_html)}")
    if 'RemainingGalleries/js/app.js' in z.namelist():
        app_js = z.read('RemainingGalleries/js/app.js').decode('utf-8')
        print(f"Zip app.js length: {len(app_js)}")

print("\n--- Inspecting Tamil Docx ---")
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

tamil_paras = extract_docx_paragraphs(docx_path)
print(f"Tamil Docx total paragraphs: {len(tamil_paras)}")
for idx, p in enumerate(tamil_paras):
    print(f"[{idx}] {p}")
