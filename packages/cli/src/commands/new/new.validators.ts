import * as fs from "fs";
import { isValidFolder } from "../../tools";

export const validateProjectName = (input: never) => {
  const folderName = input;
  if (!isValidFolder(folderName)) {
    return "Invalid project name";
  }
  if (fs.existsSync(folderName)) {
    return "Folder already in use";
  }
  return true;
}
