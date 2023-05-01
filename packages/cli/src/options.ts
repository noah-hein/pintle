import {defaultPintleOptions, PintleOptions} from "@pintle/core";
import * as chalk from "chalk";
import * as path from "path";
import {discovered} from "./discover";

export class Options {

  public async import(): Promise<PintleOptions> {
    const configPath = this.relativeConfigPath();
    const options = await this.compileConfig(configPath);
    console.log("options = " + JSON.stringify(options, null, 3));
    return options;
  }

  private async compileConfig(configPath: string) {
    let config = defaultPintleOptions;
    try {
      console.log("Importing config file...");
      console.log(configPath)
      const modules = await import(configPath);
      const imported = modules.options;
      if (imported) {
        config = {
          ...config,
          ...imported,
        };
      }
      console.log("config = " + chalk.blue(JSON.stringify(config, null, 3)));
    } catch (error) {
      console.log(chalk.red("Could not read pintle config options, using default"));
    }
    return config;
  }

  private relativeConfigPath(): string {
    const relativeCfgPath = path.relative(discovered.libraryDir, discovered.configPath);
    return relativeCfgPath.replace(".ts", "");
  }
}
