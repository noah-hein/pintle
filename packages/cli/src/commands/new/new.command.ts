import { Command } from "../command";
import {newQuestions} from "./new.questions";
import inquirer from "inquirer";

export class NewCommand extends Command {

  constructor() {
    super();
  }

  async run() {
    const prompt = inquirer.createPromptModule();

    prompt(newQuestions).then(answers => {
      console.log(answers)
    });
  }
}
