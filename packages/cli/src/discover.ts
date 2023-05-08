import * as process from "process";
import * as path from "path";
import { defaultPintleConfig, PintleConfig } from "@pintle/core";
import * as chalk from "chalk";

export interface Discover {
  /**
   * Current working directory
   * (where node command was patch)
   */
  workDir: string;

  /**
   * Location of cli source folder.
   * Typically, in the node modules
   */
  librarySrcPath: string;

  /**
   * Path of the entire cli library.
   */
  libraryPath: string;

  /**
   * Path to the cli templates folder.
   * Storage for default starter template.
   */
  templatePath: string;
}

const TEMPLATE = "packages/starter/src/default";

export function discover(): Discover {
  const workDir = process.cwd();
  const librarySrcPath = __dirname;
  const libraryPath = path.resolve(librarySrcPath, "../");
  const templatePath = path.join(libraryPath, TEMPLATE);
  return {
    workDir,
    librarySrcPath,
    libraryPath,
    templatePath
  };
}

export const discovered = discover();
