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
    const baseDir = process.cwd();
    const inputDir: string = inputOptions.dir || defaultInputOptions.dir;
    const inputDirPath = path.resolve(baseDir, inputDir);

    this.inputDirExists(inputDirPath);
    const tsFiles = this.findTsFiles(inputDirPath);

    tsFiles.forEach(file => {
      const relativeFilePath = path.relative(inputDir, file);

      //console.log(file)
      //console.log(relativeFilePath)


      //const temp = path.relative(__dirname, relativeFilePath);

      //console.log(temp)
      const temp = path.join("../../../", inputOptions.dir, relativeFilePath)
      console.log(temp)

      import(temp).then(module => {
        console.log(module)
      });
    });


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

  private findTsFiles(inputDirPath: string) {
    const allFiles: string[] = this.getFilesInDir(inputDirPath);
    const tsFiles = allFiles.filter(file => file.endsWith(".ts"));
    return tsFiles.map(file => file.replace(".ts", ""));
  }

  private inputDirExists(inputDirPath: string) {
    console.debug(chalk.blue("Checking for resource directory ") + inputDirPath);
    if (!fs.existsSync(inputDirPath)) {
      throw new Error("Could not find resource directory")
    }
  }

  private getFilesInDir(dirPath: string): string[] {
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
