import {isCollection} from "pintle";


function test() {



  import("./collections/ark-server").then(module => {
    const moduleExports = Object.entries(module);
    moduleExports.forEach(moduleExport => {
      const key = moduleExport[0];
      const value = moduleExport[1];
      console.log(isCollection(value))
    });
  });
}

test();

// yargs
//   .scriptName("pintle-cli")
//   .command(
//     "build",
//     "Finds and compiles all resources into a configurable distribution",
//     () => null, () => {
//     })
//   .help()
//   .argv
