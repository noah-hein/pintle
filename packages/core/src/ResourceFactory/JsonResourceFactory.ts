import {ResourceFactory} from "./ResourceFactory";
import {ResourceGroup} from "../ResourceGroup";

export class JsonResourceFactory extends ResourceFactory {
  toFile(resourceGroup: ResourceGroup): string {
    const resources = resourceGroup.resources;
    return JSON.stringify(resources);
  }
}
