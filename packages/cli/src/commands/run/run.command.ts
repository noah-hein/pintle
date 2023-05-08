import * as shell from "shelljs";
import { Command } from "../command";
import { RunCommandOptions } from "./run.yargs";
import * as path from "path";
import * as process from "process";

export class RunCommand extends Command {
  private runOptions: RunCommandOptions;

  constructor(runOptions: RunCommandOptions) {
    super();
    this.runOptions = runOptions;
  }

  async run() {
    const mainPath = path.join(process.cwd(), "src/main");
    shell.exec("ts-node " + mainPath);
  }
}
