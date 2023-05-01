import {OutputTypes, PintleOptions} from "@pintle/core";

export const options: PintleOptions = {
  input: {
    source: "",
    collections: "collections"
  },
  output: {
    dir: "dist/out",
    singleFile: false,
    type: OutputTypes.YAML,
  },
};
