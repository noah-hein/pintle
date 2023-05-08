import { Folder } from "../folder";
import {Module} from "../module";

export type PintleFactoryConstructor = { new (): PintleFactory };

export abstract class PintleFactory {
  abstract compile(module: Module): Folder;

  public static newInstance<T extends PintleFactory>(this: new () => T) {
    return new this();
  }
}
