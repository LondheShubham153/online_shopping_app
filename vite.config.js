import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/shop/',
    css: {
      devSourcemap: false
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      allowedHosts: [
        '16-16-128-178.nip.io',
        'localhost'
      ]
    }
})
