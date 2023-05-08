import { CommandModule } from "yargs";
import { PatchCommand } from "../patch/patch.command";
import { CleanCommand } from "../clean/clean.command";


export const putYargsCommand: CommandModule = {
  command: "patch",
  describe: "Completely rebuilds and generates resources.",
  builder: {},
  handler: async () => {
    await new CleanCommand().run();
    await new PatchCommand().run()
  },
};
