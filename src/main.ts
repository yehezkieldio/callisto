#!/usr/bin/env bun

import figlet from "figlet";
import { run } from "./cli";
import { blueBright, bold } from "colorette";

const main = async () => {
    figlet.text(
        "callisto",
        {
            font: "Bell",
        },
        async (err, data) => {
            console.log(bold(blueBright(data as string)));
            console.log(
                blueBright("Streamline the setup and configuration process for various tools and utilities.\n"),
            );
            await run();
        },
    );
};

void main();
