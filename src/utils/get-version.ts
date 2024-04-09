import type { PackageJson } from "type-fest";

export const getVersion = async () => {
    const path = Bun.pathToFileURL("package.json");
    const file = Bun.file(path);

    const contents: PackageJson = await file.json();

    return contents.version as string;
};
