import * as shell from "shelljs";
import { Command } from "../command";
import {RunCommandOptions} from "./run.yargs";

export class RunCommand extends Command {

  private runOptions: RunCommandOptions;

  constructor(runOptions: RunCommandOptions) {
    super();
    this.runOptions = runOptions;
  }

  async run() {
    const mainPath = this.runOptions.main;
    shell.exec("ts-node " + mainPath)
  }
}
