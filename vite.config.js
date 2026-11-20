import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.BASE_PATH || (process.env.GITHUB_ACTIONS ? '/conference-shaheen/' : '/'),
  appType: 'mpa',
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        speakers: resolve(__dirname, 'src/speakers/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
