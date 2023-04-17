import {PintleOptions} from "../../pintle-options";
import {Collections} from "../../collection";
import {Yaml} from "./yaml";
import {Json} from "./json";
import {OutputType} from "../output-type";

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

