import { install } from "../helpers/install";
import { copy } from "../helpers/copy";

import { async as glob } from "fast-glob";
import os from "os";
import fs from "fs/promises";
import path from "path";
import { cyan, bold } from "picocolors";
import { Sema } from "async-sema";
// import pkg from "../package.json";

import { GetTemplateFileArgs, InstallTemplateArgs } from "./types";

/**
 * Get the file path for a given file in a template, e.g. "eslint.config.mjs".
 */
export const getTemplateFile = ({
  template,
  file,
}: GetTemplateFileArgs): string => {
  // note missing "templates" directory in paths - this is intentional, otherwise templates become built into the binary
  return path.join(__dirname, template, file);
};

/**
 * Install internal template to a given `root` directory.
 */
export const installTemplate = async ({
  appName,
  root,
  packageManager,
  isOnline,
  template,
  drizzle,
  eslint,
  importAlias,
  skipInstall,
}: InstallTemplateArgs) => {
  console.log(bold(`Using ${packageManager}.`));

  /**
   * Copy the template files to the target directory.
   */
  console.log("\nInitializing project with template:", template, "\n");
  const templatePath = path.join(__dirname, 'templates', template);
  const copySource = ["**"];

  if (!eslint) {
    copySource.push("!eslint.config.mjs", "!prettierrc");
  }

  if (!drizzle) {
    copySource.push("drizzle.config.js");
  }

  await copy(copySource, root, {
    parents: true,
    cwd: templatePath,
    rename(name) {
      switch (name) {
        case "gitignore":
        case "prettierrc":
        case "nvmrc":
        case "env.example":
        case "env": {
          return `.${name}`;
        }
        // README.md is ignored by webpack-asset-relocator-loader used by ncc:
        // https://github.com/vercel/webpack-asset-relocator-loader/blob/e9308683d47ff507253e37c9bcbb99474603192b/src/asset-relocator.js#L227
        case "README-template.md": {
          return "README.md";
        }
        default: {
          return name;
        }
      }
    },
  });

  const tsconfigFile = path.join(
    root,
    "tsconfig.json",
  );
  await fs.writeFile(
    tsconfigFile,
    (await fs.readFile(tsconfigFile, "utf8")).replace(`"~/*":`, `"${importAlias}":`),
  );

  // update import alias in any files if not using the default
  if (importAlias !== "~/*") {
    const files = await glob("**/*", {
      cwd: root,
      dot: true,
      stats: false,
      // We don't want to modify compiler options in [ts/js]config.json
      // and none of the files in the .git folder
      // TODO: Refactor this to be an allowlist, rather than a denylist,
      // to avoid corrupting files that weren't intended to be replaced

      ignore: [
        "tsconfig.json",
        "jsconfig.json",
        ".git/**/*",
      ],
    });
    const writeSema = new Sema(8, { capacity: files.length });
    await Promise.all(
      files.map(async (file) => {
        await writeSema.acquire();
        const filePath = path.join(root, file);
        if ((await fs.stat(filePath)).isFile()) {
          await fs.writeFile(
            filePath,
            (await fs.readFile(filePath, "utf8")).replace(
              `~/`,
              `${importAlias.replace(/\*/g, "")}`,
            ),
          );
        }
        writeSema.release();
      }),
    );
  }

  /** Copy the version from package.json or override for tests. */
  /** const version = process.env.PRIVATE_TEST_VERSION ?? pkg.version; */

  /** Create a package.json for the new project and write it to disk. */
  const packageJson: any = {
    name: appName,
    version: '0.1.0',
    private: true,
    main: "./dist/index.js",
    scripts: {
      dev: "tsx watch --clear-screen=false ./src/index.js",
      build: "pkgroll --clean-dist --sourcemap",
      start: "node ./dist/index.js",
      lint: "eslint",
      test: "vitest",
    },
    /**
     * Default dependencies.
     */
    dependencies: {
      dotenv: "^16.4",
      envalid: "^8.0",
      express: "^5.0",
      "http-status-codes": "^2.3",
      zod: "^3.24"
    },
    devDependencies: {
      '@types/supertest': "^6.0",
      '@types/express': "^5.0",
      pkgroll: '^2.5',
      supertest: '^7.0',
      vitest: '^2.1',
      'vite-tsconfig-paths': '^5.1',
      tsx: '^4.19',
      typescript: '^5.7',
    },
  };

  /** Create .vscode/settings.json config file */
  const vscodeSettings: any = {};

  /* Add drizzle dependencies. */
  if (drizzle) {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      'drizzle-orm': "^0.38",
      pg: '^8.13'
    };
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      '@types/pg': '^8.11',
      'drizzle-kit': '^0.30',
    };
  }

  /* Default ESLint dependencies. */
  if (eslint) {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      "@eslint/js": "^9.16",
      "eslint": "^9.16",
      "eslint-config-prettier": "^9.1",
      "eslint-plugin-prettier": "^5.2",
      "globals": "^15.13",
      "prettier": "^3.4",
      "typescript-eslint": "^8.18",
    };

    vscodeSettings["eslint.useFlatConfig"] = true;
  }

  const devDeps = Object.keys(packageJson.devDependencies).length;
  if (!devDeps) delete packageJson.devDependencies;

  await fs.writeFile(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL,
  );

  if (Object.keys(vscodeSettings).length) {
    await fs.mkdir(path.join(root, ".vscode"), { recursive: true });
    await fs.writeFile(
      path.join(root, ".vscode/settings.json"),
      JSON.stringify(vscodeSettings, null, 2) + os.EOL,
    );
  }

  if (skipInstall) return;

  console.log("\nInstalling dependencies:");
  for (const dependency in packageJson.dependencies)
    console.log(`- ${cyan(dependency)}`);

  if (devDeps) {
    console.log("\nInstalling devDependencies:");
    for (const dependency in packageJson.devDependencies)
      console.log(`- ${cyan(dependency)}`);
  }

  console.log();

  await install(packageManager, isOnline);
};

export * from "./types";
