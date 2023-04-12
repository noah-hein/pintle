import { defaultFileOptions, FileOptions } from './File';

export interface PintleOptions {
  apply?: boolean;
  file?: FileOptions;
}

export const defaultPintleOptions: PintleOptions = {
  apply: false,
  file: defaultFileOptions,
};
