export interface InputOptions {
  source: string;
  dir: string;
}

export const defaultInputOptions: InputOptions = {
  source: "packages/pintle-cli/src/",
  dir: "collections",
};
