import { defaultPintleOptions, PintleOptions } from "@pintle/core";

export class Options {
  private optionsPath = "./pintle.cfg";

  public async import() {
    let config = defaultPintleOptions;
    try {
      const modules = await import(this.optionsPath);
      const importedOptions = modules.options;
      if (importedOptions) {
        config = {
          ...config,
          ...importedOptions,
        };
      }
    } catch (error) {
      console.error("Could not read pintle config options, using default");
    }
    return config;
  }
}
