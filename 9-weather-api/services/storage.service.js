import { readFile, access, writeFile, rm } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));


class ConfigFile {
    city = [];
    token;

    constructor(file) {
        Object.assign(this, file)
    }

    saveCity(city) {
        if (!this.city.includes(city)) {
            this.city.push(city)
        }
    }

    save(key, value) {
        if (key === 'city') {
            this.saveCity(value);
            return;
        }
        this[key] = value
    }  
}

export class Storage {
    static fileDataName = 'weather-cli-data.json';
    static filePath = join(__dirname, '..', 'assets', this.fileDataName);

    static async isFileExist() {
        try{
            await access(this.filePath);
            return true;
        } 
        catch {
            return false;
        }
    }
    
    static async readConfigFile() {
        return JSON.parse(await readFile(this.filePath));
    }

    static async save(key, value) {
    
        if (!await this.isFileExist()) {
            await writeFile(this.filePath, '{}');
        }

        const file = await this.readConfigFile();
        const configFile = new ConfigFile(file);

        configFile.save(key, value);

        await writeFile(this.filePath, JSON.stringify(configFile))
    }
    
    static async getValue(key) {
        if (!await this.isFileExist()) {
            await writeFile(this.filePath, '{}');
            throw new Error(`${key} value is not set`)
        }

        const file = await this.readConfigFile();

        if (!file[key]) {
            throw new Error(`${key} value is not set`)
        }

        return file[key] 
    }

    static async assertParam(param) {
        await Storage.getValue(param);
    }

    static async reset() {
        await rm(this.filePath);
    }
}