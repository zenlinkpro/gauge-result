import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  test: {
    testTimeout: 100000,
  },
})
