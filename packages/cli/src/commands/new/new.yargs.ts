import {CommandModule} from "yargs";

export const newYargs: CommandModule = {
  command: "new",
  describe: "Creates a new Pintle app",
  builder: {
    name: {
      describe: "Project folder name",
      demandOption: true,
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
