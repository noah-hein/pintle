import {Collections} from './Collection';
import { ResourceFactory } from './ResourceFactory/ResourceFactory';
import { YamlResourceFactory } from './ResourceFactory/YamlResourceFactory';
import { JsonResourceFactory } from './ResourceFactory/JsonResourceFactory';
import {PintleOptions} from "./PintleOptions";

export enum FileTypes {
  JSON = 'json',
  YAML = 'yaml',
}

export const factoryOptions = (
  options: PintleOptions,
  collections: Collections
): { [name in FileTypes]: ResourceFactory } => {
  return {
    yaml: new YamlResourceFactory(options, collections),
    json: new JsonResourceFactory(options, collections),
  };
};

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
  outputDir: '.',
  singleFile: true,
  filename: 'definitions',
};
