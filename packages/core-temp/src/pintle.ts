import {PintleFactory} from "./factory/factory";
import {ResourceFiles} from "./resource";
import {defaultPintleConfig, PintleConfig} from "./pintle.config";
import {YamlFactory} from "./factory/factory.yaml";

export class Pintle {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private readonly resourceFiles: ResourceFiles;

  private readonly config: PintleConfig;

  /*==================================================================================================================
        Constructors
    ==================================================================================================================*/

  constructor(
    config: PintleConfig,
    resourceFiles: ResourceFiles
  ) {
    //Parse options and log
    this.resourceFiles = resourceFiles;
    this.config = this.parseConfig(config);
    console.log("Config:", this.config);

    //Build resourceFiles
    console.log("Building resources");
    this.build();
    console.log("Completed!");
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private build() {
    //Create factory from config
    const factoryConstructor = this.config.factory
    const factory = new factoryConstructor();


    const files = factory.compile(this.resourceFiles);
  }

  private parseConfig(config: PintleConfig): PintleConfig {
    return {
      ...defaultPintleConfig,
      ...config,
    };
  }


}
