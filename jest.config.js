const nextjs = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });
const jestCreateConfig = nextjs({
  dir: ".",
});

const jestConfig = jestCreateConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
