import type { JestConfigWithTsJest } from 'ts-jest'
const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    '/node_modules/(?!some-module-to-transform|another-module).+\\.js$',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Adjust the path if necessary
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Maps @ to your src directory
  },
  globals: {
    TextEncoder: require('util').TextEncoder, // この記述でグローバル化してあげる必要あり
    TextDecoder: require('util').TextDecoder,
  },
}

export default config
