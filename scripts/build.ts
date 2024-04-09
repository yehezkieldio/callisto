import { $ } from "bun";
import { parseArgs } from "node:util";

import { getVersion } from "../src/utils/get-version";

const { values } = parseArgs({
    args: Bun.argv,
    options: {
        dist: {
            type: "boolean",
        },
        exec: {
            type: "boolean",
        },
    },
    strict: true,
    allowPositionals: true,
});

if (values.exec) {
    console.log("Creating a executable file build...");

    // Update the version mirror in the source code
    await $`sed -i 's/VERSION = ".*"/VERSION = "${await getVersion()}"/' ./src/utils/const.ts`;

    // Build the executable file
    await $`bun build ./src/main.ts --compile --outfile callisto`;
}

if (values.dist) {
    console.log("Creating a javascript distribution build...");

    // Build the distribution files
    await Bun.build({
        entrypoints: ["./src/main.ts"],
        outdir: "./dist",
    });
}
