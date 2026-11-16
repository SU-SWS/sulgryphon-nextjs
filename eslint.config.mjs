import prettier from "eslint-plugin-prettier"
import {defineConfig, globalIgnores} from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const esLintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      prettier,
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/require-await": "off",
      "no-console": ["error", {allow: ["warn", "error"]}],
      "no-fallthrough": "off",
      "no-restricted-syntax": ["error", "Literal[value=/text-m[\\d]/i]"],
      "no-restricted-imports": [
        "error",
        {
          name: "tailwind-merge",
          importNames: ["twMerge"],
          message: "Use custom tailwind merge plugin cn() from @/lib/utils/className.",
        },
        {
          name: "clsx",
          message: "Use custom tailwind merge plugin cn() from @/lib/utils/className.",
        },
      ],
      "prettier/prettier": ["error"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    // Flag deprecated APIs (anything marked `@deprecated`, e.g. React's FormEvent), which tsc doesn't report. The rule
    // needs type information, so it only runs on files in the TypeScript project.
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "error",
    },
  },
  globalIgnores(["**/__generated__/**/*", "src/styles/**/*"]),
])
export default esLintConfig
