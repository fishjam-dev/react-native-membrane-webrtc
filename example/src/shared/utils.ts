import { VIDEOROOM_URL } from '@env';
import { isEmpty } from 'lodash';

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

export const isEmptyStringOrWhitespaces = (val: string) => {
  return isEmpty(val) || !val.trim();
};

export const checkIfUrl = (val: string) => {
  return val.startsWith(VIDEOROOM_URL);
};

export const extractRoomNameFromUrl = (url: string) => {
  return url.substring(url.indexOf(VIDEOROOM_URL) + VIDEOROOM_URL.length);
};

export const getNumberOfCurrentlyVisiblePlaces = (
  numOfSpots: number,
  numOfParticipants: number
) => {
  return numOfParticipants > numOfSpots ? numOfSpots - 1 : numOfSpots;
};
