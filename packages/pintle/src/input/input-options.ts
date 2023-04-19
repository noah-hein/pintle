export interface InputOptions {
  source: string;
  collections: string;
}

export const defaultInputOptions: InputOptions = {
  source: "packages/pintle-cli/src/",
  collections: "collections",
};
