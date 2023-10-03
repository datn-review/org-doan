import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: ['**/*.tsx', '**/*.ts'],
      jsxRuntime: 'automatic',
    }),
    macrosPlugin(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    port: 8000,
    host: true, // Here
    // strictPort: true,
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@plugin': path.resolve(__dirname, './src/plugin'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
});
