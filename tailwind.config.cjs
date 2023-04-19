/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: {
        "350px": "350px",
        56: "14rem",
      },
      maxWidth: {
        72: "18rem",
        56: "14rem",
      },
      borderColor: {
        "primary-grey": "rgb(60,64,67)",
      },
      backgroundColor: {
        "header-black": "rgba(31,31,31,0.8)",
        "primary-purple": "#605BFF",
      },
    },
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
