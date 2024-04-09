#!/usr/bin/env bun

import { DESCRIPTION } from "@/utils/constants";
import { blue, blueBright } from "colorette";
import figlet from "figlet";

if (typeof Bun === "undefined") {
    console.error("This CLI script must be run with Bun.");
    process.exit(1);
}

const main = async () => {
    figlet.text("callisto", { font: "Bell" }, async (_err, text) => {
        console.log(`\n\n${blue(text as string)}\n`);
        console.log(`${blueBright(DESCRIPTION)}\n\n`);
    });
};

void main();
