export interface YamlOptions {
  create?: boolean;
  outputDir?: string;
  singleFile?: boolean;
}

export const defaultYamlOptions: YamlOptions = {
  create: true,
  outputDir: ".",
  singleFile: true
}
