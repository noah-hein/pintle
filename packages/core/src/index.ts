
export * from "./pintle";
export * from "./pintle.options";
export * from "./resource";
export * from "./util";
export * from "./output"


import {Pintle} from "./pintle";
import { Templates } from "@pintle/templates";


Pintle.create([
  {
    name: "foobar",
    resources: [Templates.namespace]
  }
]);
