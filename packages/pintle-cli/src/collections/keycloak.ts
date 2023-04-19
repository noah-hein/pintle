import {ResourceFile, Resources, Templates} from "pintle";

export class Keycloak extends ResourceFile {
  resources(): Resources {
    return [
      Templates.namespace("foobar")
    ]
  }
}
