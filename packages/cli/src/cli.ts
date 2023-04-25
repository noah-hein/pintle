#!/usr/bin/env node
import * as figlet from "figlet";
import * as chalk from "chalk";
import * as yargs from "yargs";
import { newYargsCommand } from "./commands/new/new.yargs";
import { buildYargsCommand } from "./commands/build/build.yargs";
import { cleanYargsCommand } from "./commands/clean/clean.yargs";

function main() {
  //logo()
  yargs
    .scriptName("pintle")
    .help("h")
    .alias('h', 'help')
    .alias('v', 'version')
    .command(newYargsCommand)
    .command(buildYargsCommand)
    .command(cleanYargsCommand)
    .epilog("Does some stuff")
    .argv;
}
main();

function logo() {
  figlet.text(
    "Pintle - cli",
    {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      whitespaceBreak: true
    },
    (error, data) => {
      console.log(chalk.cyan(data));
    }
  );
}



