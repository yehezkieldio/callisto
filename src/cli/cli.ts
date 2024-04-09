import { handleOptions } from "@/cli/handle-options";
import { DESCRIPTION, OPTIONS, VERSION } from "@/utils/constants";
import * as p from "@clack/prompts";
import { Command } from "commander";

export const runCLi = async (): Promise<void> => {
    const program = new Command().name("callisto").description(DESCRIPTION).version(VERSION, "-v, --version", "display the version number").parse(Bun.argv);

    const options = await p.group({
        type: () =>
            p.select({
                message: "What tool or utility would you like to configure?",
                options: [
                    { value: OPTIONS.BIOME, label: "Biome" },
                    { value: OPTIONS.ESLINT_PRETTIER, label: "ESLint + Prettier" },
                ],
                maxItems: 5,
                initialValue: OPTIONS.BIOME as string,
            }),
    });

    handleOptions(options.type as (typeof OPTIONS)[keyof typeof OPTIONS]);
};
