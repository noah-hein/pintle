import * as Yaml from "yaml";
import {Module, Resources} from "../resource";
import { PintleFactory} from "./factory";
import {File, Folder} from "../folder";

export class YamlFactory extends PintleFactory {

  private FILE_ENDING = "yaml";

  public compile(module: Module): Folder {








    const files: File[] = [];









    // module.forEach(resourceFile => {
    //   const name = resourceFile.name;
    //   const resources = resourceFile.resources
    //
    //   //Create the resource files
    //   const fileName = name + "." + this.FILE_ENDING;
    //   const yamlString = this.resourcesToYamlFile(resources);
    //   const data = new Blob([yamlString], {type: "text/plain"})
    //   files.push({ fileName, data });
    //
    //   const resourceFiles = resourceFile.modules;
    // });



    return {
      folderName: "root",
      files,
      folders: []
    }
  }

  private moduleToFolder(module: Module): Folder {
    const children = module.modules
    const hasChildren = children && children.length > 0
    if (hasChildren) {
      children?.forEach(child => {

      });
    }
  }

  private moduleToFile(module: Module): File {
    const name = module.name;
    const resources = module.resources;
    const fileName = name + "." + this.FILE_ENDING;
    return this.resourcesToYamlFile(fileName, resources);
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
