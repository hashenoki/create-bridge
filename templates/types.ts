import { PackageManager } from "../helpers/get-pkg-manager";

export type TemplateType =
  | "default"
  | "default-empty"
  | "default-drizzle"
  | "default-drizzle-empty";

export interface GetTemplateFileArgs {
  template: TemplateType;
  file: string;
}

export interface InstallTemplateArgs {
  appName: string;
  root: string;
  packageManager: PackageManager;
  isOnline: boolean;
  template: TemplateType;
  drizzle: boolean;
  eslint: boolean;
  importAlias: string;
  skipInstall: boolean;
}