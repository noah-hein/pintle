import {Collection} from "./collection";

export type Resource = object;
export type Resources = Resource[];

export abstract class ResourceFile {
  abstract resources(): Resources;
}

export function isResourceFile(object: any): object is ResourceFile {
  return (
    "prototype" in object &&
    object.prototype instanceof ResourceFile
  );
}
