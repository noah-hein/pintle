import * as fs from "fs";

export class FsUtil {
  public static createFile(content: string, filename: string) {
    this.clearFile(filename);
    fs.appendFileSync(filename, content);
  }

  public static createFolder(folderName: string | undefined) {
    if (folderName) {
      fs.mkdirSync(folderName, { recursive: true });
    }
  }

  public static clearFile(filename: string) {
    if (fs.existsSync(filename)) {
      fs.truncateSync(filename, 0);
    }
  }
}
