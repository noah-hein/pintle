import {ResourceFiles} from "../resource";
import { PintleFactory} from "./factory";
import {Folder, PintleOutput} from "../folder";

export class YamlFactory extends PintleFactory {
  compile(resourceFiles: ResourceFiles): PintleOutput {







    const file = new File(["test"], "name", {type: "text/plain"})


    return {
      files: [],
      folders: []
    }
  }

}
