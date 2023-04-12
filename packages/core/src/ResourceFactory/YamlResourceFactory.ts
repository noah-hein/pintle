import * as YAML from "yaml";
import {ResourceFactory} from "./ResourceFactory";
import {ResourceGroup} from "../Resource/ResourceGroup";

export class YamlResourceFactory extends ResourceFactory {
  parseSingle(resourceGroup: ResourceGroup): string {
    const resources = resourceGroup.resources;
    let outputString = "";
    resources.forEach(resource => {
      outputString = outputString + YAML.stringify(resource) + "---\r\n";
    });
    return outputString;
  }

  parseMany(resourceGroups: ResourceGroup[]): string {
    let outputString = "";
    resourceGroups.forEach(resourceGroup => {
      outputString = outputString + this.parseSingle(resourceGroup);
    });
    return outputString;
  }
}
