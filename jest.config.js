module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/test'],
  coverageReporters: ['lcov', 'text', 'html'],
  reporters: ['default'],
  roots: ['<rootDir>/src', '<rootDir>/test'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(\\.|/)(test|spec)\\.ts?$',
  moduleNameMapper: {},
  setupFiles: ['<rootDir>/jest/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
      isolatedModules: false,
    },
  },
};
