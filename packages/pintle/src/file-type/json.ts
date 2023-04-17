import { FileType } from "./file-type";
import {Collection, Collections} from "../collection";

export class Json extends FileType {
  parseSingle(collection: Collection): string {
    const resources = collection.resources;
    return JSON.stringify(resources, null, 3);
  }

  parseMany(collections: Collections): string {
    const output: object[] = [];
    collections.forEach(collection => {
      const collectionString = this.parseSingle(collection);
      const resources: object[] = JSON.parse(collectionString);
      resources.forEach(resource => {
        output.push(resource);
      });
    });
    return JSON.stringify(output, null, 3);
  }
}