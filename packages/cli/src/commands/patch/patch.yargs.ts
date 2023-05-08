import { CommandModule } from "yargs";
import { PatchCommand } from "./patch.command";

export const patchYargsCommand: CommandModule = {
  command: "patch",
  describe: "Updates the generated resources, does not delete or modify untouched",
  builder: {},
  handler: async () => {
    await new PatchCommand().run();
  },
};
