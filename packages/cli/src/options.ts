import {defaultPintleOptions, PintleOptions} from "@pintle/core";
import * as chalk from "chalk";

export class Options {
  private optionsPath = "./pintle.cfg";

  public async import(): Promise<PintleOptions> {
    let config = defaultPintleOptions;
    try {
      console.log("Importing config file...");
      console.log("path = " + this.optionsPath);

      const modules = await import(this.optionsPath);
      const importedOptions = modules.options;
      if (importedOptions) {
        config = {
          ...config,
          ...importedOptions,
        };
      }
      console.log(chalk.blue("config = " + JSON.stringify(config, null, 3)));
    } catch (error) {
      throw new Error("Could not read pintle config options, using default" + error);
    }
    return config;
  }
}
