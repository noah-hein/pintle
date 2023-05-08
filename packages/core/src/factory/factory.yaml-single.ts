import * as Yaml from "yaml";
import { Resources } from "../resource";
import { PintleFactory } from "./factory";
import { Folder } from "../folder";
import {Module} from "../module";

export class YamlSingleFactory extends PintleFactory {
  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private FILE_ENDING = "yaml";

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public compile(module: Module): Folder {
    const fileName = module.name + "." + this.FILE_ENDING;
    const yaml = this.combineResources(module);
    const data = new Blob([yaml], { type: "text/plain" });
    return {
      folderName: "root",
      files: [
        {
          fileName,
          data,
        },
      ],
      folders: [],
    };
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private combineResources(module: Module): string {
    let content = "";
    if (module.resources) {
      content = this.resourcesToYaml(module.resources);
      module.modules?.forEach((child) => {
        content = content + this.combineResources(child);
      });
    }
    return content;
  }

  private resourcesToYaml(resources: Resources) {
    let content = "";
    resources.forEach((resource) => {
      const resourceYaml = Yaml.stringify(resource);
      content = content + resourceYaml + "---\r\n";
    });
    return content;
  }
}
