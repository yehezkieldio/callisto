/**
 * This version mirrors the package.json version.
 * It's necessary because the package.json cannot be imported post-build, so this is a workaround.
 * ! Automatically updated by the build process, do not modify.
 */
export const VERSION = "0.0.1";

/**
 * This description mirrors the package.json description.
 * ! Automatically updated by the build process, do not modify.
 */
export const DESCRIPTION = "Automatically streamline the setup and configuration process for various tools and utilities";

// The available options for the CLI.
export const OPTIONS = {
    ESLINT_PRETTIER: "eslint_prettier",
    BIOME: "biome",
} as const;
