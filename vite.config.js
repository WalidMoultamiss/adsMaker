import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@': '/src',
    '@components': '/src/components',
    '@pages': '/src/pages',
    '@services': '/src/services',
    '@store': '/src/store.js',
    '@images': '/public/images',
  },
})
