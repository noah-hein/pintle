import {OutputFileTypes, Pintle} from "@pintle/core";
import {keycloak} from "./KeycloakService";

function bootstrap() {
  const pintle = new Pintle({
    file: {
      type: OutputFileTypes.JSON
    }
  });
  pintle.add("keycloak", keycloak);
}

bootstrap();
