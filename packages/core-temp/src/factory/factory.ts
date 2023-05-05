import {ResourceFiles} from "../resource";
import {Folder, RootFolder} from "../folder";

export abstract class PintleFactory {
  abstract compile(resourceFiles: ResourceFiles): RootFolder;

  public static newInstance<T extends PintleFactory>(this: new () => T) {
    return new this();
  }
}
