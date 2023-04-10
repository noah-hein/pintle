import * as YAML from "yaml";
import * as fs from "fs";
import {ResourceGroup} from "./Resource";
import {defaultPintleOptions, parseOptions, PintleOptions} from "./PintleOptions";
import {defaultYamlOptions} from "./YamlOptions";



export class Pintle {

  create(
    options: PintleOptions = defaultPintleOptions,
    resourceGroups: {[key: string]: ResourceGroup }
  ) {
    //Parse options and log
    parseOptions(options);
    console.log("Options:", options);





    //
    const resourceGroupEntries = resourceGroups ? Object.entries(resourceGroups) : [];
    resourceGroupEntries.forEach(resourceGroup => {

      const resourceGroupName = resourceGroup[0];
      const resources = Object.entries(resourceGroup[1]);

      resources.forEach(resource => {
        //Get resource data
        const resourceName = resource[0];
        const definition = resource[1];

        //Convert to yaml
        const yaml = YAML.stringify(definition)
        //console.log(yaml)
        //console.log("---")

        //fs.writeFileSync("", yaml)

        //Log resource data

      });
    });
  }
}

