import express from 'express';

import { weatherRout } from './routs/weather.js';

const PORT = 80;

function main() {
    const app = express();

    app.use('/weather', weatherRout);
 
    app.listen(PORT, () => {
        console.log('Сервер успешно запущен');
    })
}

main();