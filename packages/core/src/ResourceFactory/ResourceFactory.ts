import * as fs from "fs";
import { FileOptions } from "../FileOptions";
import {ResourceGroup} from "../ResourceGroup";
import * as path from "path";

export abstract class ResourceFactory {

  private fileOptions: FileOptions;

  private resourceGroups: ResourceGroup[];

  constructor(fileOptions: FileOptions, resourceGroups: ResourceGroup[]) {
    this.fileOptions = fileOptions;
    this.resourceGroups = resourceGroups;
  }

  abstract toFile(resourceGroup: ResourceGroup): string;

  public build() {
    this.resourceGroups.forEach(resourceGroup => {
      //Clear out yaml
      const filename = resourceGroup.filename;
      if (fs.existsSync(filename)) {
        fs.truncateSync(filename, 0);
      }

      //Generate from factory
      const definition = this.toFile(resourceGroup);
      fs.mkdirSync("" + this.fileOptions.outputDir + "", {recursive: true})
      fs.appendFileSync(filename, definition);
    })
  }
}
