import serve from "rollup-plugin-serve";
import { babel } from "@rollup/plugin-babel";

export default {
  input: "./src/index.js",
  output: {
    dir: "dist",
    name: "Vue",
    format: "umd",
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      open: true,
      openPage: "./public/index.html",
      port: 3000,
      contentBase: "",
    }),
  ],
};
