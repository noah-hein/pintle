import {V1ObjectMeta} from "@kubernetes/client-node/dist/gen/model/v1ObjectMeta";
import "reflect-metadata";


interface ResourceStorage {
  name: string,
  metadata: V1ObjectMeta
}

export const resources: ResourceStorage[] = [];

export function Resource() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    //console.log(key)
    return descriptor;
  }
}

export function Service(metadata: V1ObjectMeta) {
  return (constructor: { name: string; }) => {
    const name = constructor.name;
    if (name) {
      resources.push({
        name,
        metadata
      })
    }
  }
}
