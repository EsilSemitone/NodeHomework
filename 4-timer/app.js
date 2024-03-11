const args = process.argv.slice(2).join('')
const search = /\d+([hms]|[HMS]|[чсм]|[ЧСМ]|([Hh]our)|([Mm]inute)|([Ss]econd)|([Чч]ас)|([Сс]екунд)|([Мм]инут))/g

const match = {
    hour: RegExp('([HhЧч]|([Hh]our)|([Чч]ас))', "g"),
    min: RegExp('([MmМм]|([Mm]inute)|([Мм]инут))', "g"),
    sec: RegExp('([SsСс]|([Ss]econd)|([Сс]екунд))', "g")
}

const TIME = {
    hour: 3_600_000,
    min: 60_000,
    sec: 1_000
}

let totalTime = 0;

function getTime(totalTime) {
    let remainder = totalTime;

    const hour = Math.floor(remainder / TIME.hour);
    remainder = totalTime % TIME.hour;

    const min = Math.floor(remainder / TIME.min);
    remainder = totalTime % TIME.min;

    const sec = Math.floor(remainder / TIME.sec);
    remainder = totalTime % TIME.sec;

    return {hour, min, sec};
}

function main() {

    const timeArgs = Array.from(args.matchAll(search));

    if (!timeArgs) {
        throw new Error('Не правильно введены аргументы!')
    } 

    timeArgs.forEach(el => {
        if (el[1].match(match.hour)) {
            const count = Number.parseInt(el[0])
            totalTime += count * 60 * 60 * 1000;
        }
        else if (el[1].match(match.min)) {
            const count = Number.parseInt(el[0])
            totalTime += count * 60 * 1000;
        }
        else if (el[1].match(match.sec)) {
            const count = Number.parseInt(el[0])
            totalTime += count * 1000;
        }
    });

    setTimeout(() => {
        console.log('Время вышло!')
    }, totalTime)

    const {hour, min, sec} = getTime(totalTime);
    console.log(`Установлен таймер на ${hour} часов ${min} минут ${sec} секунд`)
 }

 main()