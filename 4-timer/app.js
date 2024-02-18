//Чтобы как-то роазнообразить урок я решил сделать с регулярными выражениеми
const args = process.argv.slice(2).join('')
const search = /\d+([hms]|[HMS]|[чсм]|[ЧСМ]|([Hh]our)|([Mm]inute)|([Ss]econd)|([Чч]ас)|([Сс]екунд)|([Мм]инут))/g

const match = {
    hour: RegExp('\\d+([HhЧч]|([Hh]our)|([Чч]ас))', "g"),
    min: RegExp('\\d+([MmМм]|([Mm]inute)|([Мм]инут))', "g"),
    sec: RegExp('\\d+([SsСс]|([Ss]econd)|([Сс]екунд))', "g")
}

let totalTime = 0;
let hour = 0, min = 0, sec = 0;

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
        console.log('Время вышло!')
    }, totalTime)

    console.log(`Установлен таймер на ${hour} часов ${min} минут ${sec} секунд`)
 }

 main()