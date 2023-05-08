import { PintleFactory } from "./factory";
import { YamlFactory } from "./factory";
import * as chalk from "chalk";
import * as path from "path";
import * as process from "process";
import { Module } from "./module";

export interface PintleConfig {
  outputPath: string;
  main: string;
  factory: { new (): PintleFactory };
}

export const defaultPintleConfig: PintleConfig = {
  outputPath: "./generated",
  main: "src/main",
  factory: YamlFactory,
};

export function isPintleConfig(object: unknown): object is Module {
  return (
    typeof object === "object" &&
    object != null &&
    "outputPath" in object &&
    "main" in object &&
    "factory" in object
  );
}

export async function findConfig(): Promise<PintleConfig> {
  let importedConfig = defaultPintleConfig;

  //Establish path to config from library
  const configPath = path.join(process.cwd(), "pintle.config");
  const configPathRelative = path.relative(__dirname, configPath);

  //Attempt to import path
  try {
    const importedFile = await import(configPathRelative);
    const defaultObject = importedFile["default"] as PintleConfig;
    if (isPintleConfig(defaultObject)) importedConfig = defaultObject;
  } catch (e) {
    console.log(chalk.yellow("Could not find config file, using default"));
  }
  return importedConfig;
}
