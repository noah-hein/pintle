#!/usr/bin/env node

import * as yargs from "yargs";
import {NewCommand} from "./commands/new/new.command";
import {BuildCommand} from "./commands/build/build.command";
import {CleanCommand} from "./commands/clean";

yargs
  .scriptName("pintle")
  .help()
  .command(
    "new",
    "Creates a new pintle app",
    () => [

    ],
    async () => new NewCommand().run()
  )
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
