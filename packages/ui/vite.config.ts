import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import * as path from "path";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    react({}),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
    dts(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  build: {

    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
      name: "ui",
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
