import { OutputTypes, PintleOptions } from "pintle";

export const options: PintleOptions = {
  output: {
    outputDir: "dist/out",
    singleFile: false,
    type: OutputTypes.YAML,
  },
};
