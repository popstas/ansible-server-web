module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#333",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "15px",
        lg: "18px",
        xl: "20px",
      },
      fontFamily: {
        sans: ["sans-serif"],
        serif: ["serif"],
      },
      lineHeight: { tight: 1.25, normal: 1.33, relaxed: 1.5 },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
