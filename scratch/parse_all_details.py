import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

out_path = r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\parsed_docxs.json'
with open(out_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for doc_name, paras in data.items():
    print(f"\n=======================================================")
    print(f"FILE: {doc_name}")
    print(f"=======================================================")
    for idx, p in enumerate(paras):
        print(f"p[{idx}]: {p}")

