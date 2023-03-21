import { createIconSetFromIcoMoon } from '@expo/vector-icons';

export const Icon = createIconSetFromIcoMoon(
  require('../../assets/fonts/icomoon/selection.json'),
  'IcoMoon',
  require('../../assets/fonts/icomoon/icomoon.ttf')
);

export const Logo = createIconSetFromIcoMoon(
  require('../../assets/fonts/logo/selection.json'),
  'Logo',
  require('../../assets/fonts/logo/logo.ttf')
);
