import {QuestionCollection} from "inquirer";
import {isValidFolder} from "../../tools";
import * as fs from "fs";

export const newQuestions: QuestionCollection = [
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
