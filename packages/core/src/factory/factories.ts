import { PintleFactoryConstructor } from "./factory";
import { YamlFactory } from "./factory.yaml";
import { YamlSingleFactory } from "./factory.yaml-single";


export enum Factories {
  YAML = "yaml",
  YAML_SINGLE = "yaml_single"
}

export const factories: {[key in string]: PintleFactoryConstructor} = {
  yaml: YamlFactory,
  yaml_single: YamlSingleFactory
}
