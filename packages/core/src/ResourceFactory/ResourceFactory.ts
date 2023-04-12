import * as fs from "fs";
import { FileOptions } from "../FileOptions";
import {ResourceGroup} from "../ResourceGroup";

export abstract class ResourceFactory {

  private readonly fileOptions: FileOptions;

  private readonly resourceGroups: ResourceGroup[];

  constructor(fileOptions: FileOptions, resourceGroups: ResourceGroup[]) {
    this.fileOptions = fileOptions;
    this.resourceGroups = resourceGroups;
  }

  abstract parseSingle(resourceGroup: ResourceGroup): string;

  abstract parseMany(resourceGroup: ResourceGroup[]): string;

  public build() {
    const fileOptions = this.fileOptions;
    const resourceGroups = this.resourceGroups;
    if (fileOptions.filename && fileOptions.singleFile) {
      //Put everything into a single file
      this.buildFile(resourceGroups[0].filename, this.parseMany(resourceGroups));
    } else {
      //Break into individual files
      resourceGroups.forEach(resourceGroup => {
        this.buildFile(resourceGroup.filename, this.parseSingle(resourceGroup));
      })
    }
  }

  private clearFile(filename: string) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename, 0);
    }
  }

  private buildFile(filename: string, content: string) {
    this.clearFile(filename);
    fs.mkdirSync("" + this.fileOptions.outputDir + "", {recursive: true})
    fs.appendFileSync(filename, content);
  }
}
