import {ResourceFiles} from "../resource";
import {Folder, PintleOutput} from "../folder";

export abstract class PintleFactory {
  abstract compile(resourceFiles: ResourceFiles): PintleOutput;

  public static newInstance<T extends PintleFactory>(this: new () => T) {
    return new this();
  }
}
