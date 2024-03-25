import chalk from 'chalk'
import dedent from 'dedent-js'

import { translate } from './translate.service.js';

export class Log {
    static async error(error) {
        console.log(chalk.bgRed(' ERROR ') + ' ' + error)
    }

    static async success(msg) {
        console.log(`${chalk.bgGreen(' SUCCESS ')}\n${msg}`)
    }

    static async help() {
        console.log(dedent`${chalk.bgCyan('HELP')}
            ${await translate.getPhrase("main", "help")}
            `
            )
    }
}