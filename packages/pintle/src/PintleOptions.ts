import { defaultFileOptions, FileOptions } from './File';
import * as k8s from '@kubernetes/client-node';

export interface PintleOptions {
  apply?: boolean;
  k8Config: string | null;
  file?: FileOptions;
}

export const defaultPintleOptions: PintleOptions = {
  apply: false,
  k8Config: null,
  file: defaultFileOptions,
};
