module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "vscode-dark": "#1E1E1E",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
