import {Pintle} from "./pintle";
import {ResourceFile, Resources} from "./resource";

interface MinecraftServerOptions {

}

const minecraftServer = (options: MinecraftServerOptions): ResourceFile => ({
  name: "foobar",
  resources: [

  ],
  files: [

  ]
});

const pintle = new Pintle(
  {},
  [
    minecraftServer({})
  ]
);
