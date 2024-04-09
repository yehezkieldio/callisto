import { $ } from "bun";
import { parseArgs } from "node:util";

import { getVersion } from "@/utils/get-version";

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
    await $`bun build ./src/main.ts --compile --minify --outfile callisto`;
}

if (values.dist) {
    console.error("Not implemented yet.");
}
