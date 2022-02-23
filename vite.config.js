import { resolve } from "path";
import { defineConfig } from "vite";
import viteStylelint from "@amatlash/vite-plugin-stylelint";
import eslintPlugin from "vite-plugin-eslint";

const root = resolve(__dirname, "src"); // eslint-disable-line
const outDir = resolve(__dirname, "dist"); // eslint-disable-line

export default defineConfig({
  root,
  publicDir: "../public",
  build: {
    outDir,
    emptyOutDir: true,
  },
  plugins: [
    viteStylelint({
      include: ["**/*.css"],
    }),
    eslintPlugin(),
  ],
});
