(function () {
    "use strict";

    const imageFiles = [
        "lamps and chandelier gallery_item1.png",
        "lamps and chandelier gallery_item2.png",
        "lamps and chandelier gallery_item3.png",
        "lamps and chandelier gallery_item4.png",
        "lamps and chandelier gallery_item5.png",
        "lamps and chandelier gallery_item6.png",
        "lamps and chandelier gallery_item7.png",
        "lamps and chandelier gallery_item8.png",
        "lamps and chandelier gallery_item9.png"
    ];

    const audioFiles = {
        bengali: [
            "Bengali/3. lamps and chandelier gallery/Acc. No  L-78 Lamp.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No L-74 Candle Stand.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No LII-682 Candle Stick Stand.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No LXVII- 147 Chandelier.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No LXXIV-74 Lamp.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No LXXIV-83 Lamp.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No LXXIV-101 Lamp.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No MS- 3372 Lamp.wav",
            "Bengali/3. lamps and chandelier gallery/Acc. No XLV-122 Chandelier.wav"
        ],

        hindi: [
            "hindi/03. Audio-Lamps & Chandelier Gallery/1. मोमबत्ती स्टैंड.wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/2. लैंप (दीपक).wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/3. कैंडल स्टिक स्टैंड (मोमबत्तीदान).wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/4. झूमर.wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/5. दीपक.wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/6. लैंप.wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/7. दीपक.wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/8. दीपक.wav",
            "hindi/03. Audio-Lamps & Chandelier Gallery/9. झूमर.wav"
        ],

        kannada: [
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No L-74 Candle Stand.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No  L-78 Lamp.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No LII-682 Candle Stick Stand.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No LXVII- 147 Chandelier.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No LXXIV-74 Lamp.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No LXXIV-83.Lamp.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No LXXIV-101.Lamp.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No MS- 3372 Lamp.wav",
            "kannada/3.LAMP & CANDILEAR GALLERY/Acc. No XLV-122 Chandelier.wav"
        ],

        malayalam: [
            "Malayalam/Lamps & Chandelier Gallery/Candle Stand.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No  L-78 Lamp.wav",
            "Malayalam/Lamps & Chandelier Gallery/Candle Stick Stand.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No LXVII- 147 Chandelier.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No LXXIV-74 Lamp.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No LXXIV-83 Lamp.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No LXXIV-101 Lamp.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No MS- 3372 Lamp.wav",
            "Malayalam/Lamps & Chandelier Gallery/Acc. No XLV-122 Chandelier.wav"
        ],

        odia: [
            "Odia/3. Lamps & Candelier Gallery.or/1. Acc. No L-74 Candle Stand.wav",
            "Odia/3. Lamps & Candelier Gallery.or/2. Acc. No  L-78 Lamp.wav",
            "Odia/3. Lamps & Candelier Gallery.or/3. Acc. No LII-682 Candle Stick Stand.wav",
            "Odia/3. Lamps & Candelier Gallery.or/4. Acc. No LXVII- 147 Chandelier.wav",
            "Odia/3. Lamps & Candelier Gallery.or/5. Acc. No LXXIV-74 Lamp.wav",
            "Odia/3. Lamps & Candelier Gallery.or/6. Acc. No LXXIV-83 Lamp.wav",
            "Odia/3. Lamps & Candelier Gallery.or/7. Acc. No LXXIV-101 Lamp.wav",
            "Odia/3. Lamps & Candelier Gallery.or/8. Acc. No MS- 3372 Lamp.wav",
            "Odia/3. Lamps & Candelier Gallery.or/9. Acc. No XLV-122 Chandelier.wav"
        ],

        tamil: [
            "tamil/3. Lamps and Chandeliers Gallery/1. Candle Stand _ ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/2. Lamp _ ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/3. Candle Stick Stand _ ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/4.  Acc. No - 147 Chandelier _ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/5. Acc. No .74 Lamp _ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/6. 83 Lamp _ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/7 -101 Lamp_ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/8. 3372 Lamp _ta.wav",
            "tamil/3. Lamps and Chandeliers Gallery/9. 122 Chandelier _ ta.wav"
        ]
    };

    const languageNames = {
        bengali: "বাংলা (Bengali)",
        hindi: "हिन्दी (Hindi)",
        kannada: "ಕನ್ನಡ (Kannada)",
        malayalam: "മലയാളം (Malayalam)",
        odia: "ଓଡ଼ିଆ (Odia)",
        tamil: "தமிழ் (Tamil)"
    };

    function safeUrl(path) {
        return path.split("/").map(encodeURIComponent).join("/");
    }

    function getContent(lang, index) {
        if (!window.lampsContent || !window.lampsContent[lang]) {
            return "";
        }
        return window.lampsContent[lang][index] || "";
    }

    function getTitle(text) {
        return (text || "").split(/\r?\n/)[0].trim();
    }

    function getDescription(text) {
        const parts = (text || "").split(/\r?\n\r?\n/);
        return parts.slice(1).join("\n\n").trim();
    }

    function render() {
        const gallery = document.getElementById("galleryGrid");
        const selector = document.getElementById("languageSelector");

        if (!gallery) {
            console.error("galleryGrid not found");
            return;
        }

        let lang = selector ? selector.value : "bengali";

        if (!languageNames[lang]) {
            lang = "bengali";
            if (selector) selector.value = lang;
        }

        gallery.innerHTML = "";

        for (let i = 0; i < 9; i++) {
            const content = getContent(lang, i);
            const title = getTitle(content);
            const description = getDescription(content);

            const card = document.createElement("article");
            card.className = "item-card";

            const image = document.createElement("img");
            image.className = "item-image";
            image.src = "images/" + safeUrl(imageFiles[i]);
            image.alt = title || ("Item " + (i + 1));

            image.onerror = function () {
                console.error("IMAGE NOT FOUND:", image.src);
                this.style.display = "none";
            };

            const body = document.createElement("div");
            body.className = "item-body";

            const number = document.createElement("div");
            number.className = "item-number";
            number.textContent = "Item " + (i + 1);

            const heading = document.createElement("h2");
            heading.textContent = title;

            const desc = document.createElement("p");
            desc.textContent = description;

            const audio = document.createElement("audio");
            audio.controls = true;
            audio.preload = "none";
            audio.className = "item-audio";

            const audioPath = audioFiles[lang] && audioFiles[lang][i];

            if (audioPath) {
                audio.src = "audios/" + safeUrl(audioPath);
            }

            audio.onerror = function () {
                console.error("AUDIO NOT FOUND:", audio.src);
            };

            body.appendChild(number);
            body.appendChild(heading);
            body.appendChild(desc);
            body.appendChild(audio);

            card.appendChild(image);
            card.appendChild(body);
            gallery.appendChild(card);
        }
    }

    window.addEventListener("DOMContentLoaded", render);

    window.addEventListener("load", render);

    window.addEventListener("lampsLanguageChanged", render);

    window.renderLampsGallery = render;
})();
