import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
})
