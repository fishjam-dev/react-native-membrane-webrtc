import { debounce } from 'lodash';
import { useCallback } from 'react';

// Make sure that the function used as a callback stays
// always the same since makaing changes to it won't
// affect the callback used in the useDebounce and the
// original one will be used.
export const useDebounce = (callback: Function) => {
  return useCallback(
    debounce(callback, 300, {
      leading: true,
      trailing: false,
    }),
    []
  );
};
