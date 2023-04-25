import {CommandModule} from "yargs";

export const newYargsCommand: CommandModule = {
  command: "new",
  describe: "Creates a new Pintle app",
  builder: {
    projectName: {
      describe: "Project folder name",
      alias: "n",
      type: "string"
    },
    packageName: {
      describe: "Name in the package.json",
      alias: "n",
      type: "string"
    },
    packageManager: {
      describe: "Package manager for the workspace",
      default: "npm",
      alias: "p",
      type: "string",
      choices: [
        "npm",
        "yarn"
      ]
    }
  },
  handler: (argv: any) => {
    console.log(argv)
  }
}
