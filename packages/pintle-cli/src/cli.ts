import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import {
  Collections,
  defaultPintleOptions,
  InputOptions, isResourceFile,
  Pintle,
  PintleOptions, ResourceFile, Resources,
} from "pintle";
import {glob} from "glob";


export class BuildCommand {

  private options: PintleOptions = defaultPintleOptions;

  private collections: Collections = [];

  async run() {
    this.options = await this.getOptions();
    await this.compileCollections();
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

  private async compileCollections(): Promise<Collections> {
    //File and folder locations
    const inputOptions = this.options.input;
    const baseDir = process.cwd();
    const sourceDir: string = inputOptions.source;
    const collectionsDir: string = inputOptions.collections;
    const sourceDirPath = path.resolve(baseDir, sourceDir);
    const collectionsDirPath = path.resolve(sourceDirPath, collectionsDir);

    //Ensure the collections dir exists
    this.inputDirExists(collectionsDirPath);

    //Import typescript files in collections folder
    const files = this.getTsFiles(inputOptions);
    this.importFiles(files, collectionsDir);

    //


    return [];
  }

  private importFiles(files: string[], collectionsDir: string) {
    const collections: Collections = [];

    //Loop through each file string
    files.forEach(file => {
      const relativePath = "./" + file;
      const treeString = file.replace(collectionsDir + "/", "");

      //Dynamically import file by relative path
      import(relativePath).then(module => {
        const exports: object[] = Object.values(module);


        const resources = this.getResources(exports);
        console.log(resources)

        // const moduleCollections = this.getModuleCollections(module);
        // const resources = moduleCollections.map(collection => collection.resources);
        // console.log(resources)
        // console.log(treeString)
      });
    });
  }

  private getResources(exports: object[]) {
    let resources: Resources = [];
    exports.forEach(moduleExport => {

      //Check if the export inherits ResourceFile class
      if (isResourceFile(moduleExport)) {
        const temp = moduleExport as unknown as {new(): ResourceFile};
        const exportResources = new temp().resources();

        //Merge resources into main array
        resources = [
          ...resources,
          ...exportResources
        ];
      }
    });
    return resources;
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
