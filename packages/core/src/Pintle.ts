import * as YAML from "yaml";
import * as fs from "fs";
import {defaultPintleOptions, parseOptions, PintleOptions} from "./PintleOptions";
import {OutputFileTypes} from "./FileOptions";


export class Pintle {

  constructor(private options: PintleOptions = defaultPintleOptions) {
    //Parse options and log
    this.options = parseOptions(options);
    console.log("Options:", options);
  }

  public add(name: string, resources: object[]) {
    const fileEnding = this.options.file?.type
    const filename = name + "." + fileEnding;
    const location = this.options.file?.outputDir + "/" + filename;

    //Create definition as JSON or YAML
    const definition = (this.options.file?.type === OutputFileTypes.YAML) ?
      YAML.stringify(resources, {

      }) : JSON.stringify(resources, null, 3);



    fs.appendFileSync(location, definition);


    // resources.forEach(definition => {
    //   this.buildDefinition(name, definition);
    // });
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

  // public addAll(resourceGroups: {[key: string]: ResourceGroup }) {
  //   //
  //   const resourceGroupEntries = resourceGroups ? Object.entries(resourceGroups) : [];
  //   resourceGroupEntries.forEach(resourceGroup => {
  //
  //
  //   });
  // }
}

