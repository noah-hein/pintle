import * as fs from 'fs';
import * as k8s from "@kubernetes/client-node";
import {defaultFileOptions} from 'pintle';
import { Collection } from '../Collection';
import {PintleOptions} from "../PintleOptions";

export abstract class ResourceFactory {
  private readonly options: PintleOptions;

  private readonly resourceGroups: Collection[];

  //private readonly k8Client: k8s.CoreV1Api | null;

  constructor(options: PintleOptions, resourceGroups: Collection[]) {
    this.options = options;
    this.resourceGroups = resourceGroups;
    //this.k8Client = this.createK8Client();
  }

  abstract parseSingle(resourceGroup: Collection): string;

  abstract parseMany(resourceGroup: Collection[]): string;

  public build() {
    const fileOptions = this.options.file || defaultFileOptions;
    const resourceGroups = this.resourceGroups;
    if (fileOptions.filename && fileOptions.singleFile) {
      //Put everything into a single file
      this.buildFile(
        resourceGroups[0].filename,
        this.parseMany(resourceGroups)
      );
    } else {
      //Break into individual files
      resourceGroups.forEach((resourceGroup) => {
        this.buildFile(resourceGroup.filename, this.parseSingle(resourceGroup));
      });
    }
  }

  private clearFile(filename: string) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename, 0);
    }
  }

  private buildFile(filename: string, content: string) {
    this.clearFile(filename);
    const fileOptions = this.options.file || defaultFileOptions;
    fs.mkdirSync('' + fileOptions.outputDir + '', { recursive: true });
    fs.appendFileSync(filename, content);
  }

  private createK8Client() {
    // let client = null;
    // if (this.options.apply) {
    //   const kubeConfig = new k8s.KubeConfig();
    //   kubeConfig.loadFromDefault();
    //   client = kubeConfig.makeApiClient(k8s.CoreV1Api);
    // }
    // return client;
  }
}
