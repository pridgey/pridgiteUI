import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["solid-js", "@kobalte/core", "solid-icons"],
      output: {
        assetFileNames: "assets/[name][extname]",
      },
      treeshake: {
        preset: "smallest",
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
