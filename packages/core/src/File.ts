import {ResourceGroup} from "./Resource/ResourceGroup";
import {ResourceFactory} from "./ResourceFactory/ResourceFactory";
import {YamlResourceFactory} from "./ResourceFactory/YamlResourceFactory";
import {JsonResourceFactory} from "./ResourceFactory/JsonResourceFactory";

export enum FileTypes {
  JSON = "json",
  YAML = "yaml"
}

export const factoryOptions = (
  fileOptions: FileOptions,
  resourceGroups: ResourceGroup[]
): { [name in FileTypes]: ResourceFactory } => {
  return {
    yaml: new YamlResourceFactory(fileOptions, resourceGroups),
    json: new JsonResourceFactory(fileOptions, resourceGroups),
  }
}

export interface FileOptions {
  type?: FileTypes;
  create?: boolean;
  outputDir?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultFileOptions: FileOptions = {
  type: FileTypes.YAML,
  create: true,
  outputDir: ".",
  singleFile: true,
  filename: "definitions"
}
