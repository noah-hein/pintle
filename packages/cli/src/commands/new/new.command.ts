import * as inquirer from "inquirer";
import * as fs from "fs";
import * as shell from "shelljs";
import { Command } from "../command";
import { newQuestions } from "./new.questions";
import { name as cliName} from "../../../package.json"
import { NewCommandOptions, PackageManagers } from "./new.interfaces";

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
    const packageManager = answers.packageManager;

    //Create project folder with fs
    const packageJson = this.createPackageJson(projectName);
    fs.mkdirSync(projectName)

    //Add content to main dir
    fs.mkdirSync(projectName + "/collections");
    fs.writeFileSync(projectName + "/package.json", packageJson);

    //Install Pintle packages by default
    if (packageManager === PackageManagers.NPM) {
      const npmInstall = "npm install --prefix ./" + projectName;
      shell.exec(npmInstall + " " + cliName);
      //shell.exec(npmInstall);
    }
  }

  private createPackageJson(projectName: string) {
    const jsonObject = {
      "name": projectName,
      "version": "0.0.1",
      "description": "Kubernetes Definition Layer",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": ["kubernetes", "typescript", "pintle"],
      "license": "MIT"
    }
    return JSON.stringify(jsonObject, null, 3)
  }


}
