import { OutputTypes } from "./output";

export interface PintleOptions {
  type?: OutputTypes;
  outputPath?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultPintleOptions: PintleOptions = {
  type: OutputTypes.YAML,
  outputPath: "./generated",
  singleFile: false,
  filename: "resources",
};
