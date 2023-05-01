import * as process from "process";
import * as path from "path";

export interface Discover {
  /**
   * Current working directory
   * (where node command was run)
   */
  workDir: string;

  /**
   * Location of where this is in the current module.
   */
  libraryDir: string;

  /**
   * Location of config file
   */
  configPath: string;
}

export function discover(): Discover {
  const workDir = process.cwd();
  const libraryDir = __dirname;
  const configPath = path.join(workDir, "pintle.cfg.ts")
  return {
    workDir,
    libraryDir,
    configPath
  }
}

export const discovered = discover();
