import type { BunFile } from "bun";
import type { PackageJson } from "type-fest";

export const getDescription = async () => {
    const file: BunFile = Bun.file(Bun.pathToFileURL("package.json"));

    if (!(await file.exists())) {
        throw new Error("The package.json file does not exist.");
    }

    const contents: PackageJson = await file.json();
    return contents.description as string;
};
