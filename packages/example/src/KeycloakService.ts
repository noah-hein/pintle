import {ResourceGroup, ResourceTemplates } from "@pintle/core";
import {V1Deployment} from "@kubernetes/client-node";

const deployment: V1Deployment = {
  apiVersion: "apps/v1",
  kind: "Deployment",
  metadata: {
    name: "hello-world",
    labels: {
      app: "hello-world"
    }
  },
  spec: {
    replicas: 1,
    template: {
      metadata: {
        labels: {
          app: "hello-world"
        }
      }
    },
    selector: {
      matchLabels: {
        app: "hello-world"
      }
    }
  },
}

export const keycloak: ResourceGroup = {
  namespace: ResourceTemplates.createNamespace("keycloak"),
  deployment: deployment
}

// @Service({
//   namespace: "keycloak"
// })
// export class KeycloakService {
//
//   constructor() {
//
//   }
//
//   @Resource()
//   deployment() {
//
//   }
//
// }
