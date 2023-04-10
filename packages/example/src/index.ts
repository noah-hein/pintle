import {Pintle, Resource} from "@pintle/core";
import {keycloak } from "./KeycloakService";
import {V1Namespace} from "@kubernetes/client-node";

function bootstrap() {

  Pintle.create({
    createYaml: true,
    apply: false,
    resourceGroups: {
      keycloak
    }
  });
}

bootstrap();
