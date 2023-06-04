#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command({
    command: "current",
    describe: "Дата и время в формате ISO",
    builder: {
      date: {
        alias: "d",
        type: "boolean",
        demandOption: false,
        describe: "День",
      },
      month: {
        alias: "m",
        type: "boolean",
        demandOption: false,
        describe: "Месяц",
      },
      year: {
        alias: "y",
        type: "boolean",
        demandOption: false,
        describe: "Год",
      },
    },
    handler({ date = false, month = false, year = false }) {
      let now = new Date();
      if (year) {
        console.log(now.getFullYear());
      } else if (month) {
        console.log(now.getMonth() + 1);
      } else if (date) {
        console.log(now.getDate());
      } else {
        console.log(now.toISOString());
      }
    },
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Дата и время в формате ISO, будущее",
    builder: {
      day: {
        alias: "d",
        type: "number",
        demandOption: false,
        describe: "Добавить дней",
      },
      month: {
        alias: "m",
        type: "number",
        demandOption: false,
        describe: "Добавить месяцев",
      },
      year: {
        alias: "y",
        type: "number",
        demandOption: false,
        describe: "Добавить лет",
      },
    },
    handler({ day = 0, month = 0, year = 0 }) {
      let now = new Date();
      if (day) {
        now.setDate(now.getDate() + day);
      } else if (month) {
        now.setMonth(now.getMonth() + month);
      } else if (year) {
        now.setFullYear(now.getFullYear() + year);
      }
      console.log(now.toISOString());
    },
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "sub",
    describe: "Дата и время в формате ISO, прошлое",
    builder: {
      day: {
        alias: "d",
        type: "number",
        demandOption: false,
        describe: "Убавить дней",
      },
      month: {
        alias: "m",
        type: "number",
        demandOption: false,
        describe: "Убавить месяцев",
      },
      year: {
        alias: "y",
        type: "number",
        demandOption: false,
        describe: "Убавить лет",
      },
    },
    handler({ day = 0, month = 0, year = 0 }) {
      let now = new Date();
      if (day) {
        now.setDate(now.getDate() - day);
      } else if (month) {
        now.setMonth(now.getMonth() - month);
      } else if (year) {
        now.setFullYear(now.getFullYear() - year);
      }
      console.log(now.toISOString());
    },
  })
  .parse();
