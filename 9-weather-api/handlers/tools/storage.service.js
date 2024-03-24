import { promises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Storage {
    static fileDataName = 'weather-cli-data.json';
    static filePath = join(__dirname, '..', '..', 'assets', this.fileDataName);

    static async getToken() {
        return await this.getValue('token')
    }

    static async getCity() {
        return await this.getValue('city')
    }

    static async isFileExist() {
        try{
            await promises.access(this.filePath);
            return true;
        } 
        catch {
            return false;
        }
    }
    
    static async readFile() {
        return await promises.readFile(this.filePath);
    }

    static async saveKeyValue(key, value) {
        let data = {};
    
        if (!await this.isFileExist()) {
            if (key === 'city') data[key] = [value];
            else data[key] = value;  
            await promises.writeFile(this.filePath, JSON.stringify(data));
        }
        else {
            data = await this.readFile();

            try {
                data = JSON.parse(data);

                if (key === 'city') {
                    if (data.city) {
                        if (!data.city.includes(value)) data.city.push(value); 
                    }
                    else {
                        data.city = [value];
                    };
                }
                else data[key] = value;
                
                await promises.writeFile(this.filePath, JSON.stringify(data));
            }
            catch(e) {
                const obj = {};
                if (key === 'city') obj[key] = [value];
                else obj[key] = value; 
                await promises.writeFile(this.filePath, JSON.stringify(obj));
            }
        }
    }
    
    static async getValue(key) {
        if (await this.isFileExist()) {
            try {
                let data = await this.readFile();
                data = JSON.parse(data);
                return data[key];
            }
            catch(e) {
                throw new Error(e.message)
            }
        }
        throw new Error("Setting file missing -help")
    }

    static async reset() {
        try {
            await promises.rm(this.filePath);
        }
        catch(e) {
            throw new Error(e.message)
        }
    }
}