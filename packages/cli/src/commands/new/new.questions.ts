import { QuestionCollection} from "inquirer";
import { NewCommandOptions } from "./new.interfaces";
import { validateProjectName } from "./new.validators";

export const newQuestions = (options: NewCommandOptions): QuestionCollection => [
  {
    name: "projectName",
    message: "Project Name:",
    type: "input",
    default: options.projectName,
    validate: validateProjectName
  },
  {
    name: "projectName",
    message: "Project Name:",
    type: "input",
    default: options.projectName,
    validate: (input: any): string | boolean => {
      return true;
    }
  },
  {
    name: "packageManager",
    message: "Package Manager:",
    type: "list",
    choices: [
      "npm",
      "yarn"
    ],
    default: options.packageManager,
    validate: (input: any): string | boolean => {

      return true;
    }
  }
];
