import { defaultFileOptions, FileOptions } from './File';
import * as k8s from '@kubernetes/client-node';

export interface PintleOptions {
  apply?: boolean;
  file?: FileOptions;
}

export const defaultPintleOptions: PintleOptions = {
  apply: false,
  file: defaultFileOptions,
};
