import { Collection, Templates } from "pintle";

export const arkWorld = (name: string): Collection => ({
  name,
  resources: [
    Templates.createNamespace(name),
    {
      apiVersion: "apps/v1",
      kind: "Deployment",
      metadata: {
        name: name,
        labels: {
          app: name,
        },
      },
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              app: name,
            },
          },
        },
        selector: {
          matchLabels: {
            app: name,
          },
        },
      },
    },
  ],
});
