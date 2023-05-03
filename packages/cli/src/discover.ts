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
  librarySrcPath: string;

  /**
   * Path of the entire cli library.
   */
  libraryPath: string;

  /**
   * Location of config file
   */
  configPath: string;

  /**
   * Path to the cli templates folder.
   * Storage for default starter template.
   */
  templatePath: string;
}

const TEMPLATE = "packages/starter/src/default";
const CONFIG_FILE_NAME = "pintle.cfg.json";

export function discover(): Discover {
  const workDir = process.cwd();
  const librarySrcPath = __dirname;
  const libraryPath = path.resolve(librarySrcPath, "../");
  const templatePath = path.join(libraryPath, TEMPLATE);
  const configPath = path.join(workDir, CONFIG_FILE_NAME);
  return {
    workDir,
    librarySrcPath,
    libraryPath,
    templatePath,
    configPath
  }
}

export const discovered = discover();
