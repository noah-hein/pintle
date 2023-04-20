import * as path from "path";
import * as chalk from "chalk";
import * as fs from "fs";
import {
  Collection,
  Collections,
  defaultPintleOptions,
  InputOptions,
  isResourceFile,
  Pintle,
  PintleOptions,
  ResourceFile,
  Resources
} from "pintle";
import {glob} from "glob";
import * as _ from "lodash";

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
    await this.importFiles(files, collectionsDir);

    return this.collections;
  }

  private async importFiles(files: string[], collectionsDir: string) {
    const topLevelCollections: Collection[] = [];

    //Loop through each file string
    for (const file of files) {
      const relativePath = "./" + file;
      const treeString = file.replace(collectionsDir + "/", "");

      //Dynamically import file by relative path
      await import(relativePath).then(module => {
        const exports: object[] = Object.values(module);
        const resources = this.getResources(exports);

        const collectionNames = treeString.split("/");
        const topCollection = this.addCollection(collectionNames, resources)[0];
        topLevelCollections.push(topCollection);
      });
    }

    //Merge all collections
    const collections = this.mergeCollections(topLevelCollections);
    console.log(collections)
  }

  private mergeCollections(topLevelCollections: Collections): Collections {
    const collections: Collections = [];
    const collectionNames = topLevelCollections.map(
      collection => collection.name
    );
    const collectionNameSet = [...new Set(collectionNames)];
    collectionNameSet.forEach(name => {
      const similarCollections = topLevelCollections.filter(
        topLevelCollection => topLevelCollection.name === name
      );
      const mergedCollection = _.mergeWith({}, ...similarCollections, (a, b) => {
        if (_.isArray(a)) {
          return b.concat(a);
        }
      });
      collections.push(mergedCollection);
    });
    return collections;
  }

  private addCollection(tree: string[], resources: Resources): Collection[] {
    const collections: Collections = [];
    if (tree.length > 0) {
      collections.push({
        name: tree.shift(),
        resources: tree.length == 0 ? resources : [],
        collections: this.addCollection(tree, resources)
      });
    }
    return collections;
  }

  private getResources(exports: object[]) {
    let resources: Resources = [];
    exports.forEach(moduleExport => {

      //Check if the export inherits ResourceFile class
      if (isResourceFile(moduleExport)) {
        const temp = moduleExport as unknown as { new(): ResourceFile };
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
