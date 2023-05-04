export type Resource = object;
export type Resources = Resource[];

export interface ResourceFile {
  name: string;
  resources: Resources;
  files?: ResourceFiles;
}
export type ResourceFiles = ResourceFile[];

export function isResourceFile(object: unknown): object is ResourceFile {
  return (
    typeof object === "object" &&
    object != null &&
    "name" in object &&
    "resources" in object
  );
}
