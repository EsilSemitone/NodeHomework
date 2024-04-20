export interface IOpenWeatherResponse {
    coord: IOWRCoord,
    weather: IOWRWeather[],
    base: string,
    main: IOWRMain,
    visibility: IOWRMain,
    wind: IOWRWind,
    clouds: { all: number },
    dt: number,
     sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
  },
    timezone: number,
    id: number,
    name: 'Moscow',
    cod: number
}

type IOWRCoord = {lon: number, lat: number};
type IOWRWeather = { id: number, main: string, description: string, icon: string };
type IOWRMain = {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
}
type IOWRWind = { speed: number, deg: number, gust: number};