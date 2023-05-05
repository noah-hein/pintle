import * as fs from "fs";

export class FsUtil {
  public static writeFile(content: string, filename: string) {
    this.clearFile(filename);
    fs.writeFileSync(filename, content);
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

  public static isValidFolder(folderName: string): boolean {
    // Check for invalid characters
    const forbiddenCharacters = /[\\/:*?"<>|]/g;
    const hasForbiddenCharacter = forbiddenCharacters.test(folderName);

    // Check for "." and ".." folder names
    const isDots = (folderName === '.' || folderName === '..');

    // Check for file extension
    const hasBigName = folderName.length > 255;
    return !(
      hasForbiddenCharacter ||
      isDots ||
      hasBigName
    );
  }
}
