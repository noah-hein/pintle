import {Pintle} from "@pintle/core";
import {KeycloakService} from "./KeycloakService";

function bootstrap() {
  Pintle.create({
    createYaml: true,
    push: false,
    services: [
      KeycloakService
    ]
  })
}
bootstrap();
