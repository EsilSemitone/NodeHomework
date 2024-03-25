import express from 'express';
import { getWeather, setSettings, deleteWeather } from '../handlers/handlers.js';

const weatherRout = express.Router();

weatherRout.use((err, req, res, next) => {
    //Почему сюда не попадают ошибки из GET, POST и тд?
    res.send(err.message)
});

weatherRout.get('/', getWeather);
weatherRout.post('/', setSettings);
weatherRout.delete('/', deleteWeather)

export {weatherRout};
