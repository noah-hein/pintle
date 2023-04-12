import {OutputFileTypes, Pintle} from "@pintle/core";
import {keycloak} from "./KeycloakService";

function bootstrap() {
  const pintle = new Pintle({
    file: {
      outputDir: "dist/resources",
      singleFile: true,
      type: OutputFileTypes.YAML
    }
  });
  pintle.add("keycloak", keycloak);
  pintle.add("foobar", keycloak);
  pintle.build();
}

bootstrap();
