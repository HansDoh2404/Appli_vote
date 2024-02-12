const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    // single component styles
  "./node_modules/@nextui-org/theme/dist/components/button.js", 
  // or you can use a glob pattern (multiple component styles)
  './node_modules/@nextui-org/theme/dist/components/(modal|button|navbar).js'
,

  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

