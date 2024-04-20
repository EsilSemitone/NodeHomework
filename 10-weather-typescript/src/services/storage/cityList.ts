interface ICityList {
    cities: ICity[];
    push(city: ICity): this | void;
    getCities(): ICity[]
}

interface ICity {
    city: string;
    description: string
    temp: number
}

class CityList implements ICityList {
    cities: ICity[] = [];

    constructor(cities?: ICity[]) {
        if (cities) {
            this.cities.concat(cities);
        }
    }

    push(city: ICity): this {
        this.cities.push(city);
        return this;
    }

    getCities(): ICity[] {
        return this.cities
    }

}

class City implements ICity {
    constructor(
        public city: string, 
        public description: string, 
        public temp: number
    ) {}
}

export {ICityList, ICity, CityList, City}