import { defaultOutputOptions, OutputOptions } from "./output";
import { defaultInputOptions, InputOptions } from "./input";

export interface PintleOptions {
  input?: InputOptions;
  output?: OutputOptions;
}

export const defaultPintleOptions: PintleOptions = {
  input: defaultInputOptions,
  output: defaultOutputOptions,
};
