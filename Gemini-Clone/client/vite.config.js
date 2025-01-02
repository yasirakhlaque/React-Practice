import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['axios'], // Add 'axios' to the external array
    },
  },
})
