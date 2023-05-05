export type Resource = object;
export type Resources = Resource[];

export interface Module {
  name: string;
  resources: Resources;
  modules?: Modules;
}
export type Modules = Module[];

export function isModule(object: unknown): object is Module {
  return (
    typeof object === "object" &&
    object != null &&
    "name" in object &&
    "resources" in object
  );
}
