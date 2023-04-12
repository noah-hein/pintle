import {defaultPintleOptions, parseOptions, PintleOptions} from "./PintleOptions";
import {defaultFileOptions} from "./FileOptions";
import {ResourceGroup} from "./ResourceGroup";
import {ResourceFactory} from "./ResourceFactory/ResourceFactory";
import {factoryOptions, OutputFileTypes} from "./OutputFileTypes";

export class Pintle {

  private options: PintleOptions;

  private resourceGroups: ResourceGroup[] = [];

  private readonly resourceFactory: ResourceFactory;

  constructor(options: PintleOptions = defaultPintleOptions, resourceGroups: {[name: string]: object[]}) {
    //Parse options and log
    this.options = parseOptions(options);
    this.resourceFactory = this.selectFactories();
    console.log("Options:", options);

    //Add and Build
    this.addMany(resourceGroups);
    this.build();
  }

  private add(name: string, resources: object[]) {
    const fileOptions = this.options.file;
    const resourceName = fileOptions?.singleFile ? "" + fileOptions.filename + "" : name;
    const filename = this.determineFilename(resourceName);
    this.resourceGroups.push({
      name,
      resources,
      filename
    });
  }

  private addMany(resourceGroups: {[name: string]: object[]}) {
    const resourceGroupsEntries = Object.entries(resourceGroups);
    resourceGroupsEntries.forEach(entry => {
      const name = entry[0];
      const resources = entry[1];
      this.add(name, resources)
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
    const fileOptions = this.options.file ? this.options.file : defaultFileOptions;
    const fileType = fileOptions.type ? fileOptions.type : OutputFileTypes.YAML;
    const resourceGroups = this.resourceGroups;
    return factoryOptions(fileOptions, resourceGroups)[fileType]
  }

  private determineFilename(name: string) {
    const fileEnding = this.options.file?.type;
    const fileWithEnding = name + "." + fileEnding;
    return this.options.file?.outputDir + "/" + fileWithEnding;
  }
}

