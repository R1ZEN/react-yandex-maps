module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageReporters: ['html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__mocks__/', '__fixtures__'],
  testMatch: ['**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
};
