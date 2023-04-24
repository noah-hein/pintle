export function isValidFolder(folderName: string): boolean {
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
