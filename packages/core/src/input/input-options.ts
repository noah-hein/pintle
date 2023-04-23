export interface InputOptions {
  source: string;
  collections: string;
}

export const defaultInputOptions: InputOptions = {
  source: "packages/cli/src/",
  collections: "collections",
};
