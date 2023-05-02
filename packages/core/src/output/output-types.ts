import { PintleOptions } from "../pintle-options";
import { OutputType } from "./output-type";
import { Yaml } from "./output-types/yaml";
import { Json } from "./output-types/json";
import {ResourceFiles} from "../resource";

export enum OutputTypes {
  JSON = "json",
  YAML = "yaml",
}

export const outputTypes = (
  options: PintleOptions,
  resourceFiles: ResourceFiles
): { [name in OutputTypes]: OutputType } => {
  return {
    yaml: new Yaml(options, resourceFiles),
    json: new Json(options, resourceFiles),
  };
};
