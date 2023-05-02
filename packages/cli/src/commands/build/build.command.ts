import * as path from "path";
import * as chalk from "chalk";
import * as fs from "fs";
import * as _ from "lodash";
import {
  ResourceFile,
  ResourceFiles, defaultInputOptions,
  defaultPintleOptions,
  isResourceFile,
  PintleOptions,
  ResourceFile,
  Resources,
} from "@pintle/core";
import { glob } from "glob";
import { Command } from "../command";
import {defaultPaths, Paths} from "../../paths";
import ts = require("typescript");
import { discovered } from "../../discover";

export class BuildCommand extends Command {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private options: PintleOptions = defaultPintleOptions;

  private paths: Paths = defaultPaths;

  private collections: ResourceFiles = [];

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public async run() {

    console.log(discovered)



    //this.options = await new Options().import();
    //this.paths = this.determineProjectPaths();
    // await this.compileCollections();
    // new Pintle(this.options, this.collections);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private transpile() {
    ts.createProgram({
      rootNames: [discovered.collectionsDir],
      options: {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
      }
    });
  }

  private async compileCollections(): Promise<ResourceFiles> {
    //Ensure the collections dir exists
    this.inputDirExists(this.paths.collectionsAbsolute);
    //Import typescript files in collections folder
    const files = this.getTsFiles();
    await this.importFiles(files);
    return this.collections;
  }

  private determineProjectPaths() {
    //Determine Paths
    const inputOptions = this.options.input || defaultInputOptions;
    const baseDir = process.cwd();
    const sourceDir = inputOptions.source || defaultInputOptions.source;
    const collectionsDir = inputOptions.collections || defaultInputOptions.collections;
    const sourceDirPath = path.resolve(baseDir, sourceDir);
    const collectionsDirPath = path.resolve(sourceDirPath, collectionsDir);
    //Place paths into object
    return {
      base: baseDir,
      source: sourceDir,
      collections: collectionsDir,
      sourceAbsolute: sourceDirPath,
      collectionsAbsolute: collectionsDirPath,
    };
  }

  private async importFiles(files: string[]) {
    const topLevelCollections: ResourceFile[] = [];
    const collectionsDir = this.paths.collections;
    //Loop through each file string
    for (const file of files) {
      const relativePath = "../../" + file;
      const treeString = file.replace(collectionsDir + "/", "");
      //Dynamically import file by relative path
      await import(relativePath).then((module) => {
        const exports: object[] = Object.values(module);
        const resources = this.getResources(exports);

        const collectionNames = treeString.split("/");
        const topCollection = this.addCollection(collectionNames, resources)[0];
        topLevelCollections.push(topCollection);
      });
    }
    //Merge and set collections
    this.collections = this.mergeCollections(topLevelCollections);
  }

  private mergeCollections(topLevelCollections: ResourceFiles): ResourceFiles {
    const collections: ResourceFiles = [];
    const collectionNames = topLevelCollections.map(
      (collection) => collection.name
    );
    const collectionNameSet = [...new Set(collectionNames)];
    collectionNameSet.forEach((name) => {
      const similarCollections = topLevelCollections.filter(
        (topLevelCollection) => topLevelCollection.name === name
      );
      const mergedCollection = _.mergeWith(
        {},
        ...similarCollections,
        (a: any, b: any) => {
          if (_.isArray(a)) {
            return b.concat(a);
          }
        }
      );
      collections.push(mergedCollection);
    });
    return collections;
  }

  private addCollection(tree: string[], resources: Resources): ResourceFile[] {
    const collections: ResourceFiles = [];
    if (tree.length > 0) {
      const name = tree.shift();
      if (name) {
        collections.push({
          name,
          resources: tree.length == 0 ? resources : [],
          files: this.addCollection(tree, resources),
        });
      }
    }
    return collections;
  }

  private getResources(exports: object[]) {
    let resources: Resources = [];
    exports.forEach((moduleExport) => {
      //Check if the export inherits ResourceFile class
      if (isResourceFile(moduleExport)) {
        const temp = moduleExport as unknown as { new (): ResourceFile };
        const exportResources = new temp().resources();
        //Merge resources into main array
        resources = [...resources, ...exportResources];
      }
    });
    return resources;
  }

  private getTsFiles(): string[] {
    const inputOptions = this.options.input || defaultInputOptions;
    const sourceDir = inputOptions.source || defaultInputOptions.source || "";
    const collectionsDir = inputOptions.collections || defaultInputOptions.collections || "";
    //Build path for file search
    const sourceWithCollections = path
      .join(sourceDir + collectionsDir)
      .replace(/\\/g, "/");
    const collectionsPath = `${sourceWithCollections}/**/*.ts`;
    //Search for files with glob
    const tsFilesWithEnding = glob.sync(collectionsPath);
    //Parse file and return paths
    return tsFilesWithEnding.map((file) =>
      file.replace(/\\/g, "/")
        .replace(".ts", "")
        .replace(sourceDir, "")
    );
  }

  private inputDirExists(inputDirPath: string) {
    console.debug("Checking for collections resource directory");
    console.log("collections path = " + chalk.blue(inputDirPath));
    if (!fs.existsSync(inputDirPath)) {
      throw new Error("Could not find collections directory");
    }
  }
}
