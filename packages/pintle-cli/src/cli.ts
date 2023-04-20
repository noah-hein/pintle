import { BuildCommand } from "./commands/build";
import * as yargs from "yargs";
import { CleanCommand } from "./commands/clean";

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
