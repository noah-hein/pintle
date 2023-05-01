import {defaultPintleOptions, PintleOptions} from "@pintle/core";
import * as chalk from "chalk";
import * as path from "path";
import * as ts from 'typescript';
import {discovered} from "./discover";

const fileContents = `
  function greeter(name: string) {
    console.log('Hello, ' + name + '!');
  }

  greeter('TypeScript');
`;

const transpileOptions: ts.TranspileOptions = {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ESNext
  }
};

export class Options {

  public async import(): Promise<PintleOptions> {




    const result = ts.transpileModule(fileContents, transpileOptions);
    console.log(result)


    //const configPath = this.relativeConfigPath();
    //const options = await this.compileConfig(configPath);
    //console.log("options = " + JSON.stringify(options, null, 3));
    return {};
  }

  private async compileConfig(configPath: string) {
    let config = defaultPintleOptions;
    try {
      console.log("Importing config file...");
      console.log(configPath)
      const test: string = "./pintle.cfg";
      const modules = await import(test);
      const imported = modules.options;
      if (imported) {
        config = {
          ...config,
          ...imported,
        };
      }
      console.log("config = " + chalk.blue(JSON.stringify(config, null, 3)));
    } catch (error) {
      console.log(chalk.red("Could not read pintle config options, using default"));
      console.log(error)
    }
    return config;
  }

  private relativeConfigPath(): string {
    const relativeCfgPath = path.relative(discovered.libraryDir, discovered.configPath);
    return relativeCfgPath.replace(".ts", "");
  }
}
