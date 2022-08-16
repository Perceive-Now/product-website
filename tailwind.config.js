/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "428px",
      md: "834px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1728px",
    },
    spacing: {
      0: 0,
      0.5: "0.25rem",
      1: "0.5rem",
      2: "1rem",
      3: "1.5rem",
      4: "2rem",
      5: "2.5rem",
      6: "3rem",
      7: "3.5rem",
      8: "4rem",
      9: "4.5rem",
      10: "5rem",
      11: "5.5rem",
      12: "6rem",
      13: "6.5rem",
      14: "7rem",
      15: "7.5rem",
    },
    extend: {
      colors: {
        gray: {
          100: "#FAFAFA",
          200: "#EFEFEF",
          300: "#D7D7D7",
          400: "#BABABA",
          500: "#747779",
          600: "#636567",
          700: "#424445",
          800: "#323334",
          900: "#1D1E1F",
        },
        appGray: {
          100: "#F5F7FF",
          200: "#E8EAF2",
          300: "#D0D2D9",
          400: "#B8B9BF",
          500: "#9FA0A6",
          600: "#87888C",
          700: "#6E6F73",
          800: "#565659",
          900: "#3D3E40",
        },
        primary: {
          50: "#E1D5F2",
          100: "#B6A2D8",
          500: "#7F4BD8",
          600: "#5C1FC4",
          800: "#533F73",
          900: "#442873",
        },
        secondary: {
          400: "#FFB531",
          500: "#FFA300",
          700: "#CC8300",
        },
        success: {
          500: "#40A140",
          800: "#27641B",
        },
        danger: {
          500: "#A14040",
          800: "#641B1B",
        },
      },
      ringWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [
    // https://github.com/tailwindlabs/tailwindcss-forms
    require("@tailwindcss/forms"),
  ],
};
