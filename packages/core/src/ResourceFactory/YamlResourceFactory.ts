import * as YAML from "yaml";
import {ResourceFactory} from "./ResourceFactory";
import {ResourceGroup} from "../ResourceGroup";

export class YamlResourceFactory extends ResourceFactory {
  toFile(resourceGroup: ResourceGroup): string {
    const resources = resourceGroup.resources;
    let outputString = "";
    resources.forEach(resource => {
      outputString = outputString + YAML.stringify(resource) + "\r\n---\r\n";
    });
    return outputString;
  }
}
