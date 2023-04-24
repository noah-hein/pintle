import {NewCommand} from "./new.command";
import {command} from "yargs";

export interface NewYargs {

}

export const newYargs = command(
  "new",
  "Creates a new pintle app",
  () => [

  ],
  async () => new NewCommand().run()
);
