import { Command } from "../command";
import {newQuestions} from "./new.questions";

export class NewCommand extends Command {

  constructor() {
    super();
  }

  async run() {
    const inquirer = await import("inquirer");
    const prompt = inquirer.createPromptModule();

    prompt(newQuestions).then(answers => {

    });
  }
}