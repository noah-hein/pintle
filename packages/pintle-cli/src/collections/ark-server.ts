import {ResourceCollection, Resources, Templates} from "pintle";


export interface ArkServerOptions {
  name: string
}

export class ArkServer extends ResourceCollection {

  constructor(private options: ArkServerOptions) {
    super();
  }

  exportedResources(): Resources {
    return [
      Templates.createNamespace(this.options.name),
    ];
  }
}



