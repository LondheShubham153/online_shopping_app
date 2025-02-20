import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: './',
    server: {
        host: '0.0.0.0', // Make server accessible from anywhere
        port: 5173,
        strictPort: true,
    },
    css: {
        devSourcemap: false
    }
})

