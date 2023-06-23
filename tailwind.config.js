/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "--clr-Blue": "#174a8b",
        "--clr-Marine-Blue": "hsl(213, 96%, 18%)",
        "--clr-Purplish-Blue": "hsl(243, 100%, 62%)",
        "--clr-Pastel-Blue": "hsl(228, 100%, 84%)",
        "--clr-Light-Blue": "hsl(206, 94%, 87%)",
        "--clr-Strawberry-Red": "hsl(354, 84%, 57%)",
        "--clr-Cool-Gray": "hsl(231, 11%, 63%)",
        "--clr-Light-Gray": "hsl(229, 24%, 87%)",
        "--clr-Magnolia": "hsl(217, 100%, 97%)",
        "--clr-Alabaster": "hsl(231, 100%, 99%)",
        "--clr-White": "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        cfont: ["Ubuntu", "sans-serif"],
      },
      backgroundImage: {
        desktopSidebar: "url('/images/bg-sidebar-desktop.svg')",
        mobileSidebar: "url('/images/bg-sidebar-mobile.svg')",
      },
    },
  },
  plugins: [],
};
