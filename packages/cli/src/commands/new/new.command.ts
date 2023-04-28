import * as inquirer from "inquirer";
import * as fs from "fs";
import * as path from "path";
import * as process from "process";
import { Command } from "../command";
import { newQuestions } from "./new.questions";
import { NewCommandOptions } from "./new.interfaces";
import { defaultInputOptions } from "@pintle/core";
import { globSync } from "glob";

//TODO Convert fs stuff to async to improve performance
export class NewCommand extends Command {

  private readonly options: NewCommandOptions;

  constructor(options: NewCommandOptions) {
    super();
    this.options = options;
  }

  async run() {
    //Prompt user with build options
    const prompt = inquirer.createPromptModule();
    const questions = newQuestions(this.options);
    const answers: NewCommandOptions = await prompt(questions) as NewCommandOptions;

    const projectName = answers.name;
    const collectionsFolderName = projectName + "/" + defaultInputOptions.collections;
    const packageManager = answers.packageManager;

    //Create project folder with fs
    //const packageJson = this.createPackageJson(projectName);

    //Add content to main dir
    // FsUtil.createFolder(projectName);
    // FsUtil.createFolder(collectionsFolderName);


    const templateStrings = this.getTemplateFiles();
    const root = templateStrings[0];
    const files = this.findFiles(templateStrings);
    this.buildTemplateFiles(root, files);

    //fs.writeFileSync(projectName + "/package.json", packageJson);

    //Install Pintle packages by default
    // if (packageManager === PackageManagers.NPM) {
    //   const npmInstall = "npm install --prefix ./" + projectName;
    //   shell.exec(npmInstall + " " + cliName);
    //   //shell.exec(npmInstall);
    // }
  }

  private getTemplateFiles(): string[] {
    const basePath = process.cwd();
    const libraryPath = path.resolve(__dirname, "../../..");
    const templatePath = path.join(libraryPath, "packages/starter/src");
    const relativePath = path.relative(basePath, templatePath);
    const searchPath = path.join(relativePath, "/**").replace(/\\/g, "/");
    return globSync(searchPath);
  }

  private findFiles(templateStrings: string[]): string[] {
    return templateStrings.filter(fileString => (
      fs.existsSync(fileString) &&
      fs.lstatSync(fileString).isFile()
    ));
  }

  private buildTemplateFiles(root: string, files: string[]) {
    files.forEach(file => {
      const filename = file.replace(root, "");
      const content = fs.readFileSync(file, "utf-8");
      console.log(content)

    });
  }
}
