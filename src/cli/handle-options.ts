import { biomeHandler } from "@/handler/biome";
import type { OPTIONS } from "@/utils/constants";

export const handleOptions = async (options: keyof typeof OPTIONS): Promise<void> => {
    options === "biomejs" && biomeHandler();
};
