import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\parsed_docxs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for doc_name, paras in data.items():
    print("=== DOC:", doc_name)
    for i, p in enumerate(paras):
        # Print lines that look like titles or section headers
        if len(p) < 80 or "GALLERY" in p.upper() or "గ్యాలరీ" in p or "गॅलरी" in p or "گیلری" in p or "গ্যালারি" in p or "ಗ್ಯಾಲರಿ" in p or "کرسی" in p or "CHAIR" in p.upper() or "STICKS" in p.upper() or "લાઠી" in p or "লাঠি" in p or "ಕೋಲು" in p or "लाठी" in p or "عصا" in p or "عصائیں" in p or "Acc No" in p or "اندراج" in p:
            print(f"  [{i}] {p}")
