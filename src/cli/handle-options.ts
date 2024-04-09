import { biomeHandler } from "@/handler/biome";
import { OPTIONS } from "@/utils/constants";

export const handleOptions = async (options: (typeof OPTIONS)[keyof typeof OPTIONS]): Promise<void> => {
    switch (options) {
        case OPTIONS.BIOME:
            await biomeHandler();
            break;
        default:
            console.error("Invalid option selected.");
    }
};
