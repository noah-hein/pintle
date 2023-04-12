import {defaultPintleOptions, parseOptions, PintleOptions} from "./PintleOptions";
import {defaultFileOptions, OutputFileTypes} from "./FileOptions";
import {ResourceGroup} from "./ResourceGroup";
import {ResourceFactory} from "./ResourceFactory/ResourceFactory";
import {YamlResourceFactory} from "./ResourceFactory/YamlResourceFactory";
import {JsonResourceFactory} from "./ResourceFactory/JsonResourceFactory";

export class Pintle {

  private options: PintleOptions;

  private resourceGroups: ResourceGroup[] = [];

  private resourceFactory: ResourceFactory;

  constructor(options: PintleOptions = defaultPintleOptions) {
    //Parse options and log
    this.options = parseOptions(options);
    this.resourceFactory = this.selectFactories();
    console.log("Options:", options);
  }

  public add(name: string, resources: object[]) {
    const filename = this.determineFilename(name);
    this.resourceGroups.push({
      name,
      resources,
      filename
    });
  }

  public addMany(resourceArray: {[name: string]: object[]}) {
    const resourceEntries = Object.entries(resourceArray);
    resourceEntries.forEach(entry => {
      const name = entry[0];
      const resources = entry[1];
      this.add(name, resources)
    });
  }

  // public buildYaml() {
  //   this.resourceGroups.forEach(resourceGroup => {
  //     const filename = resourceGroup.filename;
  //     const resources = resourceGroup.resources;
  //
  //     //Clear out yaml
  //     if (fs.existsSync(filename)) {
  //       fs.truncateSync(filename, 0);
  //     }
  //
  //     //Add resources to yaml
  //     fs.appendFileSync(resourceGroup.filename, "---\r\n");
  //     resources.forEach(resource => {
  //       const resourceYaml = YAML.stringify(resource);
  //       fs.appendFileSync(resourceGroup.filename, resourceYaml);
  //       fs.appendFileSync(resourceGroup.filename, "---\r\n");
  //     });
  //   });
  // }

  // public build() {
  //   this.resourceGroups.forEach(resourceGroup => {
  //     const filename = resourceGroup.filename;
  //     const resources = resourceGroup.resources;
  //
  //     //Clear out yaml
  //     if (fs.existsSync(filename)) {
  //       fs.truncateSync(filename, 0);
  //     }
  //
  //     //Determine how many files to generate
  //     if (this.options.file?.singleFile) {
  //
  //     } else {
  //
  //     }
  //   });
  // }

  public build() {
    const type = this.options.file?.type;
    if (type) {

      const resourceFactory = this.resourceFactory.getResourceGroups();

    }
  }

  private selectFactories(): ResourceFactory {
    const fileOptions = this.options.file ? this.options.file : defaultFileOptions;
    const resourceGroups = this.resourceGroups;

    //Select factory
    let factory;
    switch (fileOptions.type) {
      case OutputFileTypes.JSON:
        factory = new JsonResourceFactory(fileOptions, resourceGroups);
        break;
      default:
        factory = new YamlResourceFactory(fileOptions, resourceGroups);
        break;
    }
    return factory;
  }

  // private buildDefinition(name: string, resource: object) {
  //   const fileEnding = this.options.file?.type
  //   const filename = name + "." + fileEnding;
  //   const location = this.options.file?.outputDir + "/" + filename;
  //
  //   //Create definition as JSON or YAML
  //   const definition = (this.options.file?.type === OutputFileTypes.YAML) ?
  //     YAML.stringify(resource) : JSON.stringify(resource);
  //
  //   //Write definition to file
  //   switch (this.options.file?.type) {
  //     case OutputFileTypes.YAML:
  //       fs.appendFileSync(location, definition + "---\r\n");
  //       break;
  //     case OutputFileTypes.JSON:
  //       fs.appendFileSync(location, definition);
  //       break;
  //   }
  // }

  private determineFilename(name: string) {
    const fileEnding = this.options.file?.type;
    const fileWithEnding = name + "." + fileEnding;
    return this.options.file?.outputDir + "/" + fileWithEnding;
  }
}

