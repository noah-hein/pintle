import * as YAML from "yaml";
import { FileType } from "./file-type";
import {Collection, Collections} from "../collection";

export class Yaml extends FileType {
  parseSingle(collection: Collection): string {
    const resources = collection.resources;
    let outputString = "";
    resources?.forEach((resource) => {
      outputString = outputString + YAML.stringify(resource) + "---\r\n";
    });
    return outputString;
  }

  parseMany(collections: Collections): string {
    let yaml = "";
    collections.forEach(collection => {
      const collectionString = this.parseSingle(collection);
      yaml = yaml + collectionString;
    })
    return yaml;
  }
}
