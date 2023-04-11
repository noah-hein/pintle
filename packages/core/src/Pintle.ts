import * as YAML from "yaml";
import * as fs from "fs";
import {defaultPintleOptions, parseOptions, PintleOptions} from "./PintleOptions";
import {OutputFileTypes} from "./FileOptions";

interface ResourceGroups {
  name: string;
  resources: object[];
  filename: string;
}

export class Pintle {

  private options: PintleOptions;

  private resourceGroups: ResourceGroups[] = [];

  constructor(options: PintleOptions = defaultPintleOptions) {
    //Parse options and log
    this.options = parseOptions(options);
    console.log("Options:", options);
  }

  public add(name: string, resources: object[]) {
    const filename = this.determineFilename(name);
    this.resourceGroups.push({
      name,
      resources,
      filename
    });

    //Create definition as JSON or YAML
    // const definition = (this.options.file?.type === OutputFileTypes.YAML) ?
    //   YAML.stringify(resources, {
    //
    //   }) : JSON.stringify(resources, null, 3);



    //fs.appendFileSync(location, definition);


    // resources.forEach(definition => {
    //   this.buildDefinition(name, definition);
    // });
  }

  public addMany(resourceArray: {[name: string]: object[]}) {
    const resourceEntries = Object.entries(resourceArray);
    resourceEntries.forEach(entry => {
      const name = entry[0];
      const resources = entry[1];
      this.add(name, resources)
    });
  }

  public buildYaml() {
    this.resourceGroups.forEach(resourceGroup => {
      const filename = resourceGroup.filename;
      fs.appendFileSync(resourceGroup.filename, "---\r\n");
    });
  }

  public buildJson() {

  }

  private buildDefinition(name: string, resource: object) {
    const fileEnding = this.options.file?.type
    const filename = name + "." + fileEnding;
    const location = this.options.file?.outputDir + "/" + filename;

    //Create definition as JSON or YAML
    const definition = (this.options.file?.type === OutputFileTypes.YAML) ?
      YAML.stringify(resource) : JSON.stringify(resource);

    //Write definition to file
    switch (this.options.file?.type) {
      case OutputFileTypes.YAML:
        fs.appendFileSync(location, definition + "---\r\n");
        break;
      case OutputFileTypes.JSON:
        fs.appendFileSync(location, definition);
        break;
    }
  }

  determineFilename(name: string) {
    const fileEnding = this.options.file?.type;
    const fileWithEnding = name + "." + fileEnding;
    return this.options.file?.outputDir + "/" + fileWithEnding;
  }
}

