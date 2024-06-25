import parserTypeScript from "prettier/parser-typescript";


export default {
  plugins: ["prettier-plugin-tailwindcss", parserTypeScript],
  parser: "typescript",
};
