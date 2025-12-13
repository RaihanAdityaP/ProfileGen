import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          googleVerification: '1RyKwW_N9hpbV_WN59CM5o02h-KCWntW2mGRQRHZCUU'
        }
      }
    })
  ]
})