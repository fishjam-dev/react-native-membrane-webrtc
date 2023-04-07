import { VIDEOROOM_URL } from '@env';
import {
  extractRoomNameFromUrl,
  getShortUsername,
  isEmptyStringOrWhitespaces,
} from '@utils';

test('is room url valid', () => {
  const testRoomUrl = VIDEOROOM_URL + 'test';
  expect(extractRoomNameFromUrl(testRoomUrl)).toBe('test');
});

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
