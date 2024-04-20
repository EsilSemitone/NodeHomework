import type {ICity} from "../services/storage/cityList.js";

type MyResponseTypes = 'error' | 'weather'
type MyResponse<T extends MyResponseTypes> = T extends 'error' ? ErrorResponse : WeatherResponse

interface IMyResponse {
    statusCode: number;
    message: string
}

class ErrorResponse implements IMyResponse {
    statusCode: number
    message: string

    constructor(message: string, statusCode: number) {
        this.statusCode = statusCode
        this.message = message;
    }
}

class WeatherResponse implements IMyResponse {
    statusCode: number;
    message: string;
    main: ICity[] = [];

    constructor(message: string, statusCode: number, cities?: ICity[]) {
        this.message = message;
        this.statusCode = statusCode;
        if (cities) {
            this.main = cities;
        }
    }
}

export {WeatherResponse, ErrorResponse, IMyResponse, MyResponse}