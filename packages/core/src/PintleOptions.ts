import {defaultYamlOptions, YamlOptions} from "./YamlOptions";

export interface PintleOptions {
  apply?: boolean;
  yaml?: YamlOptions;

}

export const defaultPintleOptions: PintleOptions = {
  apply: false,
  yaml: defaultYamlOptions
}

export function parseOptions(options: PintleOptions) {
  options.yaml = {
    ...defaultYamlOptions,
    ...options.yaml
  }
  return {
    ...defaultPintleOptions,
    ...options
  }
}
