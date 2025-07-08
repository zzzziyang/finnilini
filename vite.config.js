import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/finnilini/', // Set base for GitHub Pages
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
