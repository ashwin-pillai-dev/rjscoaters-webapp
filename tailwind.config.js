/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require("flowbite/plugin"),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your new Orange palette replacing the old green. 
        // "500" is your exact brand color.
        primary: {
          "50": "#FFF3EB",
          "100": "#FFE4CC",
          "200": "#FFC499",
          "300": "#FF9D4D",
          "400": "#FF7B1A",
          "500": "#FF6A00", // Your brand orange
          "600": "#E65C00",
          "700": "#CC5000",
          "800": "#993A00",
          "900": "#662500"
        },
        // Still mapping the CSS variables in case you need them explicitly
        brand: 'var(--brand-orange)', 
        surface: 'var(--brand-bg)',
      },
      animation: {
        'marquee-ltr': 'marqueeLtr 25s linear infinite',
      },
      keyframes: {
        marqueeLtr: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  }
};