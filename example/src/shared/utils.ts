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

/**
 * Used to check whether string contains only whitespaces.
 * @param val string that will be checked
 * @returns boolean indicating whether val is empty or not
 */
export const checkIfStringContainsOnlyWhitespaces = (val: string) => {
  return !val.trim();
};
