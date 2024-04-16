import { getWeatherToday } from "../services/api.service.js"
import { Storage } from "../services/storage.service.js";
import { WeatherResponse, CityList, City } from "../tools/response/response.js";
import { ServerError } from "../tools/error/response.error.js";

//Без try catch ошибки не отлавливаются обработчиком ошибок

async function getWeatherWithQueryParam(req, res, next) {
    const city = req.query.city;

    if (city) {
        try {
            const response = await getWeatherToday(req.query.city, await Storage.getValue('token'));
    
            const cities = new CityList()
                .push(new City(response.name, response.weather[0].description, response.main.temp))
    
            res.send(new WeatherResponse('Success', 200, cities));
            return;

        } catch(err) {
            next(err)
        }
    }
    next()
}


async function getWeather(req, res, next) {
    
    try {
        const [city, token] = [await Storage.getValue('city'), await Storage.getValue('token')];

        const responseArray = await Promise.all(city.map(c => getWeatherToday(c, token)))
    
        const citiesArray = responseArray.map(city => {
            return new City(city.name, city.weather[0].description, city.main.temp)
        })
        
        res.send(new WeatherResponse('Success', 200, citiesArray));

    } catch(err) {
        next(err)
    }
}


async function setSettingsMiddleware(req, res, next) {
    try {
        if (!req.query.city && !req.query.token) {
            throw new ServerError('No set arguments or these was set wrong', 404)
        }
    } catch(err) {
        next(err)
    }
    
    next()
}

async function setSettings(req, res, next) {

    for (const [key, value] of Object.entries(req.query)) {
        Storage.save(key, value)
    }

    res.send(new WeatherResponse('Success', 200));
}

async function deleteWeather(req, res, next) {
    try {
        await Storage.reset();
    } catch (err) {
        next(err)
    }

    res.send(new WeatherResponse('Success', 200))
}


export {getWeather, setSettings, deleteWeather, getWeatherWithQueryParam, setSettingsMiddleware}