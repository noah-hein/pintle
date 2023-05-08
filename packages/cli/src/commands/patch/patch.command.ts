import * as shell from "shelljs";
import { Command } from "../command";
import { findConfig } from "@pintle/core";

export class PatchCommand extends Command {
  public async run() {
    const pintleConfig = await findConfig();
    const main = pintleConfig.main;
    shell.exec("ts-node " + main);
  }
}
