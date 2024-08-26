import { Linter } from 'eslint';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/** @type {Linter.FlatConfig[]} */
export default [{
    files: ["src/app/**/*.{ts,js}"],
    ignores: ["node_modules", "dist"],
    languageOptions: {
        parser: typescriptParser,
        parserOptions: {
            ecmaVersion: "2020",
            sourceType: "module",
        },
    },
    plugins: {
        "@typescript-eslint": typescriptPlugin,
    },
    rules: {
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "no-unused-vars": "warn",
        eqeqeq: "error",
        curly: "error",
        "no-console": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-inferrable-types": "off",
    },
}];