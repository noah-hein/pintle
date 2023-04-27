import {CommandModule} from "yargs";
import { NewCommand } from "./new.command";
import { NewCommandOptions, PackageManagers } from "./new.interfaces";

export const newYargsCommand: CommandModule = {
  command: "new",
  describe: "Creates a new Pintle app",
  builder: {
    name: {
      describe: "Project folder name",
      alias: "n",
      type: "string",
      default: "pintle-app"
    },
    packageManager: {
      describe: "Package manager for the workspace",
      default: "npm",
      alias: "m",
      type: "string",
      choices: Object.values(PackageManagers)
    }
  },
  handler: (argv: unknown) => {
    const options = argv as NewCommandOptions;
    new NewCommand(options).run().then();
  }
}
