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
import * as process from "process";

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


    const templateFiles = this.getTemplateFiles();

    //fs.writeFileSync(projectName + "/package.json", packageJson);

    //Install Pintle packages by default
    // if (packageManager === PackageManagers.NPM) {
    //   const npmInstall = "npm install --prefix ./" + projectName;
    //   shell.exec(npmInstall + " " + cliName);
    //   //shell.exec(npmInstall);
    // }
  }

  private getTemplateFiles() {
    const basePath = process.cwd();
    const libraryPath = path.resolve(__dirname, "../../..");
    const templatePath = path.join(libraryPath, "packages/starter/src");
    const relativePath = path.relative(basePath, templatePath);
    const searchPath = path.join(relativePath, "/**").replace(/\\/g, "/");
    return globSync(searchPath);
  }
}
