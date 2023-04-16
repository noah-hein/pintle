import * as yargs from "yargs";

yargs
  .scriptName("pintle-cli")
  .command("hello", "does some shit", (yargs) => {
    yargs.positional('name', {
      type: 'string',
      default: 'Cambi',
      describe: 'the name to say hello to'
    })
  }, (argv) => {
    console.log("What the fuck is going on")
  })
  .help()
  .argv
