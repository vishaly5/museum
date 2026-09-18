import zipfile
import xml.etree.ElementTree as ET
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

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

paras = extract_docx_paragraphs(r"C:\Users\Kavya\Downloads\Tamil_remaining gallaries.ta-IN.docx")

# Let's inspect the paragraphs to cleanly segment into 4 items
print(f"Total paragraphs: {len(paras)}")
for i, p in enumerate(paras):
    print(f"[{i:02d}] {p[:80]}...")
