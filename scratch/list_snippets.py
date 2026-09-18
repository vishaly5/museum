import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\parsed_docxs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for fname, paras in data.items():
    print(f"\n***** {fname} *****")
    for i, p in enumerate(paras):
        print(f"{i:2d}: {p[:100]}...")

