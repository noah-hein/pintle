import * as inquirer from "inquirer";
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
    const prompt = inquirer.createPromptModule();
    const questions = newQuestions(this.options);
    prompt(questions).then(answers => {
      console.log(answers)
    });
  }
}
