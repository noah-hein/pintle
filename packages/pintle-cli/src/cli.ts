import * as fs from "fs";
import {Collections, defaultPintleOptions, Pintle, PintleOptions} from "pintle";
import {isCollection} from "yaml";
import * as path from "path";


function build() {
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
    new Pintle(
      await this.getOptions(),
      await this.findCollections()
    );
  }

  private async getOptions(): Promise<PintleOptions> {
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

  private async findCollections(): Promise<Collections> {

    console.log(path.resolve(__dirname, "./"))

    // const temp = "./collections/*";
    // import(temp).then(module => {
    //   console.log(module)
    // })

    // const moduleExports = Object.entries(module);
    // moduleExports.forEach(moduleExport => {
    //   const key = moduleExport[0];
    //   const value = moduleExport[1];
    //   console.log(value)
    //   console.log(isCollection(value))
    // });
    return [];
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
