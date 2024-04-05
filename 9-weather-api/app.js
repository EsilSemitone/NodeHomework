import express from 'express';

import { weatherRout } from './routs/weather.js';
import { ErrorResponse } from './tools/response/response.js';

const PORT = 80;

function main() {
    const app = express();

    app.use('/weather', weatherRout);

    app.use('/weather', errorHandler)
 
    async function errorHandler(err, req, res, next) {
        console.log('ОШИБКА')
        res.send(new ErrorResponse(err.message, err.statusCode || 404));
    }

    app.listen(PORT, () => {
        console.log('Сервер успешно запущен');
    })
}

main();