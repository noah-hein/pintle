import {V1Namespace} from "@kubernetes/client-node";

export class ResourceTemplates {
    createNamespace(name: string): V1Namespace {
        return {
            apiVersion: "v1",
            kind: "Namespace",
            metadata: {
                name
            }
        }
    }
}