import express from 'express';

import { getWeather, setSettings, deleteWeather, getWeatherWithQueryParam, setSettingsMiddleware } from '../handlers/handlers.js';


const weatherRout = express.Router();

weatherRout.get('/', getWeatherWithQueryParam, getWeather);
weatherRout.post('/', setSettingsMiddleware, setSettings);
weatherRout.delete('/', deleteWeather)

export {weatherRout};
