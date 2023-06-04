#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface(
    process.stdin, process.stdout);

let secretNum = Math.round(Math.random() * 100);
console.log('Угадай число в диапазоне от 0 до 100 (включительно)');

rl.on('line', data => {
    if (!isNaN(data)) {
      userNum = parseInt(data);
      if (userNum === secretNum) {
        console.log("Отгадано число", secretNum);
        rl.close();
      } else if (userNum < secretNum) {
        console.log("Меньше");
      } else {
        console.log("Больше");
      }
    } else {
      console.log("Введите число");
    }
});
