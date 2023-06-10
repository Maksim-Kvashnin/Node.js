#!/usr/bin/env node

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const fs = require('fs');
const path = require('path');

const readline = require('readline');
const input = readline.createInterface(process.stdin);

function getRandomNum() {
    return Math.round(Math.random());
}

if(!argv.name) {
    console.log('Пожалуйста, укажите имя файла для сохранения статистики игры (используйте --name, например: --name 1)')
    process.exit(-1)
} else {
    const fileName = path.join(__dirname, `${argv.name}.json`)
    console.log(fileName)
    const content = '{}'
    fs.writeFile(fileName, content, err => {
        if (err) throw new Error(err);
        console.log('Начали!')
    })
    
    let num = getRandomNum();
    let round = 0;

    input.on('line', (data)=> {
        round++;
        fs.readFile(fileName, 'utf-8', (err, gameResultsJSON) => {
            if(err) throw new Error(err)
            let gameResults = JSON.parse(gameResultsJSON);
            gameResults[round] = +data === num ? "выиграл" : "проиграл";
            let message = +data === num ? 'Вы выиграли' : 'Вы проиграли';
            fs.writeFile(fileName, JSON.stringify(gameResults), err => {
                if(err) throw new Error(err)
                console.log(message)
            })
        })
        num = getRandomNum();
            
        if(data === 'exit') {
            console.log("Конец игры");
            process.exit(-1)
        }
    })
}
