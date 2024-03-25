import axios from 'axios';

import { Storage } from './storage.service.js';
import { translate } from './translate.service.js';

export class ApiConnect {
    
    static token = '';
    static city = '';

    static async updateArgs() {
        try {
            this.token = await Storage.getValue('token');
            this.city = await Storage.getValue('city');
        }
        catch {
            throw new Error(await translate.getPhrase("other", "not_set_some_arg"))
        }
    }

    static async * getWeatherToday() {
        await this.updateArgs();
        const lang = await Storage.getValue('lang');
        for (let city of this.city) {
            try {
                const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                    params: {
                       q: city,
                       appid: this.token,
                       units: 'metric',
                       lang: lang || 'en'
                    }
                });
                yield data;
            }
            catch(e) {
                if (e?.response?.status == 404) {
                    throw new Error(await translate.getPhrase("token", "invalid_some_arg"))
                }
                else if (e?.response?.status == 401) {
                    throw new Error(await translate.getPhrase("token", "invalid_token"))
                }
                else {
                    throw new Error(e.message)
                }
            }
        }
    }
}