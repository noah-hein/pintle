import { Command } from "./command";
import * as prompts from "prompts";
export class NewCommand extends Command {


  async run() {


    const response = await prompts({
      type: 'multiselect',
      name: 'color',
      message: 'Pick colors',
      choices: [
        { title: 'Red', value: '#ff0000' },
        { title: 'Green', value: '#00ff00' },
        { title: 'Blue', value: '#0000ff' }
      ]
    });

    console.log(response)
  }
}
