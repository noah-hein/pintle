import * as fs from "fs";
import { Command } from "./command";
import {QuestionCollection} from "inquirer";
import {isValidFolder} from "../tools";

const questions: QuestionCollection = [
  {
    name: "name",
    message: "Project Name:",
    type: "input",
    default: "pintle",
    validate: (input: any): string | boolean => {
      const folderName = input;
      if (isValidFolder(folderName)) {
        return "Invalid project name";
      }
      if (fs.existsSync(folderName)) {
        return "Folder already in use";
      }
      return true;
    }
  },
  {
    name: "package manager",
    message: "Package Manager:",
    type: "list",
    choices: [
      "npm",
      "yarn"
    ],
    default: "npm",
    validate: (input: any): string | boolean => {

      return true;
    }
  }
];

export class NewCommand extends Command {

  async run() {
    const inquirer = await import("inquirer");
    const prompt = inquirer.createPromptModule();

    prompt(questions).then(answers => {

    })



  }
}
