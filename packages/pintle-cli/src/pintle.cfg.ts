import {OutputTypes, PintleOptions} from "pintle";

export const options: PintleOptions = {
  file: {
    outputDir: "dist/out",
    singleFile: false,
    type: OutputTypes.YAML
  },
}
