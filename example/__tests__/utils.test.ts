import {
  getShortUsername,
  isEmptyStringOrWhitespaces,
} from '../src/shared/utils';

test('generating short name', () => {
  expect(getShortUsername('test user')).toBe('TU');
  expect(getShortUsername('TEST user')).toBe('TU');
  expect(getShortUsername('   test user   test   ')).toBe('TUT');
});

test('string is empty or only whitespaces', () => {
  expect(isEmptyStringOrWhitespaces('')).toBe(true);
  expect(isEmptyStringOrWhitespaces(' ')).toBe(true);
  expect(isEmptyStringOrWhitespaces('\n\t      ')).toBe(true);
  expect(isEmptyStringOrWhitespaces('   \n\t a     \n')).toBe(false);
});
