import { defaultPintleOptions, PintleOptions } from "./pintle-options";
import {
  OutputType,
  outputTypes,
  OutputTypes,
  defaultOutputOptions,
} from "./output";
import {ResourceFiles} from "./resource";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly resourceFiles: ResourceFiles;

  private readonly options: PintleOptions;

  private readonly resourceFactory: OutputType;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(
    options: PintleOptions = defaultPintleOptions,
    resourceFiles: ResourceFiles
  ) {
    //Parse options and log
    this.resourceFiles = resourceFiles;
    this.options = this.parseOptions(options);
    this.resourceFactory = this.selectFactories();
    console.log("Options:", options);

    //Build resourceFiles
    console.log("Building resourceFiles");
    this.build();
    console.log("Finished building resource files");
  }

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public static create(
    options: PintleOptions = defaultPintleOptions,
    collections: ResourceFiles
  ): Pintle {
    return new Pintle(options, collections);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private build() {
    const type = this.options.output?.type;
    if (type) {
      const resourceFactory = this.resourceFactory;
      resourceFactory.build();
    }
  }

  private selectFactories(): OutputType {
    const outputOptions = this.options.output || defaultOutputOptions;
    const fileType = outputOptions.type ? outputOptions.type : OutputTypes.YAML;
    return outputTypes(this.options, this.resourceFiles)[fileType];
  }

  private parseOptions(options: PintleOptions) {
    options.output = {
      ...defaultOutputOptions,
      ...options.output,
    };
    return {
      ...defaultPintleOptions,
      ...options,
    };
  }
}
