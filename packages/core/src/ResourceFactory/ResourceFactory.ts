

// export interface ResourceFactory {
//
// }

import { FileOptions } from "../FileOptions";
import {ResourceGroup} from "../ResourceGroup";

export abstract class ResourceFactory {

  private fileOptions: FileOptions;

  private resourceGroups: ResourceGroup[];

  constructor(fileOptions: FileOptions, resourceGroups: ResourceGroup[]) {
    this.fileOptions = fileOptions;
    this.resourceGroups = resourceGroups;
  }

  abstract toFile(resourceGroup: ResourceGroup): string;

  //abstract singleFile(resourceGroup: ResourceGroup): ResourceFile[];

  //abstract multipleFiles(resourceGroup: ResourceGroup): ResourceFile[];

  // public build(resourceGroup: ResourceGroup) {
  //   const buildMethod = this.fileOptions.singleFile ? this.singleFile : this.multipleFiles;
  //   const resourceFiles = buildMethod(resourceGroup);
  // }

  public getResourceGroups() {
    this.resourceGroups.forEach(resourceGroup => {

    })
  }




}
