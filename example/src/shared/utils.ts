import { isEmpty } from 'lodash';

const VIDEOROOM_URL = 'https://videoroom.membrane.work/room/';

/**
 * Used to generate short representation of a username.
 * @param username string to get the short form of
 * @returns string consisting of upercased first letters of every word in a username
 */
export const getShortUsername = (username: string) => {
  return username
    .split(' ')
    .map((i) => i.charAt(0))
    .join('')
    .toUpperCase();
};

export const checkIfStringContainsOnlyWhitespaces = (val: string) => {
  return !val.trim();
};

export const checkIfUrl = (val: string) => {
  return val.startsWith(VIDEOROOM_URL);
};

export const extractRoomNameFromUrl = (url: string) => {
  return url.substring(url.indexOf(VIDEOROOM_URL) + VIDEOROOM_URL.length);
};

export const shouldEnableRoomButton = (username, roomName) => {
  return (
    !isEmpty(username) &&
    !isEmpty(roomName) &&
    !checkIfStringContainsOnlyWhitespaces(username) &&
    !checkIfStringContainsOnlyWhitespaces(roomName)
  );
};
