class ConfigFileWorker {
    constructor(file) {
        this.city = [];
        Object.assign(this, file);
    }
    saveCity(city) {
        if (!this.city.includes(city)) {
            this.city.push(city);
        }
    }
    save(key, value) {
        if (key === 'city') {
            this.saveCity(value);
            return;
        }
        this[key] = value;
    }
}
export { ConfigFileWorker };
