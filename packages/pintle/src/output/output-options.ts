import {OutputTypes} from "./output-types";

export interface OutputOptions {
  type?: OutputTypes;
  create?: boolean;
  outputDir?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultOutputOptions: OutputOptions = {
  type: OutputTypes.YAML,
  create: true,
  outputDir: ".",
  singleFile: true,
  filename: "definitions",
};
