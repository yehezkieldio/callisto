import { getCurrentPackageJson } from "@/utils/get-current-pkg-json";
import * as p from "@clack/prompts";
import { $ } from "bun";
import { redBright } from "colorette";

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
    const packageJson = await getCurrentPackageJson(process.cwd());

    const devDependencies: Partial<Record<string, string>> | undefined = packageJson?.devDependencies;

    if (devDependencies && "@biomejs/biome" in devDependencies) {
        p.outro(redBright("Biome.js is already installed in this project."));
        return;
    }

    const s = p.spinner();

    s.start("Installing Biome.js...");

    s.message("Adding Biome.js to devDependencies...");
    await $`bun add -D @biomejs/biome`.cwd(process.cwd()).quiet();
    s.message("Biome.js has been added to devDependencies.");

    s.message("Creating biome.json configuration file...");
    const config = Bun.file(`${process.cwd()}/biome.json`);
    await Bun.write(config, JSON.stringify(biomeConfig, null, 4));
    s.message("biome.json configuration file has been created.");

    s.stop("Biome.js has been installed and configured.");
};
