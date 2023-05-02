
import { OutputType } from "../output-type";
import {ResourceFile, ResourceFiles} from "../../resource";

export class Json extends OutputType {
  parseSingle(resourceFile: ResourceFile): string {
    const resources = resourceFile.resources;
    return JSON.stringify(resources, null, 3);
  }

  parseMany(resourceFiles: ResourceFiles): string {
    const output: object[] = [];
    resourceFiles.forEach((resourceFile) => {
      const collectionString = this.parseSingle(resourceFile);
      const resources: object[] = JSON.parse(collectionString);
      resources.forEach((resource) => {
        output.push(resource);
      });
    });
    return JSON.stringify(output, null, 3);
  }
}
