import {Collection, Templates} from "pintle";

export const keycloak: Collection = {
  name: "keycloak",
  resources: [Templates.namespace("keycloak")],
};

export default keycloak;
