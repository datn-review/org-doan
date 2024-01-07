import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  server: {
    hmr: false,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
      name: "i18n",
    },
    outDir: "./lib",
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ["react", "react-dom"],
      output: {
        // Global vars to use in UMD build for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },

  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
