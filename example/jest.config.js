/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '@jellyfish-dev/react-native-membrane-webrtc': '<rootDir>/../src/index.tsx',
    '^@env$': 'react-native-dotenv',
    '^@components/(.*)$': ['<rootDir>/src/components/$1'],
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@sentry)',
  ],
  globals: {
    __DEV__: true,
  },
  setupFiles: ['../node_modules/react-native/jest/setup.js'],
};
