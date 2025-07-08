// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,svelte}",
    "./src/**/*.{js,ts,svelte}"
  ],
 theme: {
    extend: {
        colors: {
        primary: '#6366f1',
        secondary: '#f59e0b',
        accent: '#10b981'
      }
    }
  },
  darkMode: "class",
  plugins: [],
};
