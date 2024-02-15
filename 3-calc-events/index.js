import EventEmmiter from 'events'

import { add } from "./tools/add.js";
import { divide } from "./tools/divide.js";
import { mod } from "./tools/mod.js"
import { multiply } from "./tools/multiply.js";
import { subtract } from "./tools/subtract.js";

const numbers = process.argv.slice(2, -1);
const command = process.argv.slice(-1);

const myEmmiter = new EventEmmiter();

myEmmiter.on('calculation', (args, command) => {
    try {
        const res = operations[command](...args);
        if (isNaN(res)) {
            console.log('Программа принимает только числа и команду')
            return;
        }
        myEmmiter.emit('showResult', res) 
    } 
    catch(e) {
        myEmmiter.emit('showResult', e.message) 
    }
    
})

myEmmiter.on('showResult', res => console.log(res))


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
    myEmmiter.emit('calculation', numbers, command)
    
}

main();


