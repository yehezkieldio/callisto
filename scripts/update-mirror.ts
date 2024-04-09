if (typeof Bun === "undefined") {
    console.error("This script must be run with Bun.");
    process.exit(1);
}

import { getDescription } from "@/utils/get-description";
import { getVersion } from "@/utils/get-version";
import { $ } from "bun";

export const updateMirror = async () => {
    // Update the version mirror in the source code
    console.log("Updating the version mirror in the source code...");
    await $`sed -i 's/VERSION = ".*"/VERSION = "${await getVersion()}"/' ./src/utils/constants.ts`;

    // Update the description mirror in the source code
    console.log("Updating the description mirror in the source code...");
    await $`sed -i 's/DESCRIPTION = ".*"/DESCRIPTION = "${await getDescription()}"/' ./src/utils/constants.ts`;
};

// Update the mirror if the script is run directly, not imported as a module
if (import.meta.main) {
    await updateMirror();
}
