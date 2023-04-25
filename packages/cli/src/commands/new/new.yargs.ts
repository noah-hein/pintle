import {CommandModule} from "yargs";
import { NewCommand } from "./new.command";
import { NewCommandOptions } from "./new.interfaces";

export const newYargsCommand: CommandModule = {
  command: "new",
  describe: "Creates a new Pintle app",
  builder: {
    projectName: {
      describe: "Project folder name",
      alias: "n",
      type: "string",
      default: "pintle-app"
    },
    packageName: {
      describe: "Name in the package.json",
      alias: "p",
      type: "string",
      default: "pintle-app"
    },
    packageManager: {
      describe: "Package manager for the workspace",
      default: "npm",
      alias: "m",
      type: "string",
      choices: [
        "npm",
        "yarn"
      ]
    }
  },
  handler: (argv: unknown) => {
    const options = argv as NewCommandOptions;
    new NewCommand(options).run().then();
  }
}
