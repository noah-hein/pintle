import { defaultPintleOptions, PintleOptions } from "./pintle-options";
import { Collections } from "./collection";
import {
  OutputType,
  outputTypes,
  OutputTypes,
  defaultOutputOptions,
} from "./output";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly collections: Collections;

  private readonly options: PintleOptions;

  private readonly resourceFactory: OutputType;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(
    options: PintleOptions = defaultPintleOptions,
    collections: Collections
  ) {
    //Parse options and log
    this.collections = collections;
    this.options = this.parseOptions(options);
    this.resourceFactory = this.selectFactories();
    console.log("Options:", options);

    //Build collections
    console.log("Building collections");
    this.build();
    console.log("Finished building collections");
  }

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public static create(
    options: PintleOptions = defaultPintleOptions,
    collections: Collections
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
    return outputTypes(this.options, this.collections)[fileType];
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
