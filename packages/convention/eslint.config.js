import eslint from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["**/dist/**", "**/coverage/**", "**/node_modules/**", ".claude/**"] },
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ["apps/**/*.{ts,tsx,js}", "packages/**/*.{ts,tsx,js}"],
        languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.vitest } },
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-unused-expressions": "warn",
            "prefer-const": "warn",
        },
    },
    {
        files: ["apps/**/*.{ts,tsx}"],
        plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
        rules: {
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/immutability": "warn",
            "react-hooks/set-state-in-effect": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        },
    },
);
