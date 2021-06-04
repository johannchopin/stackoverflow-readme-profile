module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  collectCoverageFrom: [
    "!**/node_modules/**",
    "src/**",
    "!src/db/entity/**",
    "!**/__tests__/**",
  ],
  coverageReporters: ["html", "lcov"],
  bail: true,
  verbose: true
}
