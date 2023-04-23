#!/usr/bin/env node

import * as yargs from "yargs";
import { BuildCommand, NewCommand } from "./commands";
import { CleanCommand } from "./commands";

yargs
  .scriptName("pintle")
  .help()
  .command(
    "new",
    "Creates a new pintle app",
    () => null,
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
