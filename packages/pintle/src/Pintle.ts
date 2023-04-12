import { defaultPintleOptions, PintleOptions } from './PintleOptions';
import { defaultFileOptions, factoryOptions, FileTypes } from './File';
import { Collection, Collections } from './Collection';
import { ResourceFactory } from './ResourceFactory/ResourceFactory';

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private options: PintleOptions;

  private collections: Collection[] = [];

  private readonly resourceFactory: ResourceFactory;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(
    options: PintleOptions = defaultPintleOptions,
    collections: Collections
  ) {
    //Parse options and log
    this.options = this.parseOptions(options);
    this.resourceFactory = this.selectFactories();
    console.log('Options:', options);

    //Add and Build
    this.addMany(collections);
    this.build();
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

  private add(name: string, resources: object[]) {
    const fileOptions = this.options.file;
    const resourceName = fileOptions?.singleFile
      ? '' + fileOptions.filename + ''
      : name;
    const filename = this.determineFilename(resourceName);
    this.collections.push({
      name,
      resources,
      filename,
    });
  }

  private addMany(collections: Collections) {
    const resourceGroupsEntries = Object.entries(collections);
    resourceGroupsEntries.forEach((entry) => {
      const name = entry[0];
      const resources = entry[1];
      this.add(name, resources);
    });
  }

  private build() {
    const type = this.options.file?.type;
    if (type) {
      const resourceFactory = this.resourceFactory;
      resourceFactory.build();
    }
  }

  private selectFactories(): ResourceFactory {
    const fileOptions = this.options.file
      ? this.options.file
      : defaultFileOptions;
    const fileType = fileOptions.type ? fileOptions.type : FileTypes.YAML;
    const resourceGroups = this.collections;
    return factoryOptions(fileOptions, resourceGroups)[fileType];
  }

  private determineFilename(name: string) {
    const fileEnding = this.options.file?.type;
    const fileWithEnding = name + '.' + fileEnding;
    return this.options.file?.outputDir + '/' + fileWithEnding;
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
