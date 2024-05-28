import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './ssl/server.key',
      cert: './ssl/server.crt',
    }
  },
  plugins: [react()],
})
