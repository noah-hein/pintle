import { OutputTypes, Pintle } from "pintle";
import {arkWorld} from "./ark";

export function bootstrap() {
  Pintle.create(
    {
      file: {
        outputDir: "dist/out",
        singleFile: false,
        type: OutputTypes.YAML,
      },
    },
    [
      arkWorld("island"),
      arkWorld("aberation"),
      arkWorld("extinction"),
      arkWorld("scorched-earth")
    ]
  );
}
bootstrap();
