import {PintleFactory} from "./factory/factory";
import {YamlFactory} from "./factory/factory.yaml";

export interface PintleConfig {
  outputPath: string;
  factory: { new() : PintleFactory }
}

export const defaultPintleConfig: PintleConfig = {
  outputPath: "./generated",
  factory: YamlFactory
};
