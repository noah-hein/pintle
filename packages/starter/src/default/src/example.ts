import { Module } from "@pintle/core";
import { DefaultTemplates } from "@pintle/templates";

const name = "hello-world";
export const HelloWorld: Module = {
  name: name,
  resources: [DefaultTemplates.namespace(name)],
  modules: [],
};
