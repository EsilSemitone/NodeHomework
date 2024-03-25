import axios from 'axios';

export async function* getWeatherToday(cityArray, token) {
    for (let city of cityArray) {
        try {
            const {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: token,
                    units: 'metric',
                    lang: 'en'
                }
            });
            yield data;
        }
        catch(e) {
            if (e?.response?.status == 404) {
                throw new Error("Incorrect city or token, please make sure to enter the data correctly")
            }
            else if (e?.response?.status == 401) {
                throw new Error(e)
            }
            else {
                throw new Error(e.message)
            }
        }
    }
}
