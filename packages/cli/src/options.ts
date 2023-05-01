import {defaultPintleOptions, PintleOptions} from "@pintle/core";
import * as chalk from "chalk";
import * as process from "process";
import * as path from "path";
import * as fs from "fs";
import {discovered} from "./discover";

export class Options {

  private configFilename = "pintle.cfg.ts";

  private discovered = {
    libraryDir: __dirname,
    workingDir: process.cwd(),
  }

  public async import(): Promise<PintleOptions> {

    console.log(discovered)

    return {};

    // const configPath = this.determineConfigFilePath();
    // return await this.importOptions(configPath);
  }

  private async importOptions(configPath: string) {
    let config = defaultPintleOptions;
    try {
      console.log("Importing config file...");
      console.log(configPath)
      const temp = "";
      const modules = await import("./pintle.cfg");
      const importedOptions = modules.options;
      if (importedOptions) {
        config = {
          ...config,
          ...importedOptions,
        };
      }
      console.log("config = " + chalk.blue(JSON.stringify(config, null, 3)));
    } catch (error) {
      console.log(chalk.red("Could not read pintle config options, using default"));
      console.log(error)
    }
    return config;
  }

  private determineConfigFilePath(): string {
    const libraryDir = __dirname;
    const workingDir = process.cwd();
    const cfgPath = path.join(workingDir, "pintle.cfg.ts");
    const relativeCfgPath = path.relative(libraryDir, cfgPath);
    return relativeCfgPath.replace(".ts", "");
  }
}
