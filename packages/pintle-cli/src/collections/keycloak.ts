import {Collection, Templates} from "pintle";

export const Keycloak: Collection = {
  name: "keycloak",
  resources: [Templates.namespace("keycloak")],
};
