/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^[./a-zA-Z0-9$_-]+\\.css': '<rootDir>/src/__mocks__/styleMock.ts',
    '^.+\\.svg\\?react': '<rootDir>/src/__mocks__/svgMock.tsx'
  },
  moduleDirectories: ['node_modules', 'src']
};
