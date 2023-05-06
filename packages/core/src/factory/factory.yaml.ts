import * as Yaml from "yaml";
import { Module, Resources } from "../resource";
import { PintleFactory} from "./factory";
import { File, Files, Folder, Folders } from "../folder";

export class YamlFactory extends PintleFactory {

  /*==================================================================================================================
        Private Members
    ==================================================================================================================*/

  private FILE_ENDING = "yaml";

  /*==================================================================================================================
        Public Methods
    ==================================================================================================================*/

  public compile(module: Module): Folder {
    return this.moduleToFolder(module);
  }

  /*==================================================================================================================
        Private Methods
    ==================================================================================================================*/

  private moduleToFolder(module: Module): Folder {
    const folderName = module.name;
    const folders: Folders = [];
    const files: Files = [];

    const children = module.modules;
    children?.forEach(child => {
      const childName = child.name;
      const childModules = child.modules;
      const childResources = child.resources;

      if (childModules && childModules.length > 0) {
        const folder = this.moduleToFolder(child);
        folders.push(folder);
      }

      if (childResources && childResources.length > 0) {
        const fileName = childName + "." + this.FILE_ENDING;
        const file = this.resourcesToYamlFile(fileName, childResources);
        files.push(file);
      }
    });
    return {
      folderName,
      folders,
      files
    }
  }

  private resourcesToYamlFile(fileName: string, resources: Resources): File {
    let content = "";
    resources.forEach(resource => {
      const resourceYaml = Yaml.stringify(resource);
      content = content + resourceYaml + "---\r\n";
    });
    const fileType = {type: "text/plain"}
    const data = new Blob([content], fileType);
    return {
      fileName,
      data
    };
  }

}
