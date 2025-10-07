module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": (filenames) => {
    return [
      `eslint --fix --quiet ${filenames.join(" ")}`,
      `git add ${filenames.join(" ")}`,
    ];
  },
};
