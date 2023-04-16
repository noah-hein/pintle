export type Resources = object[];

export abstract class ResourceCollection {
  abstract exportedResources(): Resources;
}
