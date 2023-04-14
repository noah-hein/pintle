import {defaultPintleOptions, PintleOptions} from './PintleOptions';
import {defaultFileOptions, factoryOptions, FileTypes} from './File';
import {Collections} from './Collection';
import {ResourceFactory} from './ResourceFactory/ResourceFactory';

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly collections: Collections;

  private readonly options: PintleOptions;

  private readonly resourceFactory: ResourceFactory;

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
    console.log("Options:" , options);

    //Build collections
    console.log("Building resources")
    this.build();
    console.log("Finished building resources")
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

  private selectFactories(): ResourceFactory {
    const fileOptions = this.options.file || defaultFileOptions;
    const fileType = fileOptions.type ? fileOptions.type : FileTypes.YAML;
    return factoryOptions(this.options, this.collections)[fileType];
  }

  private parseOptions(options: PintleOptions) {
    options.file = {
      ...defaultFileOptions,
      ...options.file,
    };
    return {
      ...defaultPintleOptions,
      ...options,
    };
  }
}
