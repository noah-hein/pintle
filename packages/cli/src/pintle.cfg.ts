import { OutputTypes, PintleOptions } from "@pintle/core";

export const options: PintleOptions = {
  output: {
    outputDir: "dist/out",
    singleFile: false,
    type: OutputTypes.YAML,
  },
};
