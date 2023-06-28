import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: import.meta.env.PROD === 'production' ? '/smartex/' : '/'
})

console.log(import.meta)