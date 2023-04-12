import {OutputFileTypes, Pintle} from "@pintle/core";
import {keycloak} from "./KeycloakService";

function bootstrap() {
  const pintle = new Pintle({
    file: {
      outputDir: "dist/test",
      singleFile: true,
      type: OutputFileTypes.YAML
    }
  });
  pintle.add("keycloak", keycloak);
  pintle.add("foobar", keycloak);
  pintle.build();
}

bootstrap();
