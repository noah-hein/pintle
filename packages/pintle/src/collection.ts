export interface Collection {
  name: string;
  resources?: object[];
  collections?: Collection[];
}

export type Collections = Collection[];

export function isCollection(object: unknown): object is Collection {
  return typeof object === "object" &&
    object != null &&
    "name" in object &&
    "resources" in object;
}
