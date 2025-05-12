import flowbitePlugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'yellow-gradient': 'linear-gradient(325deg, #FFC61B 43.64%, #FFE38E 100%)',
      },
    },
  },
  plugins: [flowbitePlugin],
};
