/**
 * This version mirrors the package.json version.
 * It's necessary because the package.json cannot be imported post-build, so this is a workaround.
 * ! Automatically updated by the build process, do not modify.
 */
export const VERSION = "0.0.1";

export const DESCRIPTION = "Automatically streamline the setup and configuration process for various tools and utilities";

export const OPTIONS = {
    eslint_prettier: "eslint_prettier",
    biomejs: "biomejs",
} as const;
