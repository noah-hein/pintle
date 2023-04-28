export interface NewCommandOptions {
  name: string;
  packageManager: PackageManagers;
}

export enum PackageManagers {
  NPM = "npm",
  YARN = "yarn"
}
