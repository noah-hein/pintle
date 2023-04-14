export interface Collection {
  name: string;
  resources?: object[];
  children?: Collection[];
}

export type Collections = Collection[];
