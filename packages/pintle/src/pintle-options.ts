import { defaultOutputOptions, OutputOptions } from "./output";

export interface PintleOptions {
  output?: OutputOptions;
}

export const defaultPintleOptions: PintleOptions = {
  output: defaultOutputOptions,
};
