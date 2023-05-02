import {Pintle} from "./pintle";
import {ResourceFile, Resources} from "./resource";


const minecraftServer = (): ResourceFile => ({
  name: "foobar",
  resources: [

  ],
  files: [

  ]
});

const pintle = new Pintle(
  {},
  [
    minecraftServer()
  ]
);
