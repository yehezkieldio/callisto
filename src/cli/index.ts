import { Command } from "commander";
import { VERSION } from "../utils/const";

export const run = async (): Promise<void> => {
    const program = new Command()
        .name("callisto")
        .description("Streamline the setup and configuration process for various tools and utilities.")
        .version(VERSION, "-v, --version", "display the current version of Callisto.")
        .parse(Bun.argv);
};
