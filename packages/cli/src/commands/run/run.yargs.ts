import {CommandModule} from "yargs";
import { RunCommand } from "./run.command";
import {NewCommandOptions} from "../new/new.yargs";

export interface RunCommandOptions {
  main: string;
}

export const runYargsCommand: CommandModule = {
  command: "run",
  describe: "Runs the compiler",
  builder: {
    main: {
      describe: "Entrypoint for project",
      alias: "n",
      type: "string",
      default: "main.ts"
    },
  },
  handler: (argv: unknown) => {
    const options = argv as RunCommandOptions;
    new RunCommand(options).run().then();
  }
}
