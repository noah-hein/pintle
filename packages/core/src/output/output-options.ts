import { OutputTypes } from "./output-types";

export interface OutputOptions {
  type?: OutputTypes;
  create?: boolean;
  dir?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultOutputOptions: OutputOptions = {
  type: OutputTypes.YAML,
  create: true,
  dir: ".",
  singleFile: true,
  filename: "definitions",
};
