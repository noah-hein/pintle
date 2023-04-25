import * as yargs from "yargs";
import { newYargsCommand } from "./commands/new/new.yargs";
import { buildYargsCommand } from "./commands/build/build.yargs";
import { cleanYargsCommand } from "./commands/clean/clean.yargs";

export const cli = yargs
  .scriptName("pintle")
  .help("h")
  .alias('h', 'help')
  .alias('v', 'version')
  .command(newYargsCommand)
  .command(buildYargsCommand)
  .command(cleanYargsCommand)
  .epilog("Does some stuff")
  .argv;
