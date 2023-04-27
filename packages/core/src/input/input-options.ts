export interface InputOptions {
  source?: string;
  collections?: string;
}

export const defaultInputOptions = {
  source: "packages/cli/src/",
  collections: "collections",
};
