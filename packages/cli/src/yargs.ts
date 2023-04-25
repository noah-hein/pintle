import * as yargs from "yargs";
import { newYargsCommand } from "./commands/new/new.yargs";
import { CleanCommand } from "./commands/clean";
import { buildYargsCommand } from "./commands/build/build.yargs";

export const cli = yargs
  .scriptName("pintle")
  .help("h")
  .alias('h', 'help')
  .alias('v', 'version')
  .command(newYargsCommand)
  .command(buildYargsCommand)
  .command(
    "clean",
    "Foobar",
    () => null,
    async () => new CleanCommand().run()
  )
  .epilog("Does some stuff")
  .argv;
