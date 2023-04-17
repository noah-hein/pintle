import * as fs from "fs";
import {
  Collections, defaultInputOptions,
  defaultPintleOptions,
  Pintle,
  PintleOptions,
} from "pintle";
import * as path from "path";
import * as chalk from "chalk";
import * as Path from "path";

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
    const inputDir: string = inputOptions.dir || defaultInputOptions.dir;
    const inputDirPath = path.resolve(__dirname, inputDir);

    this.inputDirExists(inputDirPath);
    const files = this.getFilesInDir(inputDirPath);

    console.log(__dirname)

    console.debug(files)


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

  getFilesInDir(dirPath: string): string[] {
    const files = fs.readdirSync(dirPath);
    return files.map((file) => {
      const filePath = path.join(dirPath, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      return isDirectory ? this.getFilesInDir(filePath) : filePath;
    }).flat();
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
