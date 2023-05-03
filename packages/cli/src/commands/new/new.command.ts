import * as inquirer from "inquirer";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import * as ejs from "ejs";
import * as async from "async";
import * as shell from "shelljs";
import { Command } from "../command";
import { newQuestions } from "./new.questions";
import { globSync } from "glob";
import {name as cliName} from "../../../package.json";
import { PackageManagers } from "../../package-managers/package-manager";
import { NewCommandOptions } from "./new.yargs";
import * as chalk from "chalk";
import { discovered } from "../../discover";

//TODO Convert fs stuff to async to improve performance
export class NewCommand extends Command {

  private options: NewCommandOptions;

  constructor(options: NewCommandOptions) {
    super();
    this.options = options;
  }

  async run() {
    //Prompt user with build options
    const prompt = inquirer.createPromptModule();
    const questions = newQuestions(this.options);
    this.options = await prompt(questions) as NewCommandOptions;

    //Build template files
    const templateStrings = this.getTemplateFiles();
    const root = templateStrings[0];
    const files = this.findFiles(templateStrings);
    await this.buildTemplateFiles(root, files);

    //Install Pintle packages by default
    const options = this.options;
    const packageManager = options.packageManager;
    const projectName = options.name;
    if (packageManager === PackageManagers.NPM) {
      shell.exec("npm install --prefix ./" + projectName + " " + cliName, {silent: true});
    }
  }

  private getTemplateFiles(): string[] {
    const relativePath = path.relative(discovered.workDir, discovered.templatePath);
    const searchPath = path.join(relativePath, "/**").replace(/\\/g, "/");
    return globSync(searchPath);
  }

  private findFiles(templateStrings: string[]): string[] {
    return templateStrings.filter(fileString => (
      fs.existsSync(fileString) &&
      fs.lstatSync(fileString).isFile()
    ));
  }

  private async buildTemplateFiles(root: string, files: string[]) {
    await async.each(files, (file, callback) => {
      //Determine file output path
      const filename = file.replace(root, "");
      const content = fs.readFileSync(file, "utf-8");
      const projectFilename = path.join(this.options.name, filename);
      const filePath = path.resolve(discovered.workDir, projectFilename);

      //Inject data into templates and create files
      const renderedContent = ejs.render(content, this.options);
      fse.outputFile(filePath, renderedContent, callback);
      console.log(chalk.greenBright("GENERATE") + " " + file);
    });
  }
}
