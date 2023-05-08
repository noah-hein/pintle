#!/usr/bin/env node
import * as figlet from "figlet";
import * as chalk from "chalk";
import * as yargs from "yargs";
import { newYargsCommand } from "./commands/new/new.yargs";
import { cleanYargsCommand } from "./commands/clean/clean.yargs";
import { patchYargsCommand } from "./commands/patch/patch.yargs";

function main() {
  //logo();
  yargs
    .scriptName("pintle")
    .command(newYargsCommand)
    .command(cleanYargsCommand)
    .command(patchYargsCommand)
    .alias("h", "help")
    .alias("v", "version")
    .showHelpOnFail(true)
    .help()
    // .epilog("Does some stuff")
    .demandCommand().argv;
}
main();

function logo() {
  const text = figlet.textSync("Pintle", {
    font: "Small",
    horizontalLayout: "full",
    verticalLayout: "default",
    whitespaceBreak: true,
  });
  console.log(chalk.cyanBright(text));
}
