/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    boxShadow: {
      sm: "0px 0px 0px 2px rgba(0, 0, 0, 0.2)",
      md: "0px 0px 0px 3px rgba(0, 0, 0, 0.5)",
      lg: "0px 0px 0px 3px rgba(0, 0, 0, 0.8)",
      none: defaultTheme.boxShadow.none,
    },
    borderRadius: {
      ...defaultTheme.borderRadius,
      "3xl": "20px",
      "4xl": "24px",
    },
    colors: {
      white: "#FFFFFF",
      transparent: "transparent",
      green: {
        900: "#166534",
        800: "#15803D",
        200: "#BBF7D0",
      },
      yellow: {
        800: "#F6C105",
        200: "#FDE282",
      },
      red: {
        900: "#991B1B",
        800: "#B91C1C",
        200: "#FECACA",
      },
      grey: {
        950: "#030712",
        900: "#111827",
        800: "#1f2937",
        700: "#374151",
        600: "#4b5563",
        500: "#6b7280",
        400: "#9ca3af",
        300: "#d1d5db",
        200: "#e5e7eb",
        100: "#F3F4F6",
        50: "#f9fafb",
      },
    },
  },
  plugins: [],
};
