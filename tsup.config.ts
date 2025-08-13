import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  loader: {
    ".css": "local-css",
  },
  dts: true,
  external: [
    "solid-js",
    "solid-js/web",
    "@kobalte/core",
    "solid-icons",
    "@solidjs/start",
  ],
  esbuildOptions(options, context) {
    options.jsx = "preserve";
    options.jsxImportSource = "solid-js";
  },
  clean: true,
});
