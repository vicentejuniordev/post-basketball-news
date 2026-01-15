const nextjs = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });
const jestCreateConfig = nextjs({
  dir: ".",
});

const jestConfig = jestCreateConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
