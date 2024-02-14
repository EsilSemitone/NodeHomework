import { add } from "./tools/add.js";
import { divide } from "./tools/divide.js";
import { mod } from "./tools/mod.js"
import { multiply } from "./tools/multiply.js";
import { subtract } from "./tools/subtract.js";

const numbers = process.argv.slice(2, -1);
const command = process.argv.slice(-1);

const operations = {
    'add': add,
    'divide': divide,
    'mod': mod,
    'multiply': multiply,
    'subtract': subtract
}

function main() {
    if (numbers.length < 2) {
        console.log('Необходимо ввести 2 или более числа!');
        return;
    }
    if (!operations.hasOwnProperty(command)) {
        console.log('Операция не введена или введена неправильно!')
        return;
    }
    try {
        const result = operations[command](...numbers);

        if (isNaN(result)) {
            console.log('Программа принимает только числа и команду')
            return;
        }
        console.log(result)
    }
    catch(e) {
        console.log(e.message)
    }
    
}

main();


