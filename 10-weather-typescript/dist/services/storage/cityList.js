class CityList {
    constructor(cities) {
        this.cities = [];
        if (cities) {
            this.cities.concat(cities);
        }
    }
    push(city) {
        this.cities.push(city);
        return this;
    }
    getCities() {
        return this.cities;
    }
}
class City {
    constructor(city, description, temp) {
        this.city = city;
        this.description = description;
        this.temp = temp;
    }
}
export { CityList, City };
