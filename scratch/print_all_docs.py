import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\parsed_docxs.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\doc_dumps.txt', 'w', encoding='utf-8') as out:
    for doc_name, paras in data.items():
        out.write(f"\n=======================================================\n")
        out.write(f"FILE: {doc_name}\n")
        out.write(f"=======================================================\n")
        for idx, p in enumerate(paras):
            out.write(f"[{idx}] {p}\n")

print("Dumped to doc_dumps.txt")
