/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        "primary-light": "#6366F1",
        "primary-dark": "#3730A3",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        text: "#111827",
        "text-secondary": "#6B7280",
        border: "#E5E7EB",
        success: "#10B981",
        warning: "#FBBF24",
        danger: "#EF4444",
        "danger-dark": "#B91C1C",
      },
    },
    fontFamily: {
      sans: ["System"],
    },
  },
  plugins: [],
};
