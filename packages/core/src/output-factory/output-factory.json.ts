import { OutputFactory } from "./output-factory";
import {ResourceFile, ResourceFiles} from "../resource";

export class JsonOutputFactory extends OutputFactory {
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
