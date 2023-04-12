import {FileTypes, Pintle} from "@pintle/core";
import {keycloak} from "./KeycloakService";

Pintle.create({
  file: {
    outputDir: "dist/test",
    singleFile: true,
    type: FileTypes.YAML
  }
}, {
  keycloak
});
