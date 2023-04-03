import {V1ObjectMeta} from "@kubernetes/client-node/dist/gen/model/v1ObjectMeta";
import "reflect-metadata";

export function Resource() {
  return Reflect.metadata("foo", "bar");
}

export function Service(metadata: V1ObjectMeta) {
  return (fn: Function) => {
    console.log("foobar");
  }
}
