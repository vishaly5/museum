import json
import zipfile
import sys

sys.stdout.reconfigure(encoding='utf-8')

# 1. Read existing scratch/remaining_gallery_items.json
with open('scratch/remaining_gallery_items.json', 'r', encoding='utf-8') as f:
    existing_items = json.load(f)

# 2. Read zip artworksData.js
with zipfile.ZipFile(r'C:\Users\Kavya\Downloads\RemainingGalleries kada.zip', 'r') as z:
    content = z.read('RemainingGalleries/js/artworksData.js').decode('utf-8')
    clean_json = content.strip()[len('window.galleryItems ='):].strip()
    if clean_json.endswith(';'): clean_json = clean_json[:-1].strip()
    zip_items = json.loads(clean_json)

print("Existing languages in repo:", list(existing_items.keys()))
print("Languages in zip:", list(zip_items.keys()))

for lang in zip_items:
    print(f"\n--- {lang} ---")
    for i, it in enumerate(zip_items[lang]):
        print(f"Item {i+1}: title='{it.get('title')}', badge='{it.get('badge')}'")
        print(f"  audioSrc: '{it.get('audioSrc')}'")
