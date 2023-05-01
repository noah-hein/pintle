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
   * Source folder for the current library.
   */
  librarySrcDir: string;

  /**
   * Location of config file
   */
  configPath: string;
}

export function discover(): Discover {
  const workDir = process.cwd();
  const librarySrcDir = __dirname;
  const libraryDir = path.normalize(path.join(librarySrcDir, '..'));
  const configPath = path.join(workDir, "pintle.cfg.ts");
  return {
    workDir,
    librarySrcDir,
    libraryDir,
    configPath
  }
}

export const discovered = discover();
