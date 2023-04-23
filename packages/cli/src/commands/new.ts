import { Command } from "./command";

export class NewCommand extends Command {


  async run() {
    const inquirer = await import("inquirer");
    const prompt = inquirer.createPromptModule();



  }
}
