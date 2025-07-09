import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import devtoolsJson from 'vite-plugin-devtools-json';

export default defineConfig({
  plugins: [sveltekit(), devtoolsJson()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // dış erişim için bu şart
    port: 5173,
    allowedHosts: ['nodeshop.ibo.rocks'], // burası zaten doğru
  },
});
