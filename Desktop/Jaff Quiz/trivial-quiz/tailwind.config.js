/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      sidebarNone: { min: "1px", max: "1182px" },
      sidebarshow: "1183px",
      createmodal: { min: "1px", max: "500px" },
      createmodalWidth: { min: "1px", max: "420px" },
    },
    spacing: {
      01: "-90px",
      0: "0",
      1: "8px",
      2: "12px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "48px",
      7: "52px",
      8: "56px",
      9: "59px",
      10: "60px",
      11: "76px",
      12: "90px",
      dw: "170px",
      dbh: "300px",
      dimageSize: "400px",
      dashtable: "600px",
      createModalSize: "400px",
      // percentage
      "1p": "10%",
      "2p": "20%",
      "3p": "30%",
      "4p": "40%",
      "5p": "50%",
      "6p": "60%",
      "7p": "70%",
      "8p": "80%",
      "9p": "90%",
      "10p": "100%",
    },
    colors: {
      dashback: {
        100: "#f9f9fb",
        200: "#f5f7f8",
      },
      chartbg: "#000000",
      white: "#ffffff",
      "blue-like": {
        100: "#19a7d7",
        200: "#ecfcfc",
      },
      "purple-like": {
        100: "#aa35db",
        200: "#fdf0f9",
      },
      "red-like": {
        100: "#f91759",
        200: "#fbf0fe",
      },
      "yellow-like": {
        100: "#fda100",
        200: "#fdfeee",
      },
      "orange-like": {
        100: "#ff7139",
        200: "#fff9ed",
      },
      "green-like": {
        100: "#03a26c",
        200: "#f6feef",
      },
      gray: "#e9ecef",
      modalback: "#00000059",
      line: "#c2c2c2",
    },
    // ...
    borderRadius: {
      sideicon: "5px",
      sideedge: "20px",
      createModal: "10px",
      createdSubject: "10px",
    },
    extend: {},
  },
  plugins: [],
};
