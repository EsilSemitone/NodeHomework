import { getWeatherToday } from "./tools/api.service.js"
import { Storage } from "./tools/storage.service.js";

async function getWeather(req, res) {
    // Почему ошибки отловленные в этих функциях не попадают в роутер use?
    try {
        let data = {}
    
        if (Object.keys(req.query).length) {
    
            for await (let city of getWeatherToday([req.query.city], req.query.token)) {
                data[city.name] = {
                    description: city.weather[0].description,
                    temp: city.main.temp
                }
            }
            res.send(data)
        }
        else {
            let [city, token] = [await Storage.getCity(), await Storage.getToken()]
            if (!city || !token) throw new Error(`Not set city or token`)
        
            for await (let c of getWeatherToday(city, token)) {
    
                data[c.name] = {
                    description: c.weather[0].description,
                    temp: c.main.temp
                }
            }
            res.send(data)
        }
    }
    catch(e) {
        res.statusCode = 500;
        res.send({error: e.message})
    }
}

async function setSettings(req, res) {

    if (!Object.keys(req.query).length) {
        res.statusCode = 400;
        res.send({status: 'Arguments was not be handed'});
        return;
    }

    for await (let [key, value] of Object.entries(req.query)) {
        Storage.saveKeyValue(key, value);
    }

    res.send({status: "success"})
}

async function deleteWeather(req, res) {
    await Storage.reset();

    res.send({status: "success"})
}

export {getWeather, setSettings, deleteWeather}