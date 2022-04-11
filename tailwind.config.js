module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#00bcd4",
        "secondary": "#ff9800",
      },
    },
  },
  plugins: [require("daisyui")],
};
