import * as fs from 'fs';
import {Collection, Collections} from '../Collection';
import {defaultPintleOptions, PintleOptions} from "../PintleOptions";
import {defaultFileOptions, FileOptions} from "../File";

export abstract class ResourceFactory {
  private readonly options: PintleOptions;

  private readonly fileOptions: FileOptions;

  private readonly collections: Collections;

  constructor(options: PintleOptions, collections: Collections) {
    this.options = options || defaultPintleOptions;
    this.fileOptions = options.file || defaultFileOptions;
    this.collections = collections;
  }

  abstract parseSingle(resourceGroup: Collection): string;

  abstract parseMany(resourceGroup: Collections): string;

  public build() {
    const collections = this.collections;
    const fileOptions = this.fileOptions;
    if (fileOptions.filename && fileOptions.singleFile) {
      //Put everything into a single file
      this.buildFile(
        fileOptions.filename,
        this.parseMany(collections)
      );
    } else {
      //Break into individual files
      collections.forEach((collection) => {
        this.createCollection(collection, collection.name);
      });
    }
  }

  createCollection(collection: Collection, filepath: string) {
    this.createFolder(collection, filepath);
    this.createChildren(collection, filepath);
    this.createFile(collection, filepath);
  }

  private createFile(collection: Collection, filepath: string) {
    const fileOptions = this.fileOptions;
    if (collection.resources) {
      const filename = fileOptions.outputDir + "/" + filepath + "." + fileOptions.type;
      const content = this.parseSingle(collection);
      this.clearFile(filename);
      fs.appendFileSync(filename, content);
    }
  }

  private createFolder(collection: Collection, filepath: string) {
    const children = collection.children;
    if (children && children.length > 0) {
      const folderPath = this.fileOptions.outputDir + "/" + filepath;
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  private createChildren(collection: Collection, filepath: string) {
    collection.children.forEach(childCollection => {
      this.createCollection(childCollection, filepath + "/" + childCollection.name);
    });
  }

  private clearFile(filename: string) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename, 0);
    }
  }

  private determineFilePath(name: string) {
    const fileOptions = this.options.file || defaultFileOptions;
    const outputDir = fileOptions.outputDir;
    const fileEnding = fileOptions.type;
    const fileWithEnding = name + '.' + fileEnding;
    return outputDir + '/' + fileWithEnding;
  }

  private buildFile(filename: string, content: string) {
    const filePath = this.determineFilePath(filename);
    this.clearFile(filePath);
    const fileOptions = this.options.file || defaultFileOptions;
    fs.mkdirSync('' + fileOptions.outputDir + '', { recursive: true });
    fs.appendFileSync(filePath, content);
  }
}
