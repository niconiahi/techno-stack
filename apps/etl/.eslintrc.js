module.exports = {
  extends: ["@niconiahi/eslint-config/node"],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
}
