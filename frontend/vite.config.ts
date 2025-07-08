import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from "path"
import tailwindcss from "@tailwindcss/vite"
export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
	],
	resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
