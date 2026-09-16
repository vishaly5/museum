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
        ],
        telugu: [
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_L-74 Candle Stand_Female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_Acc_No_L-78 Lamp_Female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_Telugu_LII-682 Candle Stick Stand_female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_LXVII- 147 Chandelier_Female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_LXXIV-74 Lamp_Female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_LXXIV-83 Lamp_Female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_LXXIV-101 Lamp_Female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_MS- 3372 Lamp_female.wav",
            "Telugu/3. Lamps & Chandelier Gallery/Telugu_XLV-122 Chandelier_Female.wav"
        ],
        urdu: [
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No L-74 Candle Stand.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No  L-78 Lamp.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No LII-682 Candle Stick Stand.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No LXVII- 147 Chandelier.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No LXXIV-74 Lamp.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No LXXIV-83 Lamp.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No LXXIV-101 Lamp.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No MS- 3372 Lamp.wav",
            "Urdu_3. Lamps & Chandelier Gallery.ur/Acc. No XLV-122 Chandelier.wav"
        ],
        marathi: [
            "Lamps & Chandelier Gallery/Acc. No L-74 Candle Stand.wav",
            "Lamps & Chandelier Gallery/Acc. No  L-78 Lamp.wav",
            "Lamps & Chandelier Gallery/Acc. No LII-682 Candle Stick Stand.wav",
            "Lamps & Chandelier Gallery/Acc. No LXVII- 147 Chandelier.wav",
            "Lamps & Chandelier Gallery/Acc. No LXXIV-74 Lamp.wav",
            "Lamps & Chandelier Gallery/Acc. No LXXIV-83 Lamp.wav",
            null,
            "Lamps & Chandelier Gallery/Acc. No MS- 3372 Lamp.wav",
            "Lamps & Chandelier Gallery/Acc. No XLV-122 Chandelier.wav"
        ]
    };

    function encodePath(path) {
        return path.split("/").map(function (part) {
            return encodeURIComponent(part);
        }).join("/");
    }

    function splitContent(text) {
        text = String(text || "")
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .trim();

        if (!text) {
            return {
                title: "",
                description: ""
            };
        }

        // First line is ALWAYS the title.
        const lines = text.split("\n");
        const title = (lines.shift() || "").trim();

        // Everything after the first line is description.
        const description = lines.join("\n")
            .replace(/^\s*\/\s*$/gm, "")
            .replace(/\n{3,}/g, "\n\n")
            .trim();

        return {
            title: title,
            description: description
        };
    }

    function getLanguage() {
        const selector = document.getElementById("languageSelector");

        if (selector && audioFiles[selector.value]) {
            return selector.value;
        }

        return "bengali";
    }

    function renderGallery() {
        const gallery = document.getElementById("galleryGrid");

        if (!gallery) {
            console.error("galleryGrid not found.");
            return;
        }

        const language = getLanguage();

        if (!window.lampsContent || !window.lampsContent[language]) {
            console.error("Content not found for:", language);
            return;
        }

        gallery.innerHTML = "";

        for (let i = 0; i < 9; i++) {

            const rawContent = window.lampsContent[language][i] || "";
            const content = splitContent(rawContent);

            const card = document.createElement("article");
            card.className = "item-card";

            const image = document.createElement("img");
            image.className = "item-image";
            image.src = "./images/" + encodePath(imageFiles[i]);
            image.alt = content.title || ("Gallery item " + (i + 1));

            const body = document.createElement("div");
            body.className = "item-body";

            const title = document.createElement("h2");
            title.className = "item-title";
            title.textContent = content.title;

            const description = document.createElement("p");
            description.className = "item-description";
            description.textContent = content.description;

            const audio = document.createElement("audio");
            audio.className = "item-audio";
            audio.controls = true;
            audio.preload = "none";

            const audioPath = audioFiles[language][i];

            if (audioPath) {
                audio.src = "./audios/" + encodePath(audioPath);
            }

            body.appendChild(title);
            body.appendChild(description);
            body.appendChild(audio);

            card.appendChild(image);
            card.appendChild(body);

            gallery.appendChild(card);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {

        renderGallery();

        const selector = document.getElementById("languageSelector");

        if (selector) {
            selector.addEventListener("change", function () {
                renderGallery();
            });
        }
    });

    window.renderLampsGallery = renderGallery;

})();
