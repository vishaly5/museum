import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\009\.gemini\antigravity-ide\brain\01b612b0-8087-4de0-b419-a2c1262934c4\scratch\parsed_docxs.json', 'r', encoding='utf-8') as f:
    parsed_data = json.load(f)

# Bengali:
bengali_key = [k for k in parsed_data if 'Bengali' in k][0]
bengali_paras = parsed_data[bengali_key]

bengali_items = [
    {
        "image": "images/logo.png",
        "badge": "ওয়াকিং স্টিক গ্যালারি",
        "title": "1. ওয়াকিং স্টিক গ্যালারি",
        "desc": "\n\n".join(bengali_paras[1:12]),
        "audioSrc": "Audios/Bengali/Remaining gallaries/WALKING STICKS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "মুদ্রা গ্যালারি",
        "title": "2. মুদ্রা গ্যালারি",
        "desc": "\n\n".join(bengali_paras[13:25]),
        "audioSrc": "Audios/Bengali/Remaining gallaries/COINS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "হাতির দাঁতের গ্যালারি",
        "title": "3. হাতির দাঁতের গ্যালারি",
        "desc": "\n\n".join(bengali_paras[26:40]),
        "audioSrc": "Audios/Bengali/Remaining gallaries/IVORY GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "অ্যাকসেশন নং: XLIX-1028",
        "title": "4. হাতির দাঁতের চেয়ার",
        "desc": "\n\n".join(bengali_paras[43:48]),
        "audioSrc": "Audios/Bengali/Remaining gallaries/IVORY CHAIR.wav"
    }
]

# Kannada:
kannada_key = [k for k in parsed_data if 'Kannada' in k][0]
kannada_paras = parsed_data[kannada_key]

kannada_items = [
    {
        "image": "images/logo.png",
        "badge": "ಊರುಗೋಲುಗಳ ಗ್ಯಾಲರಿ",
        "title": "1. ಊರುಗೋಲುಗಳ ಗ್ಯಾಲರಿ",
        "desc": "\n\n".join(kannada_paras[1:6]),
        "audioSrc": "Audios/kannada/REMAINING GALLERYS/WALKING STICKS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "ನಾಣ್ಯಗಳ ಗ್ಯಾಲರಿ",
        "title": "2. ನಾಣ್ಯಗಳ ಗ್ಯಾಲರಿ",
        "desc": "\n\n".join(kannada_paras[7:14]),
        "audioSrc": "Audios/kannada/REMAINING GALLERYS/COINS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "ದಂತ ಗ್ಯಾಲರಿ",
        "title": "3. ದಂತ ಗ್ಯಾಲರಿ",
        "desc": "\n\n".join(kannada_paras[15:20]),
        "audioSrc": "Audios/kannada/REMAINING GALLERYS/IVORY GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "ACCESSION No XLIX-1028",
        "title": "4. ದಂತದ ಕುರ್ಚಿ",
        "desc": "\n\n".join(kannada_paras[24:27]),
        "audioSrc": "Audios/kannada/REMAINING GALLERYS/IVORY CHAIR.wav"
    }
]

# Marathi:
marathi_key = [k for k in parsed_data if 'Marathi' in k][0]
marathi_paras = parsed_data[marathi_key]

marathi_items = [
    {
        "image": "images/logo.png",
        "badge": "चालण्याच्या काठ्यांची गॅलरी",
        "title": "1. चालण्याच्या काठ्यांची गॅलरी",
        "desc": "\n\n".join(marathi_paras[1:6]),
        "audioSrc": "Audios/marathi/Remaining gallaries/WALKING STICKS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "नाण्यांची गॅलरी",
        "title": "2. नाण्यांची गॅलरी",
        "desc": "\n\n".join(marathi_paras[7:14]),
        "audioSrc": "Audios/marathi/Remaining gallaries/COINS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "हस्तिदंताची गॅलरी",
        "title": "3. हस्तिदंताची गॅलरी",
        "desc": "\n\n".join(marathi_paras[15:20]),
        "audioSrc": "Audios/marathi/Remaining gallaries/IVORY GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "ॲक्सेशन क्र. XLIX-1028",
        "title": "4. हस्तिदंताची खुर्ची",
        "desc": "\n\n".join(marathi_paras[24:27]),
        "audioSrc": "Audios/marathi/Remaining gallaries/IVORY CHAIR.wav"
    }
]

# Urdu:
urdu_key = [k for k in parsed_data if 'Urdu' in k][0]
urdu_paras = parsed_data[urdu_key]

urdu_items = [
    {
        "image": "images/logo.png",
        "badge": "چھڑیوں کی نمائش",
        "title": "1. چھڑیوں کی نمائش",
        "desc": "\n\n".join(urdu_paras[1:6]),
        "audioSrc": "Audios/Urdu/Urdu_remaining gallaries.ur-IN/WALKING STICKS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "سکّوں کی نمائش",
        "title": "2. سکّوں کی نمائش",
        "desc": "\n\n".join(urdu_paras[7:14]),
        "audioSrc": "Audios/Urdu/Urdu_remaining gallaries.ur-IN/COINS GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "ہاتھی دانت کی نمائش",
        "title": "3. ہاتھی دانت کی نمائش",
        "desc": "\n\n".join(urdu_paras[15:21]),
        "audioSrc": "Audios/Urdu/Urdu_remaining gallaries.ur-IN/IVORY GALLERY.wav"
    },
    {
        "image": "images/logo.png",
        "badge": "اندراج نمبر :XLIX-1028",
        "title": "4. ہاتھی دانت کی کرسی",
        "desc": "\n\n".join(urdu_paras[25:28]),
        "audioSrc": "Audios/Urdu/Urdu_remaining gallaries.ur-IN/IVORY CHAIR.wav"
    }
]

structured_gallery_items = {
    "bengali": bengali_items,
    "kannada": kannada_items,
    "marathi": marathi_items,
    "urdu": urdu_items
}

with open(r'c:\Users\009\Desktop\Anuvadini_Projects\museum\museum\scratch\remaining_gallery_items.json', 'w', encoding='utf-8') as out_f:
    json.dump(structured_gallery_items, out_f, ensure_ascii=False, indent=2)

print("Updated remaining_gallery_items.json cleanly!")
