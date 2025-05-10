/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: 'var(--font-noto-sans-jp), sans-serif',
        roboto: 'var(--font-roboto), sans-serif',
      },
      colors: {
        sprayGreen: '#A4D5BD',
        honey: '#E7BB5E',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
