import os, json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

gallery_dir = r'C:\Users\009\Desktop\Anuvadini_Projects\museum\museum\ManuscriptGallery'

# Check content.js
content_js = os.path.join(gallery_dir, 'content.js')
with open(content_js, 'r', encoding='utf-8') as f:
    text = f.read()
    json_part = text.replace('window.manuscriptContent = ', '').rstrip(';')
    data = json.loads(json_part)

expected_langs = ['bengali', 'english', 'malayalam', 'urdu', 'gujarati', 'tamil', 'kannada', 'telugu', 'odia', 'hindi', 'marathi']

print('--- CHECKING content.js ---')
for lang in expected_langs:
    assert lang in data, f'Missing {lang} in content.js'
    assert len(data[lang]) == 9, f'{lang} has {len(data[lang])} items instead of 9'
    print(f'✓ {lang}: 9 items present')

print('--- CHECKING index.html ---')
with open(os.path.join(gallery_dir, 'index.html'), 'r', encoding='utf-8') as f:
    html = f.read()
for lang in expected_langs:
    assert f'value="{lang}"' in html, f'Missing select option for {lang} in index.html'
    assert f'id="{lang}"' in html, f'Missing intro section for {lang} in index.html'
print('✓ index.html verified for all 11 languages')

print('--- CHECKING item1.html .. item9.html ---')
for i in range(1, 10):
    item_file = os.path.join(gallery_dir, f'item{i}.html')
    with open(item_file, 'r', encoding='utf-8') as f:
        i_html = f.read()
    for lang in expected_langs:
        assert f'value="{lang}"' in i_html, f'Missing option {lang} in item{i}.html'
        assert f'id="{lang}"' in i_html, f'Missing div {lang} in item{i}.html'
print('✓ item1.html to item9.html verified for all 11 languages')
print('=== ALL VERIFICATIONS PASSED PERFECTLY ===')
