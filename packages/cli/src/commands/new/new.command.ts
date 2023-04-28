import * as inquirer from "inquirer";
import * as fs from "fs";
import * as shell from "shelljs";
import { Command } from "../command";
import { newQuestions } from "./new.questions";
import { name as cliName} from "../../../package.json"
import { NewCommandOptions, PackageManagers } from "./new.interfaces";
import {defaultInputOptions, FsUtil} from "@pintle/core";
import {glob, globSync} from "glob";
import * as path from "path";

export class NewCommand extends Command {

  private readonly options: NewCommandOptions;

  constructor(options: NewCommandOptions) {
    super();
    this.options = options;
  }

  async run() {
    //Prompt user with build options
    const prompt = inquirer.createPromptModule();
    const questions = newQuestions(this.options);
    const answers: NewCommandOptions = await prompt(questions) as NewCommandOptions;

    const projectName = answers.name;
    const collectionsFolderName = projectName + "/" + defaultInputOptions.collections;
    const packageManager = answers.packageManager;

    //Create project folder with fs
    //const packageJson = this.createPackageJson(projectName);

    //Add content to main dir
    // FsUtil.createFolder(projectName);
    // FsUtil.createFolder(collectionsFolderName);

    const templatePath = path.resolve(__dirname, "../../template");
    const templateSearchPath = path.join(templatePath, "/**/*")
    console.log(templateSearchPath)
    const files = globSync(templateSearchPath);
    console.log(files)

    //fs.writeFileSync(projectName + "/package.json", packageJson);

    //Install Pintle packages by default
    // if (packageManager === PackageManagers.NPM) {
    //   const npmInstall = "npm install --prefix ./" + projectName;
    //   shell.exec(npmInstall + " " + cliName);
    //   //shell.exec(npmInstall);
    // }
  }
}
