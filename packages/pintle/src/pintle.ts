import { defaultPintleOptions, PintleOptions } from "./pintle-options";
import { Collections } from "./collection";
import {FileType} from "./file-type/file-type";
import {fileTypes, FileTypes} from "./file-type/file-types";
import {defaultFileOptions} from "./file-type/file-options";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly collections: Collections;

  private readonly options: PintleOptions;

  private readonly resourceFactory: FileType;

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

  private selectFactories(): FileType {
    const fileOptions = this.options.file || defaultFileOptions;
    const fileType = fileOptions.type ? fileOptions.type : FileTypes.YAML;
    return fileTypes(this.options, this.collections)[fileType];
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
