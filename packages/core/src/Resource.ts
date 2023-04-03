import {V1ObjectMeta} from "@kubernetes/client-node/dist/gen/model/v1ObjectMeta";
import "reflect-metadata";

export function Resource() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {


    return descriptor;
  }
}

export function Service(metadata: V1ObjectMeta) {
  return (constructor: Function) => {
    constructor.prototype.metadata = metadata;
  }
}
