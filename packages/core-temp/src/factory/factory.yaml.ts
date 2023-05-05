import {ResourceFiles} from "../resource";
import { PintleFactory} from "./factory";
import {RootFolder, File} from "../folder";

export class YamlFactory extends PintleFactory {
  compile(resourceFiles: ResourceFiles): RootFolder {


    const file: File = {
      name: "foobar.txt",
      data: new Blob(["foobar"], {type: "text/plain"})
    }



    return {
      files: [file],
      folders: []
    }
  }

}
