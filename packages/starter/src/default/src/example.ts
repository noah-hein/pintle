import { ResourceFile } from "@pintle/core";
import { Templates } from "@pintle/templates";

const name = "hello-world";
export const HelloWorld: ResourceFile = {
  name: name,
  resources: [
    Templates.namespace(name)
  ],
  files: []
}


