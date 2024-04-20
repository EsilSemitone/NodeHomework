interface IConfigFile {
    city: string[];
    token: string;
    [key: string]: any;
}

interface IConfigFileWorker {
    [key: string]: any;
    save(key: string, value: any): void
}

class ConfigFileWorker implements IConfigFileWorker {
    city: string[] = [];
    token: string | undefined;

    constructor(file: IConfigFile) {
        Object.assign(this, file)
    }

    saveCity(city: string): void {
        if (!this.city.includes(city)) {
            this.city.push(city)
        }
    }

    save(key: string, value: string) {
        if (key === 'city') {
            this.saveCity(value);
            return;
        }
        (this as IConfigFileWorker)[key] = value;
    }  
}

export {IConfigFile, IConfigFileWorker, ConfigFileWorker}