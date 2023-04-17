import {PintleOptions} from "../pintle-options";
import {Collections} from "../collection";
import {Yaml} from "./yaml";
import {Json} from "./json";
import {FileType} from "./file-type";

export enum FileTypes {
  JSON = "json",
  YAML = "yaml",
}

export const fileTypes = (
  options: PintleOptions,
  collections: Collections
): { [name in FileTypes]: FileType } => {
  return {
    yaml: new Yaml(options, collections),
    json: new Json(options, collections),
  };
};

