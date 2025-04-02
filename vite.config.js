import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "url";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    base: env.VITE_BASE_URL || "/", //GitHub Pages repository name
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
          target: env.VITE_API_BASE_URL, //'http://localhost:8083/', //https://xrlab.hs-harz.de/co2back
          changeOrigin: true,
          secure: false,
          ws: true
          //rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    /*
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
     */
  }
});
