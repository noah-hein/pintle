import * as YAML from "yaml";
import { ResourceFactory } from "./ResourceFactory";
import { Collection } from "../Collection";

export class YamlResourceFactory extends ResourceFactory {
  parseSingle(resourceGroup: Collection): string {
    const resources = resourceGroup.resources;
    let outputString = "";
    resources.forEach((resource) => {
      outputString = outputString + YAML.stringify(resource) + "---\r\n";
    });
    return outputString;
  }

  parseMany(resourceGroups: Collection[]): string {
    let outputString = "";
    resourceGroups.forEach((resourceGroup) => {
      outputString = outputString + this.parseSingle(resourceGroup);
    });
    return outputString;
  }
}
