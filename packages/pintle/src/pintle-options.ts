import {defaultFileOptions, FileOptions} from "./file-type/file-options";

export interface PintleOptions {
  file?: FileOptions;
}

export const defaultPintleOptions: PintleOptions = {
  file: defaultFileOptions,
};
