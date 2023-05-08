import { CommandModule } from "yargs";
import { NewCommand } from "./new.command";
import { PackageManagers } from "../../package-managers/package-manager";

export interface NewCommandOptions {
  name: string;
  packageManager: PackageManagers;
}

export const newYargsCommand: CommandModule = {
  command: "new",
  describe: "Creates a new Pintle app",
  builder: {
    name: {
      describe: "Project folder name",
      alias: "n",
      type: "string",
      default: "pintle-app",
    },
    packageManager: {
      describe: "Package manager for the workspace",
      default: "npm",
      alias: "m",
      type: "string",
      choices: Object.values(PackageManagers),
    },
  },
  handler: async (argv: unknown) => {
    const options = argv as NewCommandOptions;
    await new NewCommand(options).run();
  },
};
