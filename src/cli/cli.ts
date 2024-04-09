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
                    { value: OPTIONS.biomejs, label: "Biome" },
                    { value: OPTIONS.eslint_prettier, label: "ESLint + Prettier" },
                ],
                maxItems: 5,
                initialValue: OPTIONS.biomejs as string,
            }),
    });

    handleOptions(options.type as keyof typeof OPTIONS);
};
