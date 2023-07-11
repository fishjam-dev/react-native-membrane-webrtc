const path = require('path');
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // For development, we want to alias the library to the source
            '@jellyfish-dev/react-native-membrane-webrtc': path.join(
              __dirname,
              '..',
              'src',
              'index.tsx'
            ),
            '@components': './src/components/',
            '@colors': './src/shared/colors.ts',
            '@screens': './src/screens/',
            '@model': './src/model/',
            '@utils': './src/shared/utils.ts',
            '@assets': './assets/',
            '@shared': './src/shared/',
          },
        },
      ],
      ['module:react-native-dotenv'],
      [
        'react-native-reanimated/plugin',
        {
          relativeSourceLocation: true,
        },
      ],
    ],
  };
};
