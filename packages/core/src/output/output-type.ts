import * as fs from "fs";
import {defaultPintleOptions, PintleOptions} from "../pintle-options";
import {defaultOutputOptions, OutputOptions} from "./output-options";
import {Collection, Collections} from "../collection";
import {FsUtil} from "../util";

export abstract class OutputType {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly options: PintleOptions;

  private readonly outputOptions: OutputOptions;

  private readonly collections: Collections;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(options: PintleOptions, collections: Collections) {
    this.options = options || defaultPintleOptions;
    this.outputOptions = options.output || defaultOutputOptions;
    this.collections = collections;
  }

  /*==================================================================================================================
        Abstract Methods
    ==================================================================================================================*/

  abstract parseSingle(collection: Collection): string;

  abstract parseMany(collections: Collections): string;

  /*==================================================================================================================
        Public methods
    ==================================================================================================================*/

  public build() {
    this.ensureDirExists(this.outputOptions.outputDir);
    this.determineBuilder(this.outputOptions.singleFile);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private ensureDirExists(outputDir: string | undefined) {
    const dirExists = outputDir && fs.existsSync(outputDir);
    if (!dirExists) {
      FsUtil.createFolder(outputDir);
    }
  }

  private determineBuilder(singleFile: boolean | undefined) {
    if (singleFile) {
      this.singleFile();
    } else {
      this.multipleFiles();
    }
  }

  private flattenCollections(collections: Collections): Collections {
    let flattenedCollections: Collections = [];
    collections.forEach((collection) => {
      flattenedCollections.push(collection);
      const children = collection.collections;
      const hasChildren = children && children.length > 0;
      if (hasChildren) {
        const flattenedChildren = this.flattenCollections(children);
        flattenedCollections = flattenedCollections.concat(flattenedChildren);
      }
    });
    return flattenedCollections;
  }

  private singleFile() {
    const flattenCollections = this.flattenCollections(this.collections);
    const fileContent = this.parseMany(flattenCollections);

    //Create folder and file
    const outputOptions = this.outputOptions;
    const filePath = this.determinePath(
      outputOptions.filename + "." + outputOptions.type
    );
    FsUtil.createFolder(outputOptions.outputDir);
    FsUtil.createFile(fileContent, filePath);
  }

  private multipleFiles() {
    this.collections.forEach((collection) => {
      this.createCollection(collection, collection.name);
    });
  }

  private createCollection(collection: Collection, filename: string) {
    const children = collection.collections || [];
    const resources = collection.resources || [];
    //Create folder
    if (children && children.length > 0) {
      const folderPath = this.determinePath(filename);
      FsUtil.createFolder(folderPath);
    }
    //Create file
    if (resources && resources.length > 0) {
      const content = this.parseSingle(collection);
      const filePath =
        this.determinePath(filename) + "." + this.outputOptions.type;
      FsUtil.createFile(content, filePath);
    }
    //Recurse through children
    children.forEach((child) => {
      this.createCollection(child, filename + "/" + child.name);
    });
  }

  private determinePath(path: string) {
    return this.outputOptions.outputDir + "/" + path;
  }
}
