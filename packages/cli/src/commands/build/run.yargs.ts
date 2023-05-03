import {CommandModule} from "yargs";
import { RunCommand } from "./run.command";

export const runYargsCommand: CommandModule = {
  command: "run",
  describe: "Runs the compiler",
  builder: {},
  handler: () => {
    new RunCommand().run();
  }
}
