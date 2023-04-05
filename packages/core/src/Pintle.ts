import {services} from "./Resource";


interface PintleOptions {
  createYaml?: boolean;
  push?: boolean;
  services?: object[]

}

export class Pintle {

  static create(options: PintleOptions) {

    const services = options.services;


    console.log(services)
  }


}

