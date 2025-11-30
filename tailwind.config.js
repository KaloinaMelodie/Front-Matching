/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d1d1b',
        secondary: '#ebe325',
        accent: '#ffd700',
      },
    },
  },
  plugins: [],
})
