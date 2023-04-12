export interface Collection {
  name: string;
  resources: object[];
  filename: string;
}

export type Collections = {[name: string]: object[]};
