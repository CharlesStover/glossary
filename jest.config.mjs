export default {
  cacheDirectory: './jest/cache',
  collectCoverage: true,
  coverageDirectory: './jest/coverage',
  resetMocks: true,
  resetModules: true,
  restoreMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  testURL: 'https://charlesstover.com/',
  transformIgnorePatterns: ['node_modules/(?!@awsui/components-react)/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/**/*.e2e.ts',
    '!<rootDir>/src/**/*.test.{ts,tsx}',
    '!<rootDir>/src/**/test-utils/*.{ts,tsx}',
    '!<rootDir>/src/**/types/*.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^.+\\.module\\.s?css$': 'identity-obj-proxy',
    '(?<!\\.module)\\.s?css$': '<rootDir>/src/test-utils/mock-css.ts',
    '\\.(?:gif|jpg|png)$': '<rootDir>/src/test-utils/mock-image.ts',
  },
  transform: {
    '.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
};
