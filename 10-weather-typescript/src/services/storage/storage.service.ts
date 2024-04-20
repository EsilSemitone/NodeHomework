import { readFile, access, writeFile, rm } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { IConfigFile, ConfigFileWorker } from './configFile.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Storage {
    static fileDataName: string = 'weather-cli-data.json';
    static filePath: string = join(__dirname, '..', '..', 'storage', this.fileDataName);

    static async isFileExist(): Promise<boolean> {
        try{
            await access(this.filePath);
            return true;
        } 
        catch {
            return false;
        }
    }
    

    static async readConfigFile(): Promise<IConfigFile> {
        return JSON.parse(String(await readFile(this.filePath))); 
    }


    static async save(key: string, value: string): Promise<void> {
    
        if (!await this.isFileExist()) {
            await writeFile(this.filePath, '{}');
        }

        const file = await this.readConfigFile();
        const configFileWorker = new ConfigFileWorker(file);

        configFileWorker.save(key, value);

        await writeFile(this.filePath, JSON.stringify(configFileWorker))
    }
    
    static async getValue<T extends keyof IConfigFile>(key: T): Promise<IConfigFile[T]> {
        if (!await this.isFileExist()) {
            await writeFile(this.filePath, '{}');
            throw new Error(`${key} value is not set`)
        }

        const file = await this.readConfigFile();

        if (!file[key]) {
            throw new Error(`${key} value is not set`)
        }

        return file[key];
    }

    static async reset(): Promise<void> {
        await rm(this.filePath);
    }
}
