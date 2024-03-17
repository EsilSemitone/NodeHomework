#!/usr/bin/env node
import { getArgs } from "../helpers/args.js";
import { commands, getWeather } from "../helpers/main.commands.js";

async function initCli() {
    const args = Object.entries(getArgs(process.argv)); 
    
    if (args.length > 0) {    
        for (const [command, value] of args) {
            await commands[command](value);
        }    
    } 
    else {
        getWeather()
    }
}

initCli();