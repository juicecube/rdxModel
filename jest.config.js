module.exports = {
  testEnvironment: 'node',
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  moduleDirectories: [".", "node_modules", "src"], 
  testRegex: '(/__test__/.*)\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
  ],
};
