const { defaults } = require('jest-config');
const basePathToIgnore = ['.github/', './node_modules/'];
const pathsToTest = ['./src/pageObjects/**/**.js'];

module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './reports',
        filename: 'com.monefy.app.lite.testresults.html',
        expand: true,
      },
    ],
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: pathsToTest,
  coverageReporters: ['json', 'json-summary', 'text', 'lcov'],
  coverageDirectory: './reports/coverage/',
  moduleFileExtensions: defaults.moduleFileExtensions,
  testPathIgnorePatterns: basePathToIgnore,
};
