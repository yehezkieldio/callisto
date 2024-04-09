if (typeof Bun === "undefined") {
    console.error("This script must be run with Bun.");
    process.exit(1);
}

import { $ } from "bun";
import { updateMirror } from "./update-mirror";

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

    await updateMirror();

    // Build the executable file
    await $`bun build ./src/main.ts --compile --minify --outfile callisto`;
}
