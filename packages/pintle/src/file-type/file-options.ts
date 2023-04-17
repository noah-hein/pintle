import {FileTypes} from "./file-types";

export interface FileOptions {
  type?: FileTypes;
  create?: boolean;
  outputDir?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultFileOptions: FileOptions = {
  type: FileTypes.YAML,
  create: true,
  outputDir: ".",
  singleFile: true,
  filename: "definitions",
};
