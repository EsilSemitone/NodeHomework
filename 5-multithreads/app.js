import {Worker} from 'worker_threads';
import { PerformanceObserver } from 'perf_hooks';

const myPerformance = new PerformanceObserver((item) => {
    for (let i of item.getEntriesByType('measure')) {
        console.log(`${i.name} ->  start: ${i.startTime}  duration: ${i.duration}`)
    }
})

myPerformance.observe({entryTypes: ['measure']})

const arr = createArray();
let count = 0;
const cores = 4;

function createArray() {
    const result = [];
    for (let i = 1; i < 300000; i++) {
        result.push(i)
    }
    return result;
}

function syncFindNumbers(arr) {
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

async function asyncFindNumbers(arr, cores) {
    performance.mark('asyncStart');

    const workArrays = [];
    const arrayStep = Math.ceil(arr.length / cores);
    
    for (let i = 0; i < arr.length; i += arrayStep) {
        workArrays.push(arr.slice(i, i + arrayStep));
    }

    const result = await Promise.all([
        ...workArrays.map(array => workFindNumbers(array)),
    ])

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

console.log(`sync ->  ${syncFindNumbers(arr)}`);
console.log(`async ->  ${await asyncFindNumbers(arr, cores)}`);