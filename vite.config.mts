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
  }
})
