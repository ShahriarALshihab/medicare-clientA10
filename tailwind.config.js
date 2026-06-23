/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./hooks/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F6E64",
          dark: "#0A4F47",
          light: "#E4F3F0",
        },
        accent: {
          DEFAULT: "#F2784B",
          dark: "#D9622F",
        },
        ink: "#102A28",
      },
    },
  },
  daisyui: {
    themes: [
      {
        medicare: {
          primary: "#0F6E64",
          secondary: "#F2784B",
          accent: "#2D7FF2",
          neutral: "#102A28",
          "base-100": "#FFFFFF",
          info: "#2D7FF2",
          success: "#1E9E6B",
          warning: "#E7A739",
          error: "#D9462F",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
