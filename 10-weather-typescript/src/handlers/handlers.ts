import type { Response, Request, NextFunction } from 'express';

import { getWeatherToday } from "../services/apiOpenWeather/api.service.js"
import { Storage } from "../services/storage/storage.service.js";
import { WeatherResponse } from "../response/response.js";
import { MyServerError } from "../tools/error/response.error.js";
import { CityList, City} from "../services/storage/cityList.js";

async function getWeatherWithQueryParam(req: Request, res: Response, next: NextFunction): Promise<void> {
    const city = req.query.city;

    if (typeof city === 'string') {
        try {
            const response = await getWeatherToday(city, await Storage.getValue('token') as string);
    
            const cities = new CityList()
                .push(new City(response.name, response.weather[0].description, response.main.temp))
    
            res.send(new WeatherResponse('Success', 200, cities.getCities()));
            return;

        } catch(err) {
            next(err)
        }
    }
    next()
}


async function getWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
    
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

async function setSettingsMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!req.query.city && !req.query.token) {
            throw new MyServerError('No set arguments or these was set wrong', 404)
        }
    } catch(err) {
        next(err)
    }
    
    next()
}

async function setSettings(req: Request, res: Response, next: NextFunction): Promise<void> {

    for (const [key, value] of Object.entries(req.query)) {
        Storage.save(key, value as string)
    }

    res.send(new WeatherResponse('Success', 200));
}

async function deleteWeather(req: Request, res: Response, next: NextFunction) {
    try {
        await Storage.reset();
    } catch (err) {
        next(err)
    }

    res.send(new WeatherResponse('Success', 200))
}


export {getWeather, setSettings, deleteWeather, getWeatherWithQueryParam, setSettingsMiddleware}