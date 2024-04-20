import axios,  {AxiosError } from '../../../node_modules/axios/index.js';

import { IOpenWeatherResponse } from './response.interface.js';
import { MyServerError } from '../../tools/error/response.error.js';

export async function getWeatherToday(city: string, token: string): Promise<IOpenWeatherResponse> {
    try {
        const res = await axios.get<IOpenWeatherResponse>('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: token,
                units: 'metric',
                lang: 'en'
            }
        });
        return res.data 
    }
    catch(error) {
        if (error instanceof AxiosError) {
            throw new MyServerError("Error code", error?.response?.status || 404)
        }

        throw new MyServerError("Unknown error", 500)
    }
}
