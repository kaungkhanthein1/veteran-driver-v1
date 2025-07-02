import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "url";
import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), svgr()],
  base: "/",
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      icons: path.resolve(__dirname, "src/icons"),
      // add more as needed
    },
  },
    build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log', 'console.debug'], // Only remove specific console methods
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'bundle-report.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
}); 