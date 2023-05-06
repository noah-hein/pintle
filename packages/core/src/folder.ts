export interface Folder {
  folderName: string;
  files: File[];
  folders: Folder[];
}
export type Folders = Folder[];

export interface File {
  fileName: string;
  data: Blob
}
export type Files = File[];
