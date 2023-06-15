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

export const checkIfArraysAreTheSame = (
  arr1: string[] | null,
  arr2: string[] | null
) => {
  if (arr1 == null || arr2 == null || arr1.length !== arr2.length) {
    return false;
  }

  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) {
      return false;
    }
  }
  return true;
};

export const getNumberOfCurrentlyVisiblePlaces = (
  numOfSpots: number,
  numOfParticipants: number
) => {
  return numOfParticipants > numOfSpots ? numOfSpots - 1 : numOfSpots;
};
