export interface Folder {
  name: string;
  files: File[];
  folders: Folder[];
}

export interface File {
  name: string;
  data: Blob
}

export interface RootFolder {
  files: File[];
  folders: Folder[];
}
