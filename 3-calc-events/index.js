import EventEmmiter from 'events'

import { add } from "./tools/add.js";
import { divide } from "./tools/divide.js";
import { mod } from "./tools/mod.js"
import { multiply } from "./tools/multiply.js";
import { subtract } from "./tools/subtract.js";

const numbers = process.argv.slice(2, -1);
const command = process.argv.slice(-1);

const myEmmiter = new EventEmmiter();

const operations = {
    add,
    divide,
    mod,
    multiply,
    subtract
}

myEmmiter.on(command, (args) => {
    //Правильно?
    console.log(operations[command](args)) 
})

function isValidNumbers(arr) {
    for (const el of arr) {
        if (isNaN(el)) return false;
    }
    return true;
}

function main() {
    if (numbers.length < 2) {
        throw new Error('Необходимо ввести 2 или более числа!');
    }
    if (!operations.hasOwnProperty(command)) {
        throw new Error('Операция не введена или введена неправильно!')
    }
    if (!isValidNumbers(numbers)) {
        throw new Error('Программа принимает только числа и команду');
    }
    myEmmiter.emit(command, numbers)
    
}

main();