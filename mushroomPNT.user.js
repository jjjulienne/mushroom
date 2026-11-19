// ==UserScript==
// @name         Грибы | ПНТ
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  подстветка травящих грибов
// @author       jj
// @match        http*://*.catwar.net/cw3/
// @match        http*://*.catwar.su/cw3/
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUUkbYOyYNGbESfEPxyD3cf8TfJJtsoVow_RMTVquuQ&s==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const replacements = {
        '11150': 'https://i.postimg.cc/Y0bb2Lfm/11150.png',
        '11169': 'https://i.postimg.cc/Wpn9wxRn/11169.png',
        '17970': 'https://i.postimg.cc/Y0bb2Lfg/11170.png',
        '11171': 'https://i.postimg.cc/Pf46Q0Gy/11171.png',
        '11172': 'https://i.postimg.cc/DfgCPRV5/11172.png',
        '11173': 'https://i.postimg.cc/zDjdF4mx/11173.png',
        '11174': 'https://i.postimg.cc/593PSDcP/11174.png',
        '11175': 'https://i.postimg.cc/XN82ktMH/11175.png',
        '11176': 'https://i.postimg.cc/CMNvs9yQ/11176.png',
        '11177': 'https://i.postimg.cc/gcDMH191/11177.png',
        '17969': 'https://i.postimg.cc/jqX84BVm/ZABA.png',
        '11170': 'https://i.postimg.cc/65VvD4Lj/11170-R.png',

    };

    function getReplacement(url) {
        const match = url.match(/things\/(\d+)\.png(?:[?#]|$)/i);

        if (!match) return null;

        return replacements[match[1]] || null;
    }

    function replaceImages() {
        document.querySelectorAll('img[src]').forEach(img => {
            const replacement = getReplacement(img.getAttribute('src') || '');

            if (replacement) {
                img.src = replacement;
            }
        });
    }

    function replaceBackgrounds() {
        document.querySelectorAll('.cage, .cage_items').forEach(cell => {
            const background = cell.style.backgroundImage;

            if (!background) return;

            const newBackground = background.replace(
                /url\((["']?)([^"')]+)\1\)/gi,
                (original, quote, url) => {
                    const replacement = getReplacement(url);

                    return replacement
                        ? `url("${replacement}")`
                        : original;
                }
            );

            if (newBackground !== background) {
                cell.style.backgroundImage = newBackground;
            }
        });
    }

    function update() {
        replaceImages();
        replaceBackgrounds();
    }

    update();

    const observer = new MutationObserver(update);

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'style']
    });

})();
