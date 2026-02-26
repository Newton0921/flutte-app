import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/192x192.png', 'icons/512x512.png'],
      manifest: {
        name: 'ShopWave - E-commerce PWA',
        short_name: 'ShopWave',
        start_url: '/',
        display: 'standalone',
        background_color: '#f3efe5',
        theme_color: '#0f766e',
        icons: [
          {
            src: '/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})