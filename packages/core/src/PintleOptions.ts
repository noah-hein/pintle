import {defaultFileOptions, FileOptions} from "./FileOptions";

export interface PintleOptions {
  apply?: boolean;
  file?: FileOptions;

}

export const defaultPintleOptions: PintleOptions = {
  apply: false,
  file: defaultFileOptions
}

export function parseOptions(options: PintleOptions) {
  options.file = {
    ...defaultFileOptions,
    ...options.file
  }
  return {
    ...defaultPintleOptions,
    ...options
  }
}
