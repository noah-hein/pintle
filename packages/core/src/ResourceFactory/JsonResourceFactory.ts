import {ResourceFactory} from "./ResourceFactory";
import {ResourceGroup} from "../Resource/ResourceGroup";

export class JsonResourceFactory extends ResourceFactory {
  parseSingle(resourceGroup: ResourceGroup): string {
    const resources = resourceGroup.resources;
    return JSON.stringify(resources, null, 3);
  }

  parseMany(resourceGroup: ResourceGroup[]): string {
    return "";
  }
}
