var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios, { AxiosError } from '../../../node_modules/axios/index.js';
import { MyServerError } from '../../tools/error/response.error.js';
export function getWeatherToday(city, token) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const res = yield axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: token,
                    units: 'metric',
                    lang: 'en'
                }
            });
            return res.data;
        }
        catch (error) {
            if (error instanceof AxiosError) {
                throw new MyServerError("Error code", ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status) || 404);
            }
            throw new MyServerError("Unknown error", 500);
        }
    });
}
