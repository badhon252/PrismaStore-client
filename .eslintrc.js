module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "next",
    // "prettier",
    // "prettier/@typescript-eslint",
    // "prettier/react",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // Add your custom rules here
  },
};
