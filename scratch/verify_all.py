import zipfile
import json
import sys
import os

sys.stdout.reconfigure(encoding='utf-8')

zip_path = r"C:\Users\Kavya\Downloads\RemainingGalleries kada.zip"

with zipfile.ZipFile(zip_path, 'r') as z:
    content = z.read('RemainingGalleries/js/artworksData.js').decode('utf-8')
    clean_json = content.strip()[len('window.galleryItems ='):].strip()
    if clean_json.endswith(';'):
        clean_json = clean_json[:-1].strip()
    data = json.loads(clean_json)
    
    print('Total languages in zip artworksData.js:', len(data))
    namelist = set(z.namelist())
    
    for lang, items in data.items():
        print(f"\n=== Language: {lang} ({len(items)} items) ===")
        for i, it in enumerate(items):
            audio = it.get('audioSrc', '')
            # normalize slashes
            zip_entry = 'RemainingGalleries/' + audio.replace('\\', '/')
            exists = zip_entry in namelist
            print(f"  Item {i+1}: title={it.get('title')}, badge={it.get('badge')}")
            print(f"    audioSrc={audio} -> exists in zip: {exists}")
