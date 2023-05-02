import * as process from "process";
import * as path from "path";

export interface Discover {
  /**
   * Current working directory
   * (where node command was run)
   */
  workDir: string;

  /**
   * Location of cli source folder.
   * Typically, in the node modules
   */
  libraryDir: string;

  /**
   * Location of config file
   */
  configPath: string;

  /**
   * Location of where the src folder is located
   */
  collectionsDir: string;
}

export function discover(): Discover {
  const workDir = process.cwd();
  const libraryDir = __dirname;
  const configPath = path.join(workDir, "pintle.cfg.ts");
  const collectionsDir = path.join(workDir, "src");
  return {
    workDir,
    libraryDir,
    configPath,
    collectionsDir
  }
}

export const discovered = discover();
