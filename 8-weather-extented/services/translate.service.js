import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { Storage } from './storage.service.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

class Translate {
    constructor(language_pack) {
        this.language_pack = language_pack;
    }

    static async bild() {
        try {
            const file = await promises.readFile(join(__dirname, '..', 'assets', 'language-pack.json'));
            return new Translate(JSON.parse(file));
        }
        catch(e) {
            throw new Error(e)
        }
    }

    async getPhrase(theme, phrase) {
        const lang = await Storage.getValue('lang');
        if (!lang || lang === "en") {
            return this.language_pack.en[theme][phrase];
        }
        return this.language_pack.ru[theme][phrase];
    }
}

export const translate = await Translate.bild();
