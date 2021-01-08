// jest.config.js
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", ".tmp", ".cache"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["./jest.setup.js"],
};
