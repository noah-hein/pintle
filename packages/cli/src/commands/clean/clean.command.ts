import { Command } from "../command";
import {rimraf} from "rimraf";
import * as process from "process";
import * as path from "path";

export class CleanCommand extends Command {
  run() {
    const outputPath = path.join(process.cwd(), "/generated");
    console.log("Deleting files in" + outputPath)
    rimraf.sync(outputPath + "/**");
  }
}
