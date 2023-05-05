import * as path from "path";
import * as fs from "fs";
import {Modules} from "./resource";
import {defaultPintleConfig, PintleConfig} from "./pintle.config";
import {File, Folder} from "./folder";
import {FsUtil} from "./util";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly modules: Modules;

  private readonly config: PintleConfig;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(
    config: PintleConfig,
    modules: Modules
  ) {
    //Parse options and log
    this.modules = modules;
    this.config = this.parseConfig(config);
    console.log("Config:", this.config);

    //Build resourceFiles
    console.log("Building resources");
    this.build().then(() => {
      console.log("Build completed!");
    });
  }

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public static create(
    modules?: Modules
  ): Pintle {
    modules = modules || []
    return new Pintle(defaultPintleConfig, modules);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private async build() {
    //Create factory from config
    const factoryConstructor = this.config.factory
    const factory = new factoryConstructor();

    //Build folders and files
    const rootModule = {name: "root", modules: this.modules, resources: []};
    const root = factory.compile(rootModule) as Folder;
    root.folderName = this.config.outputPath;
    await this.createFolder(root);
  }

  private async createFolder(folder: Folder, basePath?: string) {
    const folderPath = path.join(basePath || "", folder.folderName);
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
      const filepath = path.join(folderPath, file.fileName);
      filePromises.push(this.writeFile(filepath, file.data));
    });
    return Promise.all(filePromises);
  }

  private async writeFile(filePath: string, blob: Blob) {
    const content = await blob.text();
    fs.writeFileSync(filePath, content);
  }

  private parseConfig(config: PintleConfig): PintleConfig {
    return {
      ...defaultPintleConfig,
      ...config,
    };
  }


}
