import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'jquery': resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
    }
  },
  optimizeDeps: {
    include: ['jquery']
  }
})
