import os
import sys
import re
import urllib.parse

sys.stdout.reconfigure(encoding='utf-8')

gallery_dir = r'C:\Users\009\Desktop\Anuvadini_Projects\museum\museum\ManuscriptGallery'

# Check content.js
with open(os.path.join(gallery_dir, 'content.js'), 'r', encoding='utf-8') as f:
    cjs = f.read()
    if 'window.manuscriptContent = ' not in cjs:
        print('ERROR in content.js header')
    else:
        print('content.js header verified OK!')

# Check html files
html_files = ['index.html'] + [f'item{i}.html' for i in range(1, 10)]

missing_audios = []
missing_imgs = []

for hf in html_files:
    path = os.path.join(gallery_dir, hf)
    if not os.path.exists(path):
        print(f'MISSING FILE: {hf}')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()

    # Find audio sources matching quotes
    audios = re.findall(r'Audios/[^"\']+', html)
    for a_src in audios:
        decoded = urllib.parse.unquote(a_src)
        full_audio_path = os.path.join(gallery_dir, decoded.replace('/', os.sep))
        if not os.path.exists(full_audio_path):
            missing_audios.append((hf, decoded))

    # Find image sources matching quotes
    imgs = re.findall(r'images/[^"\']+', html)
    for img_src in imgs:
        decoded = urllib.parse.unquote(img_src)
        full_img_path = os.path.join(gallery_dir, decoded.replace('/', os.sep))
        if not os.path.exists(full_img_path):
            missing_imgs.append((hf, decoded))

print('Missing Audios count:', len(missing_audios))
if missing_audios:
    print('Missing Audios:', missing_audios)

print('Missing Images count:', len(missing_imgs))
if missing_imgs:
    print('Missing Images:', missing_imgs)

if len(missing_audios) == 0 and len(missing_imgs) == 0:
    print('ALL AUDIOS & IMAGES VERIFIED 100% PERFECTLY ACROSS ALL HTML FILES!')
