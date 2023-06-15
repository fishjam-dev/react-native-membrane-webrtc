import {
  checkIfArraysAreTheSame,
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

test('are arrays the same', () => {
  expect(checkIfArraysAreTheSame([], ['a'])).toBe(false);
  expect(checkIfArraysAreTheSame(['a'], ['b'])).toBe(false);
  expect(checkIfArraysAreTheSame(['a'], ['a'])).toBe(true);
  expect(checkIfArraysAreTheSame(['a', 'a'], ['a'])).toBe(false);
  expect(checkIfArraysAreTheSame(['a', 'a'], ['a', 'b'])).toBe(false);
  expect(checkIfArraysAreTheSame(['a', 'b'], ['a', 'b'])).toBe(true);
});
