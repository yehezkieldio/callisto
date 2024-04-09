import type { BunFile } from "bun";
import type { PackageJson } from "type-fest";

export const getPackageJson = async () => {
    const file: BunFile = Bun.file(Bun.pathToFileURL(`${process.cwd()}/package.json`));

    if (!(await file.exists())) {
        return null;
    }

    const contents: PackageJson = await file.json();
    return contents;
};
