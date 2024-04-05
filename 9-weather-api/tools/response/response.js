class MyResponse {
    constructor(statusCode) {
        this.statusCode = statusCode;
    }
}

class ErrorResponse extends MyResponse{
    constructor(errorMessage, statusCode) {
        super(statusCode);
        this.errorMessage = errorMessage;
    }
}

class WeatherResponse extends MyResponse {
    constructor(message, statusCode, cities = {}) {
        super(statusCode);
        this.message = message;
        this.main = cities
    }
}

class CityList {
    cities = [];

    constructor(cities = []) {
        this.cities.concat(cities);
    }

    push(city) {
        this.cities.push(city);
        return this;
    }

}

class City {
    constructor(city, description, temp) {
        this.city = city
        this.description = description
        this.temp = temp
    }
}

export {WeatherResponse, CityList, City, ErrorResponse}