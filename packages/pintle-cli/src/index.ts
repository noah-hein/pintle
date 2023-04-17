import * as fs from "fs";
import {defaultPintleOptions, PintleOptions} from "pintle";


function build() {
  // const test = "./collections/ark-server.ballsack";
  //
  // import(test).then(module => {
  //   const moduleExports = Object.entries(module);
  //   moduleExports.forEach(moduleExport => {
  //     const key = moduleExport[0];
  //     const value = moduleExport[1];
  //     console.log(isCollection(value))
  //   });
  // });
}

export class BuildCommand {

  async run() {
    const config: PintleOptions = await this.getConfig();
    console.log(config)
  }

  private async getConfig(): Promise<PintleOptions> {
    const configPath = "./pintle.cfg";
    let config = defaultPintleOptions;
    try {
      const modules = await import(configPath);
      const pintleOptions = modules.options;
      if (pintleOptions) {
        config = {
          ...config,
          ...modules.options
        };
      }
    } catch (error) {
      console.error("Could not read pintle config options")
    }
    return config;
  }
}

const buildCommand = new BuildCommand();
buildCommand.run()




// yargs
//   .scriptName("pintle-cli")
//   .command(
//     "build",
//     "Finds and compiles all resources into a configurable distribution",
//     () => null, () => {
//     })
//   .help()
//   .argv
