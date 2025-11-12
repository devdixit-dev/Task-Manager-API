export default {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleDirectories: ["node_modules", "src"],
  collectCoverageFrom: ["src/**/*.js", "!src/server.js"],
  coverageDirectory: "coverage"
};
