import {OutputFileTypes, Pintle} from "@pintle/core";
import {keycloak} from "./KeycloakService";

function bootstrap() {
  const pintle = new Pintle({
    file: {
      singleFile: true,
      type: OutputFileTypes.YAML
    }
  });
  pintle.add("keycloak", keycloak);
  pintle.build();
}

bootstrap();
