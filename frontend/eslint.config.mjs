import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "storybook-static/**",
      ".storybook/**",
      "next-env.d.ts",
      "eslint.config.mjs",
      "next.config.js",
    ],
  },
  ...compat.config({
    extends: [
      "next",
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
    ],
    plugins: ["@typescript-eslint", "react", "prettier", "unused-imports", "import"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      project: "./tsconfig.json",
    },
    rules: {
      "prettier/prettier": "error",
      "unused-imports/no-unused-imports": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
          pathGroups: [
            {
              pattern: "{react,react/**,react-dom/**}",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "{next,next/**}",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "{@mui/**,@emotion/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "{@/**}",
              group: "parent",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always-and-inside-groups",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];
