import { defaultOutputOptions, OutputOptions } from "./output";
import {InputOptions} from "./input";

export interface PintleOptions {
  input?: InputOptions;
  output?: OutputOptions;
}

export const defaultPintleOptions: PintleOptions = {
  output: defaultOutputOptions,
};
