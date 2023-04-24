#!/usr/bin/env node

import * as yargs from "yargs";
import {NewCommand} from "./commands/new/new.command";
import {BuildCommand} from "./commands/build/build.command";
import {CleanCommand} from "./commands/clean";
import {newYargs} from "./commands/new/new.yargs";

yargs
  .scriptName("pintle")
  .help("h")
  .alias('h', 'help')
  .alias('v', 'version')
  .command(newYargs)
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
  )
  .epilog("Does some stuff")
  .argv;
