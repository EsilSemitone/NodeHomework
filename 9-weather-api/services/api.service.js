import axios from 'axios';

import { ServerError } from '../tools/error/response.error.js';

export async function getWeatherToday(city, token) {
    try {
        const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                units: 'metric',
                lang: 'en'
            }
        });
        return data;
    }
    catch(e) {
        if (e?.response?.status == 404) {
            throw new ServerError("Incorrect city or token, please make sure to enter the data correctly", 404)
        }
        else {
            throw new ServerError(e.message, 404)
        }
    }
}
