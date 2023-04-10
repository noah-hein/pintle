import {Pintle, Resource} from "@pintle/core";
import {keycloak } from "./KeycloakService";
import {V1Namespace} from "@kubernetes/client-node";

function bootstrap() {

  const pintle = new Pintle({
    apply: true,
    yaml: {
      singleFile: false
    }
  });
  pintle.addAll({
    keycloak
  });
}

bootstrap();
