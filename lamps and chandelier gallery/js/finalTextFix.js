(function () {
    "use strict";

    function cleanText(value) {
        return String(value || "")
            .replace(/\\r\\n/g, "\n")
            .replace(/\\n/g, "\n")
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .trim();
    }

    function splitContent(value) {

        const text = cleanText(value);

        if (!text) {
            return {
                title: "",
                description: ""
            };
        }

        const firstLineEnd = text.indexOf("\n");

        if (firstLineEnd === -1) {
            return {
                title: text,
                description: ""
            };
        }

        const title = text
            .substring(0, firstLineEnd)
            .trim();

        const description = text
            .substring(firstLineEnd + 1)
            .replace(/^\s*\/\s*$/gm, "")
            .replace(/\n\s*\/\s*/g, "\n")
            .replace(/\n{3,}/g, "\n\n")
            .trim();

        return {
            title: title,
            description: description
        };
    }

    function getLanguage() {

        const selector =
            document.getElementById("languageSelector");

        if (
            selector &&
            window.lampsContent &&
            window.lampsContent[selector.value]
        ) {
            return selector.value;
        }

        return "bengali";
    }

    function fixCards() {

        const gallery =
            document.getElementById("galleryGrid");

        if (!gallery || !window.lampsContent) {
            return;
        }

        const language = getLanguage();
        const data = window.lampsContent[language];

        if (!data || !Array.isArray(data)) {
            return;
        }

        const cards =
            gallery.querySelectorAll(".item-card");

        cards.forEach(function (card, index) {

            if (!data[index]) {
                return;
            }

            const parts = splitContent(data[index]);

            const body =
                card.querySelector(".item-body") || card;

            /*
             * Remove EVERY old text element that may contain
             * the description in bold.
             */
            body.querySelectorAll(
                ".item-number, .item-label, .item-title, " +
                ".item-description, h2, h3, p"
            ).forEach(function (el) {
                el.remove();
            });

            /*
             * TITLE
             */
            const title =
                document.createElement("div");

            title.className = "item-title";
            title.textContent = parts.title;

            title.style.setProperty(
                "font-family",
                "Arial, 'Noto Sans', sans-serif",
                "important"
            );

            title.style.setProperty(
                "font-size",
                "21px",
                "important"
            );

            title.style.setProperty(
                "font-weight",
                "700",
                "important"
            );

            title.style.setProperty(
                "font-style",
                "normal",
                "important"
            );

            title.style.setProperty(
                "line-height",
                "1.4",
                "important"
            );

            title.style.setProperty(
                "color",
                "#222",
                "important"
            );

            title.style.setProperty(
                "display",
                "block",
                "important"
            );

            title.style.setProperty(
                "margin",
                "0 0 14px 0",
                "important"
            );

            /*
             * DESCRIPTION
             */
            const description =
                document.createElement("div");

            description.className =
                "item-description";

            description.textContent =
                parts.description;

            /*
             * IMPORTANT:
             * Force normal font directly on the element.
             */
            description.style.setProperty(
                "font-family",
                "Arial, 'Noto Sans', sans-serif",
                "important"
            );

            description.style.setProperty(
                "font-size",
                "15px",
                "important"
            );

            description.style.setProperty(
                "font-weight",
                "400",
                "important"
            );

            description.style.setProperty(
                "font-style",
                "normal",
                "important"
            );

            description.style.setProperty(
                "line-height",
                "1.65",
                "important"
            );

            description.style.setProperty(
                "color",
                "#444",
                "important"
            );

            description.style.setProperty(
                "display",
                "block",
                "important"
            );

            description.style.setProperty(
                "margin",
                "0 0 18px 0",
                "important"
            );

            description.style.setProperty(
                "padding",
                "0",
                "important"
            );

            description.style.setProperty(
                "text-decoration",
                "none",
                "important"
            );

            /*
             * Insert title and normal description
             * before the audio element.
             */
            const audio =
                body.querySelector("audio");

            if (audio) {

                body.insertBefore(
                    title,
                    audio
                );

                body.insertBefore(
                    description,
                    audio
                );

            } else {

                body.appendChild(title);
                body.appendChild(description);
            }

            /*
             * Make sure the BODY itself does not force
             * everything to bold.
             */
            body.style.setProperty(
                "font-weight",
                "400",
                "important"
            );

            /*
             * But title stays bold.
             */
            title.style.setProperty(
                "font-weight",
                "700",
                "important"
            );

            /*
             * Description stays normal.
             */
            description.style.setProperty(
                "font-weight",
                "400",
                "important"
            );
        });
    }

    /*
     * The existing gallery script can rebuild cards.
     * Therefore check after it renders and after
     * language changes.
     */
    function run() {

        fixCards();

        setTimeout(fixCards, 100);
        setTimeout(fixCards, 300);
        setTimeout(fixCards, 700);
        setTimeout(fixCards, 1200);
    }

    document.addEventListener(
        "DOMContentLoaded",
        run
    );

    document.addEventListener(
        "change",
        function (event) {

            if (
                event.target &&
                event.target.id === "languageSelector"
            ) {
                run();
            }
        }
    );

    /*
     * Keep watching for the existing renderer
     * rebuilding the cards.
     */
    const observer =
        new MutationObserver(function () {
            fixCards();
        });

    function startObserver() {

        const gallery =
            document.getElementById("galleryGrid");

        if (!gallery) {
            setTimeout(startObserver, 300);
            return;
        }

        observer.observe(
            gallery,
            {
                childList: true,
                subtree: true
            }
        );

        fixCards();
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startObserver
        );
    } else {
        startObserver();
    }

    window.finalLampsTextFix = fixCards;

})();
