import {ResourceFiles} from "./resource";
import {defaultPintleConfig, PintleConfig} from "./pintle.config";
import {FsUtil} from "@pintle/core";
import {File, Folder} from "./folder";
import * as path from "path";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly resourceFiles: ResourceFiles;

  private readonly config: PintleConfig;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(
    config: PintleConfig,
    resourceFiles: ResourceFiles
  ) {
    //Parse options and log
    this.resourceFiles = resourceFiles;
    this.config = this.parseConfig(config);
    console.log("Config:", this.config);

    //Build resourceFiles
    console.log("Building resources");
    this.build();
    console.log("Completed!");
  }

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public static create(
    collections?: ResourceFiles
  ): Pintle {
    collections = collections || []
    return new Pintle(defaultPintleConfig, collections);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private build() {
    //Create factory from config
    const factoryConstructor = this.config.factory
    const factory = new factoryConstructor();

    //Build folders and files
    const root = factory.compile(this.resourceFiles) as Folder;
    root.name = this.config.outputPath;
    this.createFolder(root);
  }

  private createFolder(folder: Folder, basePath?: string) {
    const folderPath = path.join(basePath || "", folder.name);
    const files = folder.files
    const folders = folder.folders;

    //Create folder and its files
    FsUtil.createFolder(folderPath);
    this.createFilesInFolder(folderPath, files);

    //Base case
    if (folders) {
      folders.forEach(folder => {
        this.createFolder(folder, folderPath);
      });
    }
  }

  private createFilesInFolder(folderPath: string, files: File[]) {
    files.forEach(async file => {
      const filepath = path.join(folderPath, file.name);
      const content = await file.data.text();
      FsUtil.createFile(filepath, content);
    });
  }









  private parseConfig(config: PintleConfig): PintleConfig {
    return {
      ...defaultPintleConfig,
      ...config,
    };
  }


}
