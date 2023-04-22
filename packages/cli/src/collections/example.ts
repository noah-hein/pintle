import { ResourceFile, Resources, Templates } from "pintle";

export class Example extends ResourceFile {
  resources(): Resources {
    return [Templates.namespace("foobar")];
  }
}
