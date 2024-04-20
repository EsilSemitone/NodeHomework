var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { readFile, access, writeFile, rm } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { ConfigFileWorker } from './configFile.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
export class Storage {
    static isFileExist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield access(this.filePath);
                return true;
            }
            catch (_b) {
                return false;
            }
        });
    }
    static readConfigFile() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(String(yield readFile(this.filePath)));
        });
    }
    static save(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isFileExist())) {
                yield writeFile(this.filePath, '{}');
            }
            const file = yield this.readConfigFile();
            const configFileWorker = new ConfigFileWorker(file);
            configFileWorker.save(key, value);
            yield writeFile(this.filePath, JSON.stringify(configFileWorker));
        });
    }
    static getValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isFileExist())) {
                yield writeFile(this.filePath, '{}');
                throw new Error(`${key} value is not set`);
            }
            const file = yield this.readConfigFile();
            if (!file[key]) {
                throw new Error(`${key} value is not set`);
            }
            return file[key];
        });
    }
    static reset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield rm(this.filePath);
        });
    }
}
_a = Storage;
Storage.fileDataName = 'weather-cli-data.json';
Storage.filePath = join(__dirname, '..', '..', 'storage', _a.fileDataName);
