import NodeNotifier from 'node-notifier';

const {notify} = NodeNotifier;
const args = process.argv.slice(2).join('')
const search = /\d+([hms]|[HMS]|[чсм]|[ЧСМ]|([Hh]our)|([Mm]inute)|([Ss]econd)|([Чч]ас)|([Сс]екунд)|([Мм]инут))/g

const match = {
    hour: RegExp('\\d+([HhЧч]|([Hh]our)|([Чч]ас))', "g"),
    min: RegExp('\\d+([MmМм]|([Mm]inute)|([Мм]инут))', "g"),
    sec: RegExp('\\d+([SsСс]|([Ss]econd)|([Сс]екунд))', "g")
}

let totalTime = 0;
let hour = 0, min = 0, sec = 0;

function sumTime(h, m, s) {
    if (s > 60) {
        m += Math.floor(s / 60);
        s = s % 60
    }
    if (m > 60) {
        h += Math.floor(m / 60);
        m = m % 60
    }
    return {h, m, s};
}

function main() {
    const timeArgs = args.match(search)
    if (!timeArgs) {
        console.log(' Не правильно введены аргументы!');
        return;
    } 

    timeArgs.forEach(el => {

        if (el.match(match.hour)) {
            const count = Number.parseInt(el.match(match.hour))
            totalTime += count * 60 * 60 * 1000;
            hour = count
        }
        else if (el.match(match.min)) {
            const count = Number.parseInt(el.match(match.min))
            totalTime += count * 60 * 1000;
            min = count
        }
        else if (el.match(match.sec)) {
            const count = Number.parseInt(el.match(match.sec))
            totalTime += count * 1000;
            sec = count
        }
    });
    
    setTimeout(() => {
        notify({
            title: 'Таймер',
            message: `Время вышло!`,
            sound: true,
            wait: true
        })
    }, totalTime)
    
    const {h, m, s} = sumTime(hour, min, sec);

    console.log(`Установлен таймер на ${h} часов ${m} минут ${s} секунд`)
 }

 main()