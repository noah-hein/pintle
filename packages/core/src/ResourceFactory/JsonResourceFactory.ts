import {ResourceFactory} from "./ResourceFactory";
import {Collection} from "../Collection";

export class JsonResourceFactory extends ResourceFactory {
  parseSingle(resourceGroup: Collection): string {
    const resources = resourceGroup.resources;
    return JSON.stringify(resources, null, 3);
  }

  parseMany(resourceGroup: Collection[]): string {
    return "";
  }
}
