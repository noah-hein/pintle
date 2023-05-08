import { CommandModule } from "yargs";
import {CleanCommand} from "./clean.command";

export const cleanYargsCommand: CommandModule = {
  command: "clean",
  describe: "Clears out the compiled build folder",
  builder: {},
  handler: () => {
    new CleanCommand().run()
  },
};
