import { QuestionCollection} from "inquirer";
import { NewCommandOptions, PackageManagers } from "./new.interfaces";
import { validateProjectName } from "./new.validators";

export const newQuestions = (options: NewCommandOptions): QuestionCollection => [
  {
    name: "name",
    message: "Project Name:",
    type: "input",
    default: options.name,
    validate: validateProjectName
  },
  {
    name: "packageManager",
    message: "Package Manager:",
    type: "list",
    choices: Object.values(PackageManagers),
    default: options.packageManager,
    validate: (input: any): string | boolean => {

      return true;
    }
  }
];
