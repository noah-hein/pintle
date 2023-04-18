import * as fs from "fs";
import {
  Collections, defaultInputOptions,
  defaultPintleOptions,
  Pintle,
  PintleOptions,
} from "pintle";
import * as path from "path";
import * as chalk from "chalk";
import {glob} from "glob";

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

  private options: PintleOptions;

  private collections: Collections;

  async run() {
    this.options = await this.getOptions();
    this.collections = await this.findCollections();
    new Pintle(this.options, this.collections);
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
          ...modules.options,
        };
      }
    } catch (error) {
      console.error("Could not read pintle config options, using default");
    }
    return config;
  }

  private async findCollections(): Promise<Collections> {
    const inputOptions = this.options.input;
    const baseDir = process.cwd();
    const source: string = inputOptions.source || defaultInputOptions.source;
    const inputDirPath = path.resolve(baseDir, source);

    //this.inputDirExists(inputDirPath);

    console.log(inputDirPath)

    // const collectionsPath = `./${inputDir}/**/*.ts`;
    // const tsFiles: string[] = glob.sync(collectionsPath);
    // const files = tsFiles.map(file => file
    //   .replace(/\\/g, "/")
    //   .replace(".ts", "")
    // );
    //
    //
    // console.log(files)
    //
    // files.forEach(file => {
    //   const relativePath = path.relative(baseDir, file);
    //   console.log(relativePath)
    //
    //
    //   import("./collections/keycloak").then(module => {
    //     console.log(module)
    //   });
    // });


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

  private inputDirExists(inputDirPath: string) {
    console.debug(chalk.blue("Checking for resource directory ") + inputDirPath);
    if (!fs.existsSync(inputDirPath)) {
      throw new Error("Could not find resource directory")
    }
  }
}

const buildCommand = new BuildCommand();
buildCommand.run();

// yargs
//   .scriptName("pintle-cli")
//   .command(
//     "build",
//     "Finds and compiles all resources into a configurable distribution",
//     () => null, () => {
//     })
//   .help()
//   .argv
