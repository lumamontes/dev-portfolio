const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '900px',
        xl: '1100px',
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans],
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
        display: ['Big Shoulders Display', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        paper: '#F2F1EA',
        ink: '#161513',
        'riso-pink': '#FF3684',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
