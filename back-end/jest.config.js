/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};

// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/?(*.)+(test).ts'],
  modulePathIgnorePatterns: ['<rootDir>/.vscode'],
};

// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/?(*.)+(test).ts'],
  modulePathIgnorePatterns: ['<rootDir>/.vscode'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
