import { CommandModule } from "yargs";
import { RunCommand } from "./run.command";

export interface RunCommandOptions {
  main: string;
}

export const runYargsCommand: CommandModule = {
  command: "run [entrypoint]",
  describe: "Runs the compiler",
  builder: {
    entrypoint: {
      describe: "Entrypoint for project",
      type: "string",
      default: "src/main.ts"
    },
  },
  handler: (argv: unknown) => {
    const options = argv as RunCommandOptions;
    new RunCommand(options).run().then();
  },
};
