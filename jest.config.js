/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverage: false,
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.stories.tsx',
    '!**/*.spec.tsx',
    '!**/node_modules/**',
    '!**/vite.config.ts',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/.storybook/**',
    '!**/miragejs/**',
    '!**/index.ts',
    '!**/mocks/**',
  ],
};
