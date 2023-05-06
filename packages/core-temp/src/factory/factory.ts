import { Module } from "../resource";
import {Folder} from "../folder";

export abstract class PintleFactory {
  abstract compile(module: Module): Folder;

  public static newInstance<T extends PintleFactory>(this: new () => T) {
    return new this();
  }
}
