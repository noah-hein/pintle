import * as path from "path";
import * as fs from "fs";
import {ResourceFiles} from "./resource";
import {defaultPintleConfig, PintleConfig} from "./pintle.config";
import {File, Folder} from "./folder";
import {FsUtil} from "./util";

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

  private async build() {
    //Create factory from config
    const factoryConstructor = this.config.factory
    const factory = new factoryConstructor();

    //Build folders and files
    const root = factory.compile(this.resourceFiles) as Folder;
    root.name = this.config.outputPath;
    await this.createFolder(root);
  }

  private async createFolder(folder: Folder, basePath?: string) {
    const folderPath = path.join(basePath || "", folder.name);
    const files = folder.files
    const folders = folder.folders;

    //Create folder and its files
    FsUtil.createFolder(folderPath);
    await this.createFilesInFolder(folderPath, files);

    //Base case
    if (folders) {
      folders.forEach(folder => {
        this.createFolder(folder, folderPath);
      });
    }
  }

  private createFilesInFolder(folderPath: string, files: File[]) {
    const filePromises: Promise<void>[] = []
    files.forEach(async file => {
      const filepath = path.join(folderPath, file.name);
      filePromises.push(this.writeFile(filepath, file.data));
    });
    return Promise.all(filePromises);
  }

  private async writeFile(filePath: string, blob: Blob) {
    const content = await blob.text()
    fs.writeFileSync(filePath, content);
  }









  private parseConfig(config: PintleConfig): PintleConfig {
    return {
      ...defaultPintleConfig,
      ...config,
    };
  }


}
