import zipfile
import xml.etree.ElementTree as ET
import glob
import os
import json

files = glob.glob(r'C:\Users\009\Downloads\phase4-content\Remaining Galleries\*.docx')

ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

def extract_paragraphs(docx_path):
    with zipfile.ZipFile(docx_path) as z:
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

parsed_data = {}
for f in sorted(files):
    fname = os.path.basename(f)
    print(f"Parsing {fname}...")
    paras = extract_paragraphs(f)
    parsed_data[fname] = paras

out_path = r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\parsed_docxs.json'
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, 'w', encoding='utf-8') as out_f:
    json.dump(parsed_data, out_f, ensure_ascii=False, indent=2)

print("Saved to", out_path)
