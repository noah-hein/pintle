import { PintleOptions } from "../pintle-options";
import { Collections } from "../collection";
import { OutputType } from "./output-type";
import {Yaml} from "./output-types/yaml";
import {Json} from "./output-types/json";

export enum OutputTypes {
  JSON = "json",
  YAML = "yaml",
}

export const outputTypes = (
  options: PintleOptions,
  collections: Collections
): { [name in OutputTypes]: OutputType } => {
  return {
    yaml: new Yaml(options, collections),
    json: new Json(options, collections),
  };
};
