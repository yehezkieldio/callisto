import { getPackageJson } from "@/utils/get-pkg-json";
import * as p from "@clack/prompts";
import { $ } from "bun";
import { red, redBright } from "colorette";
import type { PackageJson } from "type-fest";

/**
 * My preferred Biome configuration.
 */
const biomeConfig = {
    $schema: "https://biomejs.dev/schemas/1.6.3/schema.json",
    organizeImports: {
        enabled: true,
    },
    linter: {
        enabled: true,
        rules: {
            recommended: true,
            correctness: {
                noUnusedImports: "error",
            },
        },
    },
    formatter: {
        enabled: true,
        indentStyle: "space",
        indentWidth: 4,
        lineWidth: 120,
    },
};

export const biomeHandler = async (): Promise<void> => {
    let packageJson = await getPackageJson();

    if (packageJson === null) {
        // Check if the package.json file exists for the current working directory.
        p.outro(red("The package.json file does not exist for this project."));
        return;
    }

    const devDependencies: Partial<Record<string, string>> | undefined = packageJson?.devDependencies;
    // Check if Biome.js is already installed in the project.
    if (devDependencies && "@biomejs/biome" in devDependencies) {
        p.outro(redBright("Biome.js is already installed in this project."));
        return;
    }

    const s = p.spinner();

    s.start("Installing Biome.js");
    await $`bun add -D @biomejs/biome`.cwd(process.cwd()).quiet();
    s.stop("Successfully installed Biome.js");

    s.start("Creating Biome configuration file");
    await Bun.write(Bun.file(`${process.cwd()}/biome.json`), JSON.stringify(biomeConfig, null, 4));
    s.stop("Successfully created Biome configuration file");

    s.start("Adding Biome scripts to package.json");
    const scripts = packageJson.scripts ?? {};

    scripts["biome:format"] = "bunx @biomejs/biome format --write ./src";
    scripts["biome:format:check"] = "bunx @biomejs/biome format ./src";
    scripts["biome:lint"] = "bunx @biomejs/biome check --apply ./src";
    scripts["biome:lint:check"] = "bunx @biomejs/biome check ./src";

    // Refetch the package.json file to ensure we have the latest internal state.
    // This is necessary because we have modified the package.json file in the previous steps.
    // Then, we merge the existing scripts with the new Biome scripts.
    packageJson = (await getPackageJson()) as PackageJson;
    packageJson.scripts = { ...packageJson.scripts, ...scripts };

    await Bun.write(Bun.file(`${process.cwd()}/package.json`), JSON.stringify(packageJson, null, 4));
    s.stop("Successfully added Biome scripts to package.json");

    p.outro("Biome.js has been successfully installed and configured for this project.");
};
