import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/widget_co2-rechner/', // GitHub Repository Name
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://xrlab.hs-harz.de/co2back',
        changeOrigin: true,
        secure: false,
        ws: true
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    lib: {
      entry: "src/widget/widget.js",
      name: "CalculationWidget",
      fileName: (format) => `calculation-widget.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
