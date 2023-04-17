import { defaultPintleOptions, PintleOptions } from "./pintle-options";
import { Collections } from "./collection";
import {OutputType} from "./output/output-type";
import {outputTypes, OutputTypes} from "./output";
import {defaultOutputOptions} from "./output";

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
    const type = this.options.file?.type;
    if (type) {
      const resourceFactory = this.resourceFactory;
      resourceFactory.build();
    }
  }

  private selectFactories(): OutputType {
    const fileOptions = this.options.file || defaultOutputOptions;
    const fileType = fileOptions.type ? fileOptions.type : OutputTypes.YAML;
    return outputTypes(this.options, this.collections)[fileType];
  }

  private parseOptions(options: PintleOptions) {
    options.file = {
      ...defaultOutputOptions,
      ...options.file,
    };
    return {
      ...defaultPintleOptions,
      ...options,
    };
  }
}
