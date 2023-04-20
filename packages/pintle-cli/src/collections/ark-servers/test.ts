import {ResourceFile, Resources, Templates} from "pintle";

export class Test extends ResourceFile {
  resources(): Resources {
    return [
      Templates.namespace("island"),
      Templates.namespace("extinction")
    ];
  }
}
