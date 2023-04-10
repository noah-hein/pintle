import * as YAML from "yaml";
import {ResourceGroup} from "./Resource";

interface PintleOptions {
  createYaml?: boolean;
  push?: boolean;
  services?: object[];

  resourceGroups?: { [key: string]: ResourceGroup }

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
        console.log(yaml)
        console.log("---")

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

