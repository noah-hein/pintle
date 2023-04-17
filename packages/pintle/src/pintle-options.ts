import {defaultOutputOptions, OutputOptions} from "./output";

export interface PintleOptions {
  file?: OutputOptions;
}

export const defaultPintleOptions: PintleOptions = {
  file: defaultOutputOptions,
};
