import { ResourceFile, Resources, Templates } from "pintle";

export class Island extends ResourceFile {
  resources(): Resources {
    return [Templates.namespace("something")];
  }
}
