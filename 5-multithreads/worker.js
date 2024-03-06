import {parentPort, workerData} from 'worker_threads';

function findNumbers({arr}) {
    performance.mark('startWork');
    let count = 0;

    arr.forEach(el => {
        if (el % 3 === 0) {
            count++
        }
    });
    performance.mark('endWork');
    const {startTime, duration} = performance.measure('worker', 'startWork', 'endWork')
    console.log(`worker -> start: ${startTime}  duration: ${duration}`)
    return count
}

parentPort.postMessage(findNumbers(workerData));