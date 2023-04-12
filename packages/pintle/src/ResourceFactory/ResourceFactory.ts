import * as fs from 'fs';
import { FileOptions } from '../File';
import { Collection } from '../Collection';

export abstract class ResourceFactory {
  private readonly fileOptions: FileOptions;

  private readonly resourceGroups: Collection[];

  constructor(fileOptions: FileOptions, resourceGroups: Collection[]) {
    this.fileOptions = fileOptions;
    this.resourceGroups = resourceGroups;
  }

  abstract parseSingle(resourceGroup: Collection): string;

  abstract parseMany(resourceGroup: Collection[]): string;

  public build() {
    const fileOptions = this.fileOptions;
    const resourceGroups = this.resourceGroups;
    if (fileOptions.filename && fileOptions.singleFile) {
      //Put everything into a single file
      this.buildFile(
        resourceGroups[0].filename,
        this.parseMany(resourceGroups)
      );
    } else {
      //Break into individual files
      resourceGroups.forEach((resourceGroup) => {
        this.buildFile(resourceGroup.filename, this.parseSingle(resourceGroup));
      });
    }
  }

  private clearFile(filename: string) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename, 0);
    }
  }

  private buildFile(filename: string, content: string) {
    this.clearFile(filename);
    fs.mkdirSync('' + this.fileOptions.outputDir + '', { recursive: true });
    fs.appendFileSync(filename, content);
  }
}
