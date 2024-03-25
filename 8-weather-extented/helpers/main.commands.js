import dedent from "dedent-js";

import { Log } from "../services/log.service.js"
import { Storage } from "../services/storage.service.js"
import { ApiConnect } from "../services/api.service.js"
import { translate } from "../services/translate.service.js";

const ARGS_NAMES = {
    token: 'token',
    city: 'city',
    lang: 'lang',
}

function getHelp() {
    Log.help()
}

async function setCity(city) {
    if (city === true) {
        Log.error(await translate.getPhrase("city", "city_not_handed"))
        return;
    }
    try {
        await Storage.saveKeyValue(ARGS_NAMES.city, city);
        Log.success(await translate.getPhrase("city", "city_is_handed"))
    }
    catch(e) {
        Log.error(e.message)
    }
}

async function setToken(token) {
    if (token === true) {
        Log.error(await translate.getPhrase("token", "token_not_handed"))
        return;
    }
    try {
        Storage.saveKeyValue(ARGS_NAMES.token , token);
        Log.success(await translate.getPhrase("token", "token_is_handed"))
    }
    catch(e) {
        Log.error(e.message)
    }
}

async function setLang(lang) {
    if (lang === true) {
        Log.error(await translate.getPhrase("lang", "lang_not_handed"))
        return;
    }
    try {
        Storage.saveKeyValue(ARGS_NAMES.lang , lang);
        Log.success(await translate.getPhrase("lang", "lang_is_handed"))
    }
    catch(e) {
        Log.error(e.message)
    }
}

async function resetConfigFile() {
    if (await Storage.isFileExist()) await Storage.reset();
    Log.success("setting was reset")
}

export const commands = {
    'h': getHelp,
    's': setCity,
    't': setToken,
    'r': resetConfigFile,
    'l': setLang
}

export async function getWeather() {
    try {
        for await (let res of ApiConnect.getWeatherToday()) {
            Log.success(dedent`${res.name} ${await translate.getPhrase("main", "outside")} ${res.weather[0].description}
            ${res.main.temp} ${await translate.getPhrase("main", "degrees")}`)
        }

    } catch (error) {
        Log.error(error.message)
    }
}