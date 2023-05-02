import { defaultPintleOptions, PintleOptions } from "./pintle.options";
import {
  outputTypes,
  OutputTypes,
} from "./output";
import {ResourceFiles} from "./resource";
import { OutputFactory } from "./output/output.factory";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly resourceFiles: ResourceFiles;

  private readonly options: PintleOptions;

  private readonly factory: OutputFactory;

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
    this.factory = this.selectFactories();
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
    collections?: ResourceFiles
  ): Pintle {
    collections = collections || []
    return new Pintle(defaultPintleOptions, collections);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private build() {
    const type = this.options.type;
    if (type) {
      const resourceFactory = this.factory;
      resourceFactory.build();
    }
  }

  private selectFactories(): OutputFactory {
    const options = this.options;
    const fileType = options.type ? options.type : OutputTypes.YAML;
    return outputTypes(this.options, this.resourceFiles)[fileType];
  }

  private parseOptions(options: PintleOptions) {
    return {
      ...defaultPintleOptions,
      ...options,
    };
  }
}
