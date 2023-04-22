import { ResourceFile, Resources } from "@pintle/core";
import { Templates } from "@pintle/templates";

export class Example extends ResourceFile {
  resources(): Resources {
    return [Templates.namespace("foobar")];
  }
}
