#!/usr/bin/env node
import * as figlet from "figlet";
import * as chalk from "chalk";

function logo() {
  figlet.text(
    "Pintle",
    {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
      whitespaceBreak: true,
    },
    function (err, data) {
      console.log(chalk.cyan(data));
    }
  );
}
logo();

export { cli } from "./yargs";



