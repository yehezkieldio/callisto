import { handleOptions } from "@/cli/handle-options";
import { VERSION } from "@/utils/const";
import * as p from "@clack/prompts";
import { Command } from "commander";

export enum OptionsList {
    biomejs = "biomejs",
    eslint_prettier = "eslint_prettier",
}

export const run = async (): Promise<void> => {
    const program = new Command()
        .name("callisto")
        .description("Automatically streamline the setup and configuration process for various tools and utilities.")
        .version(VERSION, "-v, --version", "display the version number")
        .parse(Bun.argv);

    const options = await p.group({
        type: () =>
            p.select({
                message: "What tool or utility would you like to configure?",
                options: [
                    { value: "eslint_prettier", label: "ESLint + Prettier" },
                    { value: "biomejs", label: "Biome.js" },
                ],
                maxItems: 5,
                initialValue: "biomejs",
            }),
    });

    handleOptions(options.type as keyof typeof OptionsList);
};
