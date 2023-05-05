import {Pintle} from "./pintle";
import {Templates} from "@pintle/templates";

Pintle.create([
  {
    name: "foobar",
    resources: [
      Templates.namespace("foobar")
    ]
  }
]);
