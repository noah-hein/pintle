import { PintleFactory } from "./factory";
import { YamlFactory } from "./factory";

export interface PintleConfig {
  outputPath: string;
  factory: { new (): PintleFactory };
}

export const defaultPintleConfig: PintleConfig = {
  outputPath: "./generated",
  factory: YamlFactory,
};
