import { Command } from "../command";
import {rimraf} from "rimraf";
import * as process from "process";
import * as path from "path";
import { findConfig } from "@pintle/core";

export class CleanCommand extends Command {
  async run() {
    const config = await findConfig();
    const outputPath = path.join(process.cwd(), config.outputPath);
    console.log("Deleting files in" + outputPath)
    rimraf.sync(outputPath);
  }
}
