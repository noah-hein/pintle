import * as YAML from "yaml";
import * as fs from "fs";
import {ResourceGroup} from "./Resource";

interface PintleOptions {
  createYaml?: boolean;
  apply?: boolean;
  yaml?: YamlOptions;
  services?: object[];

  resourceGroups?: { [key: string]: ResourceGroup }

}

export interface YamlOptions {
  output: string;
  singleFile?: boolean;

}

export class Pintle {

  static create(options: PintleOptions) {
    //
    const resourceGroups = options.resourceGroups;
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

        fs.writeFileSync("test.yaml", yaml)

        //Log resource data

      });
    });




    // resourceGroups?.forEach(resourceGroup => {
    //
    //   console.log(resourceGrou)
    //
    //   //
    //   const resources = Object.entries(resourceGroup);
    //   resources.forEach(resource => {
    //
    //     const name = resource[0];
    //     const definition = resource[1];
    //
    //     const yaml = YAML.stringify(definition)
    //     console.log(yaml)
    //     console.log("---")
    //   });
    // });
  }


}

