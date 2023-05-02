import { OutputTypes } from "./output";

export interface PintleOptions {
  type?: OutputTypes;
  create?: boolean;
  outputPath?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultPintleOptions: PintleOptions = {
  type: OutputTypes.YAML,
  create: true,
  outputPath: ".",
  singleFile: true,
  filename: "definitions",
};
