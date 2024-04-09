import type { OptionsList } from "@/cli";
import { biomeHandler } from "@/handler/biomejs";

export const handleOptions = async (options: keyof typeof OptionsList): Promise<void> => {
    options === "biomejs" && biomeHandler();
};
