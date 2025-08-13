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
      external: ["solid-js", "@kobalte/core", "solid-icons", "@solidjs/start"],
      output: {
        assetFileNames: "assets/[name][extname]",
      },
      // Remove or tone down the aggressive tree-shaking
      // treeshake: {
      //   preset: "recommended", // Changed from "smallest"
      //   // Remove the other aggressive options for now
      // },
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
