import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: "esnext",
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["solid-js", "@kobalte/core", "solid-icons"],
      output: {
        // Preserve CSS Modules class names
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
  css: {
    modules: {
      // Ensure consistent class names in production
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
