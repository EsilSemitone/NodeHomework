import express from 'express';
import { getWeather, setSettings, deleteWeather, getWeatherWithQueryParam, setSettingsMiddleware } from '../handlers/handlers.js';
import { ErrorResponse } from '../tools/response/response.js';

const weatherRout = express.Router();

weatherRout.get('/', getWeatherWithQueryParam, getWeather);
weatherRout.post('/', setSettingsMiddleware, setSettings);
weatherRout.delete('/', deleteWeather)

weatherRout.use((err, req, res, next) => {
    res.send(new ErrorResponse(err.message, err.statusCode || 404));
})

export {weatherRout};
