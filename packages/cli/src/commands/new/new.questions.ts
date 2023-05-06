import { QuestionCollection } from "inquirer";
import { validateProjectName } from "./new.validators";
import { PackageManagers } from "../../package-managers/package-manager";
import { NewCommandOptions } from "./new.yargs";

export const newQuestions = (
  options: NewCommandOptions
): QuestionCollection => [
  {
    name: "name",
    message: "Project Name:",
    type: "input",
    default: options.name,
    validate: validateProjectName,
  },
  {
    name: "packageManager",
    message: "Package Manager:",
    type: "list",
    choices: Object.values(PackageManagers),
    default: options.packageManager,
    validate: (input: any): string | boolean => {
      return true;
    },
  },
];
