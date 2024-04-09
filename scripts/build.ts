if (typeof Bun === "undefined") {
    console.error("This script must be run with Bun.");
    process.exit(1);
}

import { getVersion } from "@/utils/get-version";
import { $ } from "bun";

const flags = Bun.argv.filter((arg) => arg.startsWith("--"));

if (flags.includes("--dist")) {
    console.log("Compiling the project to the dist folder...");

    await $`rm -rf dist`;

    Bun.build({
        entrypoints: ["./src/main.ts"],
        target: "bun",
        outdir: "./dist",
    });
}

if (flags.includes("--executable")) {
    console.log("Creating a executable file build...");

    // Update the version mirror in the source code
    await $`sed -i 's/VERSION = ".*"/VERSION = "${await getVersion()}"/' ./src/utils/constants.ts`;

    // Build the executable file
    await $`bun build ./src/main.ts --compile --minify --outfile callisto`;
}
