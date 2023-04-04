import {resources} from "./Resource";


interface PintleOptions {
  createYaml?: boolean;
  push?: boolean;
  services?: object[]

}

export class Pintle {

  static create(options: PintleOptions) {

    const services = options.services;

    services?.forEach(service => {

      console.log(service.constructor)



    });

    console.log(resources)
  }


}

