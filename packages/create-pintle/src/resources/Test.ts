import "reflect-metadata";
import {V1Namespace} from "@kubernetes/client-node";
import {ResourceTemplates} from "../ResourceTemplates";

function Resource() {
  return Reflect.metadata("foo", "bar")
}

export class Keycloak extends ResourceTemplates {

  @Resource()
  namespace(): V1Namespace {
    return this.createNamespace("keycloak")
  }
}
