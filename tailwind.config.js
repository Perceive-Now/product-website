/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "428px",
      md: "834px",
      lg: "1080px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1600px",
    },
    spacing: {
      0: 0,
      0.5: "0.25rem",
      1: "0.5rem",
      2: "1rem",
      2.5: "1.25rem",
      3: "1.5rem",
      4: "2rem",
      4.5: "2.25rem",
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
    fontFamily: {
      helvetica: ["Helvetica", "Arial", "sans-serif"],
      mulish: ["Mulish", "sans-serif"],
      nunito: ["Nunito", "sans-serif"],
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
          800: "#373D3F",
        },
        success: {
          500: "#40A140",
          800: "#27641B",
        },
        danger: {
          500: "#A14040",
          800: "#641B1B",
        },
        foundationOrange: {
          100: "#FFF6E6",
        },
        heroDark: {
          900: "#120824",
        },
      },
      ringWidth: {
        0.5: "0.5px",
      },
      container: {
        center: true,
        screens: {
          "2xl": "1440px",
        },
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(282deg, #120824 32.71%, #442873 133.49%);",
        "secondary-gradient": "linear-gradient(110deg, #E08236 0.32%, #423ABA 99.59%);",
        "white-gradient": "linear-gradient(111deg, #FFF 1.62%, #F7F5FF 98.58%);",
        "progressbar-gradient-lr":
          "linear-gradient(270deg, #442873 0%, #643BA9 0.01%, #442873 99.97%);",
        "progressbar-gradient-rl":
          "linear-gradient(270deg, #442873 0.79%, #643BA9 99.98%, #442873 99.99%);",
      },
      boxShadow: {
        // 'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        "page-content": "0px 0px 12px 0px rgba(36, 39, 43, 0.08)",
        "inputBox": '2px 3px 3px 0 rgba(0, 0, 0, 0.12), -1px -1px 1px 0 rgba(0, 0, 0, 0.05)',
        "hoverbox": "7px 9px 14px 0 rgba(0, 0, 0, 0.25)",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
