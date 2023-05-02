import * as YAML from "yaml";
import { OutputFactory } from "../output-factory";
import {ResourceFile, ResourceFiles} from "../../resource";

export class YamlFactory extends OutputFactory {
  parseSingle(resourceFile: ResourceFile): string {
    const resources = resourceFile.resources;
    let outputString = "";
    resources?.forEach((resource) => {
      outputString = outputString + YAML.stringify(resource) + "---\r\n";
    });
    return outputString;
  }

  parseMany(resourceFiles: ResourceFiles): string {
    let yaml = "";
    resourceFiles.forEach((resourceFile) => {
      const collectionString = this.parseSingle(resourceFile);
      yaml = yaml + collectionString;
    });
    return yaml;
  }
}
