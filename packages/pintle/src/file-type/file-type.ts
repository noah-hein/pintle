import * as fs from "fs";
import {Collection, Collections, defaultPintleOptions, PintleOptions, defaultFileOptions, FileOptions} from "pintle";

export abstract class FileType {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly options: PintleOptions;

  private readonly fileOptions: FileOptions;

  private readonly collections: Collections;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(options: PintleOptions, collections: Collections) {
    this.options = options || defaultPintleOptions;
    this.fileOptions = options.file || defaultFileOptions;
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
    this.ensureDirExists(this.fileOptions.outputDir);
    this.determineBuilder(this.fileOptions.singleFile);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private ensureDirExists(outputDir: string | undefined) {
    const dirExists = outputDir && fs.existsSync(outputDir);
    if (!dirExists) {
      this.createFolder(outputDir);
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
    collections.forEach(collection => {
      flattenedCollections.push(collection);
      const children = collection.collections;
      const hasChildren = children && children.length > 0;
      if (hasChildren) {
        const flattenedChildren = this.flattenCollections(children);
        flattenedCollections = flattenedCollections.concat(flattenedChildren);
      }
    })
    return flattenedCollections;
  }

  private singleFile() {
    const flattenCollections = this.flattenCollections(this.collections);
    const fileContent = this.parseMany(flattenCollections);

    //Create folder and file
    const fileOptions = this.fileOptions;
    const filePath = this.determinePath(fileOptions.filename + "." + fileOptions.type);
    this.createFolder(fileOptions.outputDir);
    this.createFile(fileContent, filePath);
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
      this.createFolder(folderPath);
    }
    //Create file
    if (resources) {
      const content = this.parseSingle(collection);
      const filePath = this.determinePath(filename) + "." + this.fileOptions.type
      this.createFile(content, filePath);
    }
    //Recurse through children
    children.forEach(child => {
      this.createCollection(child, filename + "/" + child.name);
    });
  }

  private determinePath(path: string) {
    return this.fileOptions.outputDir + "/" + path;
  }

  private createFile(content: string, filename: string) {
    this.clearFile(filename);
    fs.appendFileSync(filename, content);
  }

  private createFolder(folderName: string | undefined) {
    if (folderName) {
      fs.mkdirSync(folderName, { recursive: true });
    }
  }

  private clearFile(filename: string) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename, 0);
    }
  }
}
