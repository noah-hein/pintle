import * as yargs from "yargs";
import { BuildCommand } from "./commands";
import { CleanCommand } from "./commands";

console.log("FUCK")

yargs
  .scriptName("pintle-cli")
  .help()
  .command(
    "build",
    "Finds and compiles all resources into a configurable distribution",
    () => null,
    async () => new BuildCommand().run()
  )
  .command(
    "clean",
    "Foobar",
    () => null,
    async () => new CleanCommand().run()
  ).argv;
