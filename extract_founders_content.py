import os, glob, zipfile, xml.etree.ElementTree as ET, json, re

source_dir = r"C:\Users\ASUS\Downloads\content\founders gallery"

def detect_lang(filename):
    f = filename.lower()
    if 'bengali' in f or '.bn' in f: return 'bengali'
    if 'gujarati' in f or '.gu.' in f: return 'gujarati'
    if 'marathi' in f or '.mr.' in f: return 'marathi'
    if 'hindi' in f or '.hi.' in f: return 'hindi'
    if 'kannada' in f or '.kn.' in f: return 'kannada'
    if 'malayalam' in f or '.ml.' in f: return 'malayalam'
    if 'odia' in f or '.or.' in f or 'oriya' in f: return 'odia'
    if 'tamil' in f or '.ta.' in f: return 'tamil'
    if 'telugu' in f or '.te.' in f: return 'telugu'
    if 'urdu' in f or '.ur.' in f: return 'urdu'
    return None

item_markers_exact = [
    'XLIV-548',
    'XXVIII-160',
    'ACQ-62-41-2',
    'XLIV-231',
    'XXVIII-20',
    'LXIII-A-10',
    'LXIII-A-13',
    'LXIII-A-11',
    'LX-352'
]

title_words = [
    'બાઉલ', 'বাটি', 'कटोरा', 'ಬೌಲ್', 'ബൗൾ', 'ବୋଲ୍', 'ପାତ୍ର', 'பவுல்', 'கிண்ணம்', 'గిన్నె', 'గిన్నె/ పాత్ర', 'పాత్ర/ గిన్నె', 'پیالہ',
    'શેરવાની', 'শেরওয়ানি', 'शेरवानी', 'ಶೆರ್ವಾನಿ', 'ഷെർവാണി', 'ଶେରୱାନୀ', 'ஷெர்வானி', 'షెర్వాని', 'شیروانی',
    '4) કૅસકેટ', 'કૅસકેટ', 'সিন্দুক', 'कास्केट (संदूक)', 'कास्केट', 'संदूक', 'ಕ್ಯಾಸ್ಕೆಟ್', 'ಆಮಾಡപ്പെട്ടി', 'ആമാടപ്പെട്ടി', 'କ୍ୟାସ୍କେଟ୍', 'பெட்டகம்', 'పేటిక (Casket):', 'పేటిక', 'صندوقچہ',
    'પ્લેટ', 'থালা', 'প্লেট', 'प्लेट', 'ತಟ್ಟೆ', 'ಪ್ಲೇಟ್', 'ଥାଳି', 'ପ୍ଲେଟ୍', 'தட்டு', 'పళ్ళెం', 'پلیٹ',
    'ફૂલદાની', 'ফুলদানি', 'फूलदान', 'ಹೂದಾನಿ', 'പൂച്ചട്ടി', 'ଫୁଲଦାନୀ', 'ବାସ୍ ବା ଫୁଲଦାନୀ', 'ବାସ୍', 'குவளை', 'பூச்சாடி', 'జాడీ/ పాత్ర', 'జాడీ', 'పూలకుండీ', 'گلدان', '7) گلدان', '8)گلدان', 'कलश',
    '9) હુક્કા', '9) হুক্কা', '9) हुक्का', '9) ಹುಕ್ಕಾ', '9)ഹുക്ക', '9) ହୁକ୍କା', '9) ஹுக்கா', '9) హుక్కా', '9 )حقہ', 'حقہ', 'హుక్కా', 'ಹುಕ್ಕಾ', 'हुक्का', 'હુક્કા', 'হুক্কা'
]

