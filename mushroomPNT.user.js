// ==UserScript==
// @name         Грибы | ПНТ
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  подстветка травящих грибов
// @author       jj
// @match        http*://*.catwar.net/cw3/
// @match        http*://*.catwar.su/cw3/
// @updateURL    https://github.com/jjjulienne/mushroom/raw/refs/heads/main/mushroomPNT.user.js
// @downloadURL  https://github.com/jjjulienne/mushroom/raw/refs/heads/main/mushroomPNT.user.js
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNUUkbYOyYNGbESfEPxyD3cf8TfJJtsoVow_RMTVquuQ&s==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const replacements = {
        '11150': 'https://i.postimg.cc/hj3cmbmm/11150.png',
        '11169': 'https://i.postimg.cc/wvbgNcNL/11169.png',
        '17970': 'https://i.postimg.cc/j2wK4w6J/17970.png',
        '11171': 'https://i.postimg.cc/ydrsRXRm/11171.png',
        '11172': 'https://i.postimg.cc/DwD0Vh0J/11172.png',
        '11173': 'https://i.postimg.cc/vBSbnLn7/11173.png',
        '11174': 'https://i.postimg.cc/fLgDdjdv/11174.png',
        '11175': 'https://i.postimg.cc/rmYM4C4J/11175.png',
        '11176': 'https://i.postimg.cc/C16S8H8H/11176.png',
        '11177': 'https://i.postimg.cc/pT1RjYjJ/11177.png',
        '17969': 'https://i.postimg.cc/jqX84BVm/ZABA.png',
        '11170': 'https://i.postimg.cc/d1SwCmC8/11170.png',

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
