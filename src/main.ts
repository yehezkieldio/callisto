#!/usr/bin/env bun

if (typeof Bun === "undefined") {
    console.error("This CLI script must be run with Bun.");
    process.exit(1);
}

const main = async () => {
    console.log("Hello, world!");
};

void main();
