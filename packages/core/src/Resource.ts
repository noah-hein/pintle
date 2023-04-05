import {V1ObjectMeta} from "@kubernetes/client-node/dist/gen/model/v1ObjectMeta";
import "reflect-metadata";
import {V1Namespace} from "@kubernetes/client-node";

interface Service {
  name: string,
  options: ServiceOptions
}

export interface ServiceOptions {
  namespace: string;
}

export const services: Service[] = [];
export function Service(options: ServiceOptions) {
  return (constructor: { name: string; }) => {
    const name = constructor.name;
    if (name) {
      services.push({
        name,
        options
      })
    }
  }
}






export function Resource() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    //console.log(key)
    return descriptor;
  }
}
