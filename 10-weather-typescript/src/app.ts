import express from 'express';
import type { Response, Request, ErrorRequestHandler, NextFunction } from 'express';

import { weatherRout } from './routs/weather.js';
import { ErrorResponse } from './response/response.js';
import { MyServerError } from './tools/error/response.error.js';

const PORT = 80;

function main() {
    const app = express();

    app.use('/weather', weatherRout, errorHandler);
 
    async function errorHandler(err: MyServerError, req: Request, res: Response, next: NextFunction) {
        console.log('ОШИБКА')
        res.send(new ErrorResponse(err?.message, err?.statusCode || 404));
    }
    //ErrorRequestHandler | Error | 

    app.listen(PORT, () => {
        console.log('Сервер успешно запущен');
    })
}

main();