import { YamlOutputFactory } from "./output-factory.yaml";
import { JsonOutputFactory } from "./output-factory.json";
import { OutputFactory } from "./output-factory";
import { PintleOptions } from "../pintle-options";
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
    yaml: new YamlOutputFactory(options, resourceFiles),
    json: new JsonOutputFactory(options, resourceFiles)
  };
};
