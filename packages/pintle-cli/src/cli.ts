import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import {
  Collections,
  defaultPintleOptions,
  InputOptions,
  Pintle,
  PintleOptions,
} from "pintle";
import {glob} from "glob";

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
    //File and folder locations
    const inputOptions = this.options.input;
    const baseDir = process.cwd();
    const sourceDir: string = inputOptions.source;
    const collectionsDir: string = inputOptions.collections;
    const sourceDirPath = path.resolve(baseDir, sourceDir);
    const collectionsDirPath = path.resolve(sourceDirPath, collectionsDir);

    //Ensure the collections dir exists
    this.inputDirExists(collectionsDirPath);

    //Get all typescript files
    const files = this.getTsFiles(inputOptions);



    files.forEach(file => {
      const relativePath = "./" + file;
      import(relativePath).then(module => {


        console.log(module)
      })
    })

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

  private getTsFiles(inputOptions: InputOptions): string[] {
    const sourceDir = inputOptions.source;
    const collectionsDir = inputOptions.collections;

    //Build path for file search
    const sourceWithCollections = path
      .join(sourceDir + collectionsDir)
      .replace(/\\/g, "/");
    const collectionsPath = `${sourceWithCollections}/**/*.ts`;

    //Search for files with glob
    const tsFilesWithEnding = glob.sync(collectionsPath);

    //Parse file and return paths
    return tsFilesWithEnding.map(file => file
      .replace(/\\/g, "/")
      .replace(".ts", "")
      .replace(sourceDir, "")
    );
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
