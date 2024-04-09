import { biomeHandler } from "@/handler/biome";
import { OPTIONS } from "@/utils/constants";
import * as p from "@clack/prompts";
import { red } from "colorette";

export const handleOptions = async (options: (typeof OPTIONS)[keyof typeof OPTIONS]): Promise<void> => {
    switch (options) {
        case OPTIONS.BIOME:
            await biomeHandler();
            break;
        default:
            p.outro(red("Invalid option selected."));
    }
};
