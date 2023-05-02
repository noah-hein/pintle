import { YamlFactory } from "./factory/factory.yaml";
import { JsonFactory } from "./factory/factory.json";
import { OutputFactory } from "./output.factory";
import { PintleOptions } from "../pintle.options";
import { ResourceFiles } from "../resource"

export enum OutputTypes {
  JSON = "json",
  YAML = "yaml",
}

export const outputTypes = (
  options: PintleOptions,
  resourceFiles: ResourceFiles
): { [name in OutputTypes]: OutputFactory } => {
  return {
    yaml: new YamlFactory(options, resourceFiles),
    json: new JsonFactory(options, resourceFiles)
  };
};
