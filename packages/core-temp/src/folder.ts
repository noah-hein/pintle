export interface Folder {
  name: string;
  files: File[];
  folders: Folder[];
}

export interface PintleOutput {
  files: File[];
  folders: Folder[];
}
