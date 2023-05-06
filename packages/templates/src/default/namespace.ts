import { V1Namespace } from "@kubernetes/client-node";

export const namespace = (name: string, options?: V1Namespace): V1Namespace => {
  return {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name,
    },
    ...options,
  };
};
