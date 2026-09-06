import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// En local : proxy vers localhost:3000. Dans Docker : vers le service "backend"
// (surchargé par VITE_API_PROXY_TARGET dans docker-compose.yml).
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:3000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true, // nécessaire pour être accessible depuis l'extérieur du conteneur
    proxy: {
      '/api': apiProxyTarget,
    },
  },
})
