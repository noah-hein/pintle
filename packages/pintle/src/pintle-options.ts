import {defaultFileOptions, FileOptions} from "./file-type";

export interface PintleOptions {
  file?: FileOptions;
}

export const defaultPintleOptions: PintleOptions = {
  file: defaultFileOptions,
};
