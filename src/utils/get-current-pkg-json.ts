import type { PackageJson } from "type-fest";
import * as p from "@clack/prompts";
import { redBright } from "colorette";

export const getCurrentPackageJson = async (workingPath: string) => {
    try {
        const path = Bun.pathToFileURL(`${workingPath}/package.json`);
        const file = Bun.file(path);

        const contents: PackageJson = await file.json();

        return contents;
    } catch (error) {
        p.outro(
            redBright("Could not find a package.json file in the current working directory, or the file is not valid."),
        );

        process.exit(1);
    }
};
