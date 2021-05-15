module.exports = {
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  collectCoverageFrom: [
    "!**/node_modules/**",
    "src/**"
  ],
  coverageReporters: ["html", "lcov"],
  bail: true,
  verbose: true
}
