import * as fs from "fs";
import {FsUtil} from "@pintle/core";

export const validateProjectName = (input: never) => {
  const folderName = input;
  if (!FsUtil.isValidFolder(folderName)) {
    return "Invalid project name";
  }
  if (fs.existsSync(folderName)) {
    return "Folder already in use";
  }
  return true;
}
