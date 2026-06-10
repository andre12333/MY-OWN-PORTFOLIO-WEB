import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/MY-OWN-PORTFOLIO-WEB/',
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['framer-motion'],
  },
})
