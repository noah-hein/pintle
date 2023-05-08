import {Resources} from "./resource";

export interface Module {
  name: string;
  resources?: Resources;
  modules?: Modules;
}

// export class Module {
//   name: string = "default";
//   resources?: Resources;
//   modules?: Modules;
// }

export type Modules = Module[];

export function isModule(object: unknown): object is Module {
  return (
    typeof object === "object" &&
    object != null &&
    "name" in object &&
    "resources" in object
  );
}
