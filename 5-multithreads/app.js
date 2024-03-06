import {Worker} from 'worker_threads';
import { PerformanceObserver } from 'perf_hooks';
import { cpus } from 'os';

const CORES = cpus().length;
const ARRAY_LENGTH = 300_000;

const myPerformance = new PerformanceObserver((item) => {

    for (let i of item.getEntriesByType('measure')) {
        console.log(`${i.name} ->  start: ${i.startTime}  duration: ${i.duration}`)
    }
})

//Если observe перенести в конец он перестает работать :)
myPerformance.observe({entryTypes: ['measure']})

function createArray() {
    const result = [];
    for (let i = 1; i < ARRAY_LENGTH; i++) {
        result.push(i)
    }
    return result;
}

function syncFindNumbers() {

    let count = 0;
    const arr = createArray();

    performance.mark('syncStart')
    arr.forEach(el => {
        if (el % 3 == 0) {
            count++
        }
    });
    performance.mark('syncEnd');
    performance.measure('syncCalculate', 'syncStart', 'syncEnd');
    return(count)
}

async function asyncFindNumbers() {
    
    const workArrays = createArrayForWorker(CORES);

    performance.mark('asyncStart');
    const result = await Promise.all(
        workArrays.map(array => workFindNumbers(array, './worker.js')),
    )
    
    performance.mark('asyncEnd');
    performance.measure('asyncCalculate', 'asyncStart', 'asyncEnd');
    
    return result.reduce((a, b) => a + b);
}

function workFindNumbers(arr) {
    return new Promise((resolve, reject) => {
        const myWorker = new Worker('./worker.js', {
            workerData: {
                arr
            }
        })
        
        myWorker.on('message', (msg) => {
            resolve(msg)
        })
        
        myWorker.on('error', (err) => {
            reject(err)
        })
    })
}

function createArrayForWorker(cores) {
    const arr = createArray();
    const workArrays = [];
    const arrayStep = Math.ceil(arr.length / cores);
    
    for (let i = 0; i < arr.length; i += arrayStep) {
        workArrays.push(arr.slice(i, i + arrayStep));
    }

    return workArrays;
}

console.log(`sync count numbers ->  ${syncFindNumbers()}`);
console.log(`async count numbers ->  ${await asyncFindNumbers()}`);