import { defaultFileOptions, FileOptions } from './File';

export interface PintleOptions {
  file?: FileOptions;
}

export const defaultPintleOptions: PintleOptions = {
  file: defaultFileOptions,
};
