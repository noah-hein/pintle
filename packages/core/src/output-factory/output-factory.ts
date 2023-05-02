import * as fs from "fs";
import { defaultPintleOptions, PintleOptions } from "../pintle-options";
import { FsUtil } from "../util";
import { ResourceFile, ResourceFiles } from "../resource";

export abstract class OutputFactory {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly options: PintleOptions;

  private readonly resourceFiles: ResourceFiles;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(options: PintleOptions, collections: ResourceFiles) {
    this.options = options || defaultPintleOptions;
    this.resourceFiles = collections;
  }

  /*==================================================================================================================
        Abstract Methods
    ==================================================================================================================*/

  abstract parseSingle(resourceFile: ResourceFile): string;

  abstract parseMany(resourceFiles: ResourceFiles): string;

  /*==================================================================================================================
        Public methods
    ==================================================================================================================*/

  public build() {
    this.ensureDirExists(this.options.outputPath);
    this.determineBuilder(this.options.singleFile);
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

  private flattenResourceFiles(resourceFiles: ResourceFiles): ResourceFiles {
    let flattenedFiles: ResourceFiles = [];
    resourceFiles.forEach((resourceFile) => {
      flattenedFiles.push(resourceFile);
      const children = resourceFile.files;
      const hasChildren = children && children.length > 0;
      if (hasChildren) {
        const flattenedChildren = this.flattenResourceFiles(children);
        flattenedFiles = flattenedFiles.concat(flattenedChildren);
      }
    });
    return flattenedFiles;
  }

  private singleFile() {
    const flattenCollections = this.flattenResourceFiles(this.resourceFiles);
    const fileContent = this.parseMany(flattenCollections);

    //Create folder and file
    const options = this.options;
    const filePath = this.determinePath(
      options.filename + "." + options.type
    );
    FsUtil.createFolder(options.outputPath);
    FsUtil.createFile(fileContent, filePath);
  }

  private multipleFiles() {
    this.resourceFiles.forEach((resourceFile) => {
      this.createResourceFile(resourceFile, resourceFile.name);
    });
  }

  private createResourceFile(resourceFile: ResourceFile, filename: string) {
    const children = resourceFile.files || [];
    const resources = resourceFile.resources || [];
    //Create folder
    if (children && children.length > 0) {
      const folderPath = this.determinePath(filename);
      FsUtil.createFolder(folderPath);
    }
    //Create file
    if (resources && resources.length > 0) {
      const content = this.parseSingle(resourceFile);
      const filePath =
        this.determinePath(filename) + "." + this.options.type;
      FsUtil.createFile(content, filePath);
    }
    //Recurse through children
    children.forEach((child) => {
      this.createResourceFile(child, filename + "/" + child.name);
    });
  }

  private determinePath(path: string) {
    return this.options.outputPath + "/" + path;
  }
}

