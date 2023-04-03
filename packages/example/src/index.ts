import {Pintle} from "@pintle/core";
import {KeycloakService} from "./KeycloakService";
import {MySQLService} from "./MySQLService";

function bootstrap() {


  const service = KeycloakService;
  console.log()

  Pintle.create({
    createYaml: true,
    push: false,
    services: [
      MySQLService,
      KeycloakService
    ]
  })
}
bootstrap();
