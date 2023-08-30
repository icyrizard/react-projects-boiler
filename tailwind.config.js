/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "top-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      colors: {
        primary: "#1a5c72",
        secondary: "#2fa8c8",
        success: "#6dd256",
        error: "#c14141",
        neutral: "#f1f1f1",
        "neutral-dark": "#C2C2C2",
        "error-hover": "#c14141",
        "success-hover": "#05c234",
        "overlay-grey": "rgba(33, 33, 33, 0.4)",
        "theme-gray": {
          100: "#DEDEE6",
          500: "#5d607e",
          900: "#131319",
        },
        theme: {
          '50': '#f2fafd',
          '100': '#e5f3f9',
          '200': '#c0e6f2',
          '300': '#90d5e9',
          '400': '#55c0db',
          '500': '#2fa8c8',
          '600': '#2088a9',
          '700': '#1b6d89',
          '800': '#1a5c72',
          '900': '#1b4d5f',
          '950': '#12323f',
        },
        palettes: {
          green: "#D1E6DA",
          red: "#F9D2CC",
          blue: "#BEC3F9",
          yellow: "#FFF8D3",
        },
      },
      keyframes: {
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: {
            transform: "translateY(calc(0% - var(--viewport-padding)))",
          },
          to: { transform: "translateY(0)" },
        },
        swipeOut: {
          from: { transform: "translateY(var(--radix-toast-swipe-start-y))" },
          to: { transform: "translateY(calc(0% - var(--viewport-padding)))" },
        },
      },
      animation: {
        hide: "hide 100ms ease-in",
        slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        swipeOut: "swipeOut 100ms ease-out",
      },
    },
  },
  plugins: [],
};
