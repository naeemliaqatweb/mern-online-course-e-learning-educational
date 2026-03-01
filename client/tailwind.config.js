/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",  // Ensure all files using Tailwind are included
    ],
    theme: {
      extend: {
        boxShadow: {
          'border-yellow': '0px 4px 10px #FFD599',
        },
      },
    },
    plugins: [],
  };
  