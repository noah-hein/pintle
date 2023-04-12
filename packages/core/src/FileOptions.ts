export enum OutputFileTypes {
  JSON = "json",
  YAML = "yaml"
}

export interface FileOptions {
  type?: OutputFileTypes;
  create?: boolean;
  outputDir?: string;
  singleFile?: boolean;
  filename?: string;
}

export const defaultFileOptions: FileOptions = {
  type: OutputFileTypes.YAML,
  create: true,
  outputDir: ".",
  singleFile: true,
  filename: "definitions"
}
