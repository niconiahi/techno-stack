module.exports = {
  extends: ["@niconiahi/eslint-config/web"],
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
}
