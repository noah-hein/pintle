import {JsonResourceFactory} from "./ResourceFactory/JsonResourceFactory";
import {FileOptions} from "./FileOptions";
import {ResourceGroup} from "./ResourceGroup";
import {YamlResourceFactory} from "./ResourceFactory/YamlResourceFactory";
import {ResourceFactory} from "./ResourceFactory/ResourceFactory";

export enum OutputFileTypes {
  JSON = "json",
  YAML = "yaml"
}

export const factoryOptions = (
  fileOptions: FileOptions,
  resourceGroups: ResourceGroup[]
): {[name in OutputFileTypes]: ResourceFactory} => {
  return {
    yaml: new YamlResourceFactory(fileOptions, resourceGroups),
    json: new JsonResourceFactory(fileOptions, resourceGroups),
  }
}
