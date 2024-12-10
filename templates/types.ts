import { PackageManager } from "../helpers/get-pkg-manager";

export type TemplateType =
  | "default"
  | "default-empty"
  | "default-drizzle"
  | "default-drizzle-empty";
export type TemplateMode = "js" | "ts";

export interface GetTemplateFileArgs {
  template: TemplateType;
  mode: TemplateMode;
  file: string;
}

export interface InstallTemplateArgs {
  appName: string;
  root: string;
  packageManager: PackageManager;
  isOnline: boolean;
  template: TemplateType;
  mode: TemplateMode;
  eslint: boolean;
  drizzle: boolean;
  // tailwind: boolean;
  // srcDir: boolean;
  importAlias: string;
  skipInstall: boolean;
  // turbopack: boolean;
}