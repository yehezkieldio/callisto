import { biomeHandler } from "@/handler/biome";
import { OPTIONS } from "@/utils/constants";
import * as p from "@clack/prompts";
import { red } from "colorette";

export const handleOptions = async (options: (typeof OPTIONS)[keyof typeof OPTIONS]): Promise<void> => {
    options === OPTIONS.BIOME && (await biomeHandler());

    if (!Object.values(OPTIONS).includes(options)) p.outro(red("Invalid option provided."));
};
