import type { OptionsList } from "@/cli";
import { biomeHandler } from "@/handler/biomejs";
import { eslintPrettierHandler } from "@/handler/eslint-prettier";

export const handleOptions = async (options: keyof typeof OptionsList): Promise<void> => {
    options === "biomejs" && biomeHandler();
    options === "eslint_prettier" && eslintPrettierHandler();
};
