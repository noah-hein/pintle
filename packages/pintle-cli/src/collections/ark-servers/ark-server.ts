import {ResourceFile, Resources, Templates} from "pintle";

export class ArkServer extends ResourceFile {
  resources(): Resources {
    return [
      Templates.namespace("island"),
      Templates.namespace("extinction")
    ];
  }
}
