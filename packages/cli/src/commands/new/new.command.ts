import * as inquirer from "inquirer";
import * as fs from "fs";
import * as shell from "shelljs";
import { Command } from "../command";
import { newQuestions } from "./new.questions";
import { NewCommandOptions } from "./new.interfaces";

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

    const projectName = answers.projectName;
    const packageName = answers.packageName;
    const packageManager = answers.packageManager;

    //Create project folder with fs
    fs.mkdirSync(projectName)

    //Initialize package.json
    if (packageManager === "npm") {
      shell.exec("npm init " + packageName + " ./" + projectName)
    }
  }


}
