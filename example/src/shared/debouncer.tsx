import { debounce } from 'lodash';
import { useCallback } from 'react';

export const useDebounce = (callback: Function) => {
  return useCallback(
    debounce(callback, 300, {
      leading: true,
      trailing: false,
    }),
    [callback]
  );
};