def clean_paragraph(p):
    s = p.strip()
    up = s.upper()
    for m in item_markers_exact:
        if m in up:
            if len(s) < 40:
                return None
            s = re.sub(r'^(?:' + re.escape(m) + r'[\s\:\-]*)+', '', s, flags=re.IGNORECASE).strip()
    if up in ['LX-352-352', 'LX -352', 'LX-352']:
        return None
    low = s.lower()
    if any(low.startswith(wc) for wc in ['word', 'শব্দ', 'શબ્દો', 'शब्द', 'ಪದಗಳು', 'വാക്കുകൾ', 'ଶବ୍ଦ', 'சொற்கள்', 'பதங்கள்', 'పదాలు', 'الفاظ']):
        return None
    if re.match(r'^(word|words|শব্দ|શબ્દો|शब्द|ಪದಗಳು|വാക്കുകൾ|ଶବ୍ଦ|పదాలు|الفاظ)[\s\-\:\d]+$', low):
        return None
    if re.fullmatch(r'[\d\s\.\,\-]+', s):
        return None
    for tw in title_words:
        if s == tw or s.rstrip('. :') == tw:
            return None
        if s.startswith(tw) and len(s) < len(tw) + 15:
            return None
    return s

def extract_items_for_lang(paras):
    boundaries = []
    for i, p in enumerate(paras):
        up = p.upper()
        if 'XLIV-548' in up:
            if not any(b[0] == 1 for b in boundaries): boundaries.append((1, i))
        elif 'XXVIII-160' in up:
            if not any(b[0] == 2 for b in boundaries): boundaries.append((2, i))
        elif 'ACQ-62-41-2' in up or any(k in up for k in ['SHERWANI', 'शेरवानी', 'শেনওয়ানী', 'ಶೆರ್ವಾನಿ', 'ഷെർവാണി', 'ଶେରୱାନୀ', 'ஷெர்வானி', 'షెర్వాని', 'شیروانی', 'શેરવાની']):
            if not any(b[0] == 3 for b in boundaries): boundaries.append((3, i))
        elif 'XLIV-231' in up or '4) કૅસકેટ' in p or 'કૅસકેટ' in p or 'ಆಮಾಡಪೆಟ್ಟಿ' in p or 'CASKET' in up:
            if not any(b[0] == 4 for b in boundaries): boundaries.append((4, i))
        elif 'XXVIII-20' in up:
            if not any(b[0] == 5 for b in boundaries): boundaries.append((5, i))
        elif 'LXIII-A-10' in up:
            if not any(b[0] == 6 for b in boundaries): boundaries.append((6, i))
        elif 'LXIII-A-13' in up:
            if not any(b[0] == 7 for b in boundaries): boundaries.append((7, i))
        elif 'LXIII-A-11' in up:
            if not any(b[0] == 8 for b in boundaries): boundaries.append((8, i))
        elif 'LX-352' in up or 'LX -352' in up or '9)' in p or '9 )' in p or '9.' in p:
            if not any(b[0] == 9 for b in boundaries): boundaries.append((9, i))
            
    boundaries.sort(key=lambda x: x[0])
    items = []
    for idx in range(len(boundaries)):
        start = boundaries[idx][1]
        end = boundaries[idx + 1][1] if idx + 1 < len(boundaries) else len(paras)
        chunk_paras = paras[start:end]
        clean_paras = []
        for p in chunk_paras:
            cp = clean_paragraph(p)
            if cp:
                clean_paras.append(cp)
        items.append('\n\n'.join(clean_paras).strip())
    return items

def main():
    result = {}
    files = sorted(glob.glob(os.path.join(source_dir, '*.docx')))
    for fp in files:
        name = os.path.basename(fp)
        lang = detect_lang(name)
        if not lang or lang == 'marathi':
            # Marathi is left alone
            continue
        with zipfile.ZipFile(fp) as z:
            xml = z.read('word/document.xml')
        x = ET.fromstring(xml)
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        paras = []
        for p in x.findall('.//w:p', ns):
            txt = ''.join((t.text or '') for t in p.findall('.//w:t', ns)).strip()
            if txt:
                paras.append(' '.join(txt.split()))
        items = extract_items_for_lang(paras)
        result[lang] = items

    print(json.dumps(result, ensure_ascii=False))

if __name__ == '__main__':
    main()
