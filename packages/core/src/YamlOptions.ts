export interface YamlOptions {
  create?: boolean;
  outputPath?: string;
  singleFile?: boolean;
}

export const defaultYamlOptions: YamlOptions = {
  create: true,
  outputPath: ".",
  singleFile: true
}
