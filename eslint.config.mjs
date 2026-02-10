import js from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [".next/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([k]) => [k, "readonly"])
        ),
        React: "writable",
      },
    },
  }
);
