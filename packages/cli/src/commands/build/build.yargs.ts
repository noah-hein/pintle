import { CommandModule } from "yargs";
import { BuildCommand } from "./build.command";

export const buildYargsCommand: CommandModule = {
  command: "build",
  describe: "Finds and compiles all resources into a configurable distribution",
  handler: async () => new BuildCommand().run()
}
