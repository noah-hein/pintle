import {Pintle, Resource} from "@pintle/core";
import {keycloak } from "./KeycloakService";
import {V1Namespace} from "@kubernetes/client-node";

function bootstrap() {

  const k8 = new Pintle();
  k8.create({
    apply: true,
    yaml: {
      singleFile: false
    }
  }, {
    keycloak
  });
}

bootstrap();
