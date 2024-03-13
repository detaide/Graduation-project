import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template : {
      compilerOptions : {isCustomElement : (tag) => tag.startsWith("wc-")}
    }
  })],
  resolve : {
    alias : {
      "@" : path.resolve(process.cwd(), "src")
    }
  },
  css : {
    preprocessorOptions : {
      less : {
        javascriptEnabled: true,
                additionalData: `@import "${path.resolve(
                    __dirname,
                    "src/styles/global.less"
                )}";`,
      }
    }
  },
  server : {
    // port : 5173,
    proxy : {
      "/cdn" : {
        target : "http://121.41.95.16:20120/static/vditor/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, '')
      },
      "/api" : {
        target : "http://localhost:3000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
