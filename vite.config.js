import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'M.G.E. Calc',
        short_name: 'M.G.E.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#172554',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
  server: {
    host: true,
    port: 5174,
  }
})
