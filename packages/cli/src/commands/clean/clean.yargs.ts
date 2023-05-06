import { CommandModule } from "yargs";

export const cleanYargsCommand: CommandModule = {
  command: "clean",
  describe: "Clears out the compiled build folder",
  builder: {},
  handler: () => {
    console.log("Cleaning stuff");
  },
};
